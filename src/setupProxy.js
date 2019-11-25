const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        proxy({
          target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false,
    
        debug: true,
        preserveHeaderKeyCase: true,
        })
      );

      app.use(
        '/set',
        proxy({
          target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false,
    
        debug: true,
        preserveHeaderKeyCase: true,
        })
      );

      app.use(
        '/logged_in',
        proxy({
          target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false,
    
        debug: true,
        preserveHeaderKeyCase: true,
        })
      );
};