'use strict';

var config = require('./config');
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Add OAuth modules
var FantasySports = require('fantasysports');
var session = require('express-session');
// Our routes
var index = require('./routes/index');
var users = require('./routes/users');
var oauth = require('./routes/oauth');
var callback = require('./routes/callback');
var leagues = require('./routes/leagues');
var league = require('./routes/league');
var leaguesAPI = require('./routes/api/leagues');
var react = require('./routes/react');

var app = express();

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
app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

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
// Include static assets
app.use(express.static(path.join(__dirname, 'public')));

// Set up the routes!
app.use('/', index);
// OAuth routes
app.use('/auth/oauth', oauth);
app.use('/auth/oauth/callback', callback);
// Learning routes to test stuff
app.use('/leagues/', leagues);
app.use('/league/', league);
app.use('/react', react);
// API routes
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
