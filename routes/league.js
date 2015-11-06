var express = require('express');
var fantasysports = require('fantasysports');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var leagueID = req.params.id;

  fantasysports.request(req, res)
    .api('http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueID + '?format=json')
    .done(function(data) {
      // var leagues = data['fantasy_content']['users'][0]['user'][1]['games'][0]['game'][1]['leagues'][0]['league'];

      res.json(data);
      // res.render('index', { title: 'Your Leagues', leagues: leagues });
    });

  // res.render('league', { title: leagueID });
});

module.exports = router;
