require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'sunken.me',
    description: 'All the modern best practices in one site.',
    head: {
      titleTemplate: 'sunken.me: %s',
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
