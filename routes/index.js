var express = require('express');
// var data = require('../league-data.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // var leagues = data['fantasy_content']['users'][0]['user'][1]['games'][0]['game'][1]['leagues'][0]['league'];
  // res.render('index', { title: 'Express', leagues: leagues });
  console.log(req.session);
  res.render('index', { title: 'Express' });
});

module.exports = router;
