var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Add OAuth modules
var FantasySports = require('fantasysports');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var oauth = require('./routes/oauth');
var callback = require('./routes/callback');
var go = require('./routes/go');
var leagues = require('./routes/leagues');
var league = require('./routes/league');

var app = express();

FantasySports.options({
  'accessTokenUrl': 'https://api.login.yahoo.com/oauth/v2/get_request_token',
  'requestTokenUrl': 'https://api.login.yahoo.com/oauth/v2/get_token',
  'oauthKey': process.env['OAUTH-KEY'],
  'oauthSecret': process.env['OAUTH-SECRET'],
  'version': '1.0',
  'callback': 'http://fantasy-basketball-fun.herokuapp.com/auth/oauth/callback',
  'encryption': 'HMAC-SHA1'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Required
app.use(session({
  secret: 'something something secret',
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
