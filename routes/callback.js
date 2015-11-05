var express = require('express');
var FantasySports = require('FantasySports');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('request:', req.query);
  FantasySports.endAuth(req, res);
})

module.exports = router;
