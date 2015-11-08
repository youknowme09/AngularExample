'use strict';

var express = require('express'),
  path = require('path'),
  debug = require('debug')('express'),
//ExpressHTMLSnapshots = require('express-html-snapshots'),
  services = require('./services/index'),
  env = process.env.NODE_ENV || 'production',
  app = express();

app.use('/api', services);

var root = require('app-root-path');
var appRoot = root + ( env === 'development' ? '/development' : '/release');
// development only
if (env === 'development') {

  app.set('views', appRoot);
  app.set('view engine', 'ejs');

  app.use('/development', express.static( appRoot));
  app.use('/public', express.static(appRoot + '/public'));
  app.use('/bower_components', express.static(root + '/bower_components'));
  app.use('/assets', express.static(root + '/assets'));

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

// production only
if (env === 'production') {

  app.set('views', appRoot);
  app.set('view engine', 'ejs');

  app.use('/public', express.static(path.join(appRoot, 'public')));
  app.use('/crossdomain.xml', express.static(path.join(appRoot, 'crossdomain.xml')));
  app.use('/humans.txt', express.static(path.join(appRoot, 'humans.txt')));
  app.use('/robots.txt', express.static(path.join(appRoot, 'robots.txt')));

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.use(function (req, res) {
    res.status(404);
    if (req.accepts('html')) {
      res.render('404.ejs', {url: req.url});
      return;
    }
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  });
}

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});
