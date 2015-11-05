var express = require('express');
var router = express.Router();


// TODO: Put the consumerKey and consumerSecret in a safer place!!!
passport.use(new YahooStrategy({
    consumerKey: 'dj0yJmk9VTYxNlFEd014bnpDJmQ9WVdrOVNtZEtjRFZzTm04bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xNw--',
    consumerSecret: 'c26c3cda6c3894d67d65bbe86292e24885073971',
    callbackURL: 'http://fantasy-basketball-fun.herokuapp.com/auth/yahoo/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ yahooId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/auth/yahoo', passport.authenticate('yahoo'));

router.get('/auth/yahoo/callback',
  passport.authenticate(
    'yahoo', {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
);

module.exports = router;
