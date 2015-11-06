var express = require('express');
var fantasysports = require('fantasysports');
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // We have the access token and access secret!!!
  console.log('session:', req.session);

  fantasysports.request(req, res)
    .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nba/leagues?format=json')
    .done(function(data) {
      console.info('--------> the data:', data.fantasy_content.users[0].games[0]);
      var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues,
          leagues = [];

      _.each(leagueData, function(value) {
        if (value.league) {
          leagues.push(value.league[0]);
        }
      });

      res.json(leagues);
    });

  // res.render('index', { title: 'API me!' });
});

module.exports = router;
