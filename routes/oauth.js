var express = require('express');
var FantasySports = require('fantasysports');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('request:', req.query);
  FantasySports.startAuth(req, res);
})

module.exports = router;
