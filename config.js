'use strict';

var config = {
  yahoo: {
    accessTokenUrl: 'https://api.login.yahoo.com/oauth/v2/get_request_token',
    requestTokenUrl: 'https://api.login.yahoo.com/oauth/v2/get_token',
    callbackUrl: 'http://fantasy-basketball-fun.herokuapp.com/auth/oauth/callback',
    version: '1.0',
    encryption: 'HMAC-SHA1',
    apiURL: 'http://fantasysports.yahooapis.com/fantasy/v2/'
  },
  session: {
    secret: 'top-notch secret stuff here, mijo'
  }
};

module.exports = config;
