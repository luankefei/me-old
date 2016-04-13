/**
 * logger
 */
'use strict';

import _debug from 'debug';
import path from 'path';
import bunyan from 'bunyan';

const debug = _debug('api:libs.logger');

// instance
let _logger;

/**
 * [createLogger]
 * @param  {Obejct} opt [name, debug, path]
 * @return {bunyan}
 */
function createLogger(opt) {
  debug('createLogger.opt: %j', opt);

  return bunyan.createLogger({
    name: opt.name,
    streams: [{
      level: opt.debug ? 'debug' : 'info',
      stream: process.stdout
    }, {
      level: opt.debug ? 'debug' : 'info',
      type: 'rotating-file',
      period: '1d',
      count: 5,
      path: opt.path
    }]
  });
}

module.exports = function logger(option) {
  if (!_logger) {
    const opt = option || {
      name: 'app',
      debug: true,
      path: path.join(__dirname, '/../logs/me.log')
    };

    _logger = createLogger(opt);
    // hack it .via https://github.com/trentm/node-bunyan/issues/187
    delete _logger.fields.hostname;
    delete _logger.fields.v;
  }

  return _logger;
};
