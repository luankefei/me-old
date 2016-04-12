import Koa from 'koa';
import session from 'koa-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
// import proxy from 'koa-proxy'

import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import _debug from 'debug';
// import http from 'http';

const pretty = new PrettyError();
const app = new Koa();
const router = new Router();
const debug = _debug('api:api');

// responseTime
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', ms + 'ms');
});

if (config.env === 'development') {
  app.use(logger());
}

app.keys = ['me.sunken'];
app.use(convert(session(app)));

router.get('/user', ctx => {
  debug('you got user.');
  ctx.body = 'hello, world';
});

app.use(router.routes());
app.use(bodyParser());
// app.use((ctx) => {
//   const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
//   const {action, params} = mapUrl(actions, splittedUrlPath);
//
//   if (action) {
//     action(req, params)
//       .then((result) => {
//         const req = ctx, res = ctx;
//         if (result instanceof Function) {
//           result(res);
//         } else {
//           res.json(result);
//         }
//       }, (reason) => {
//         if (reason && reason.redirect) {
//           res.redirect(reason.redirect);
//         } else {
//           console.error('API ERROR:', pretty.render(reason));
//           res.status(reason.status || 500).json(reason);
//         }
//       });
//   } else {
//     res.status(404).end('NOT FOUND');
//   }
// });

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
