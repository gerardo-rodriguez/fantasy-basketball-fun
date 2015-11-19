'use strict';

var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Add OAuth modules
var FantasySports = require('fantasysports');
var session = require('express-session');
// Our routes
var routes = require('./server-side/routes/index');
var users = require('./server-side/routes/users');
var oauth = require('./server-side/routes/oauth');
var callback = require('./server-side/routes/callback');
var go = require('./server-side/routes/go');
var leagues = require('./server-side/routes/leagues');
var league = require('./server-side/routes/league');
var leaguesAPI = require('./server-side/routes/leagues.api');

var app = express();

// Set up the oauth settings.
FantasySports.options({
  'accessTokenUrl': config.yahoo.accessTokenUrl,
  'requestTokenUrl': config.yahoo.requestTokenUrl,
  'oauthKey': process.env.OAUTH_KEY,
  'oauthSecret': process.env.OAUTH_SECRET,
  'version': config.yahoo.version,
  'callback': config.yahoo.callbackUrl,
  'encryption': config.yahoo.encryption
});

// view engine setup
app.set('views', path.join(__dirname, 'server-side/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Required
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth/oauth', oauth);
app.use('/auth/oauth/callback', callback);
app.use('/go', go);
app.use('/leagues/', leagues);
app.use('/league/', league);

app.use('/api/leagues', leaguesAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
