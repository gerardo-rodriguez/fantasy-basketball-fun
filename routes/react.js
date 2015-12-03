'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('react', { title: 'React Application', name: 'Gerardo' });
});

module.exports = router;
