'use strict';

var express = require('express');
var fantasysports = require('fantasysports');
var config = require('../../config');
var cleanup = require('../../utility/cleanup');
var router = express.Router();

/* GET responds with all the leagues for the current user */
router.get('/', function(req, res, next) {
  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'users;use_login=1/games;game_keys=nba/leagues?format=json')
    .done(function(data) {
      var leagues = data['fantasy_content']['users'][0]['user'][1]['games'][0]['game'][1]['leagues'][0]['league'];

      res.json(leagues);
    });
});

/* GET responds with data for a specific league */
router.get('/:id', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'league/' + leagueID + '?format=json')
    .done(function(data) {
      var league = data['fantasy_content'].league[0];

      res.json(league);
    });
});

/* GET responds with basic data for all teams within a specific league */
router.get('/:id/teams', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api(config.yahoo.apiURL + 'league/' + leagueID + '/teams?format=json')
    .done(function(data) {
      var teamsData = cleanup.teams(data);

      var response = {
        'data': {
          'teams': teamsData
        }
      };

      res.json(response);
    });
});

module.exports = router;
