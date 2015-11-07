var express = require('express');
var fantasysports = require('fantasysports');
var router = express.Router();

router.get('/', function (req, res, next) {
  fantasysports.endAuth(req, res);
})

module.exports = router;
