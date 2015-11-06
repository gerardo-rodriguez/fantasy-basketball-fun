var express = require('express');
var fantasysports = require('fantasysports');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('request:', req.query);
  fantasysports.endAuth(req, res);
})

module.exports = router;
