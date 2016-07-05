import Koa from 'koa';
import session from 'koa-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import devLogger from 'koa-logger';
import Router from 'koa-router';
import json from 'koa-json';
import compress from 'koa-compress';

import util from 'util';
import path from 'path';
import config from '../src/config';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import mysql from 'libs/mysql.js';
import _logger from 'libs/logger.js';
import _debug from 'debug';
import routes from 'controllers/routes';


// init
const pretty = new PrettyError();
const app = new Koa();
const router = new Router();
const debug = _debug('api:api');
const logger = _logger({
  name: config.name,
  debug: config.debug,
  path: path.join(config.root, `/logs/me.${config.port}.log`)
});

mysql.connect();

// responseTime
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', ms + 'ms');
});

// logger
const koaBunyan = function (logger, opts) {
  opts = opts || {};

  let defaultLevel = opts.level || 'info';
  let requestTimeLevel = opts.timeLimit;

  return async (ctx, next) => {
    const startTime = new Date().getTime();
    logger[defaultLevel](util.format('[REQ] %s %s', ctx.method, ctx.url));

    const done = function () {
      const requestTime = new Date().getTime() - startTime;
      let localLevel = defaultLevel;

      if (requestTimeLevel && requestTime > requestTimeLevel) {
        localLevel = 'warn';
      }
      logger[localLevel](util.format('[RES] %s %s (%s) took %s ms', ctx.method, ctx.originalUrl, ctx.status, requestTime));
    };

    ctx.res.once('finish', done);
    ctx.res.once('close', done);

    await next();
  };
};

app.use(koaBunyan(logger, {
  level: config.debug ? 'debug' : 'info',
  timeLimit: 500
}));

// devLogger
if (config.env === 'development') {
  app.use(devLogger());
}

// 设置gzip
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// session
app.keys = ['me.sunken'];
app.use(convert(session(app)));

// 传输json
app.use(convert(json()));

// router
routes(router);
app.use(bodyParser());
app.use(router.routes());

// end middlewares


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  app.listen(config.apiPort);
  debug('==> 🌎  API is running on port %s', config.apiPort);
  debug('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
} else {
  debug('==>     ERROR: No PORT environment variable has been specified');
}
