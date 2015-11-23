'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);

  if (req.session.oauthAccessToken !== undefined) {
    res.redirect('/leagues');
  } else {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;
