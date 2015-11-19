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
    .api('http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueID + '/players;status=A;start=0;count=100?format=json')
    .done(function(data) {
      // var players = data['fantasy_content'].league[1].players;
      var playersObj = data['fantasy_content'].league[1].players;
      var playersData = [];

      // Let's clean up the data a bit, make it easier to access.
      for (var prop in playersObj) {
        if (playersObj[prop].player !== undefined) {
          var playerData = playersObj[prop].player[0];
          var playerObj = {};

          // Pull out of array and add to playerObj
          playerData.forEach(function(detailObj, index, array) {
            for (var key in detailObj) {
              playerObj[key] = detailObj[key];
            }
          });

          playersData.push(playerObj);
        }
      };

      // res.json(players);
      res.render('players', { title: 'Available Players', players: playersData });
    });
});

module.exports = router;
