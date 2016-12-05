var path = require('path');
var config = require('config');
var express = require('express');
var proxy = require('express-http-proxy');

var portConfig = config.get('portConfig');
var port = portConfig.build;

var app = express();

var staticPath = path.join(__dirname, '/build');
app.use(express.static(staticPath));


app.use('/api/instagram', proxy('https://api.instagram.com', {
  decorateRequest: function (proxyReq, originalReq) {
    // you can update headers 
    proxyReq.headers['Access-Control-Allow-Origin'] = '*';

    return proxyReq;
  }
}));

app.listen(port, function () {
  console.log('Server started at port: ' + port);
});