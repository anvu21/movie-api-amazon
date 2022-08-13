const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/movies',
    createProxyMiddleware({
      target: 'https://movie-api-lehigh.herokuapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/_users',
    createProxyMiddleware({
      target: 'https://movie-api-lehigh.herokuapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/_users/login',
    createProxyMiddleware({
      target: 'https://movie-api-lehigh.herokuapp.com',
      changeOrigin: true,
    })
  );
};