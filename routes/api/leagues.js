var express = require('express');
var fantasysports = require('fantasysports');
var config = require('../config');
var router = express.Router();

/* GET leagues page. */
router.get('/', function(req, res, next) {
  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'users;use_login=1/games;game_keys=nba/leagues?format=json')
    .done(function(data) {
      var leagues = data['fantasy_content']['users'][0]['user'][1]['games'][0]['game'][1]['leagues'][0]['league'];

      res.json(leagues);
    });
});

router.get('/:id', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'league/' + leagueID + '?format=json')
    .done(function(data) {
      var league = data['fantasy_content'].league[0];

      res.json(league);
    });
});

router.get('/:id/teams', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'league/' + leagueID + '/teams?format=json')
    .done(function(data) {
      // var league = data['fantasy_content'].league[0];

      res.json(data);
    });
});

module.exports = router;
