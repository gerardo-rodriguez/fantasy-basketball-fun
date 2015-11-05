var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('request query:', req.query);
  // res.end(JSON.stringify(req.query, null, 2));
  res.redirect('/');
})

module.exports = router;
