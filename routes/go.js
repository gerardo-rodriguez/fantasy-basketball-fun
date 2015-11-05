var express = require('express');
var Client = require('node-rest-client').Client;
var client = new Client();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log('session:', req.session);

  // client.get('http://fantasysports.yahooapis.com/fantasy/v2/league/', function(data, response) {
  //
  //   console.log('data', data);
  //   console.log('response', response);
  //
  //   if (response.statusCode != 200) {
  //     res.send(response.headers.status);
  //     return;
  //   }
  //
  //   res.render('index', { stuff: data });
  // });

  res.render('index', { title: 'API me!' });
});

module.exports = router;
