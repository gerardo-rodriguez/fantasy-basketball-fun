var express = require('express');
var fantasysports = require('fantasysports');
var router = express.Router();

/* GET league page. */
router.get('/:id', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api('http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueID + '?format=json')
    .done(function(data) {
      var league = data['fantasy_content'].league[0];

      // res.json(data);
      res.render('league', { title: league.name, league: league });
    });
});

/* GET league page. */
router.get('/:id/players', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api('http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueID + '/players;status=A?format=json')
    .done(function(data) {
      var players = data['fantasy_content'].league[1].players;

      // res.json(players);
      res.render('players', { title: 'Available Players', players: players });
    });
});

module.exports = router;
