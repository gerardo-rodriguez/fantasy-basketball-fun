var express = require('express');
var fantasysports = require('fantasysports');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // We have the access token and access secret!!!
  console.log('session:', req.session);

  fantasysports.request(req, res)
    .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nba/leagues?format=json')
    // .api('http://fantasysports.yahooapis.com/fantasy/v2/league/353.l.104969?format=json')
    .done(function(data) {
      var leagues = data['fantasy_content']['users'][0]['user'][1]['games'][0]['game'][1]['leagues'][0]['league'];

      // res.json(leagues);
      res.render('leagues', { title: 'Your Leagues', leagues: leagues });
    });
});

module.exports = router;
