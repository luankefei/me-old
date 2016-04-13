/* eslint strict: 0 */
'use strict';

require('babel-polyfill');

const pkg = require('../package.json');
const util = require('util');
const path = require('path');
// const argv = require('yargs').argv;

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const DEFAULT_PORT = 3030;

let port;
if (util.isNullOrUndefined(process.env.NODE_APP_INSTANCE)) {
  // dev port
  // port = argv.PORT || DEFAULT_PORT;
  port = DEFAULT_PORT;
} else {
  // cluster: 3030 ~ *
  port = DEFAULT_PORT + ~~process.env.NODE_APP_INSTANCE;
}

module.exports = Object.assign({
  version: pkg.version,
  name: pkg.name,
  root: path.resolve(__dirname, '../'),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || port,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'sunken.me',
    description: 'All the modern best practices in one site.',
    head: {
      title: 'sunkne.me',
      meta: [
        {name: 'description', content: 'All the modern best practices in one site.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'sunken.me'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'zh_CN'},
        {property: 'og:title', content: 'sunken.me'},
        {property: 'og:description', content: 'All the modern best practices in one site.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@sunken'},
        {property: 'og:creator', content: '@sunken'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
