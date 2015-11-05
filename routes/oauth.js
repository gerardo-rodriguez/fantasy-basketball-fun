var express = require('express');
var passport = require('passport');
var YahooStrategy = require('passport-yahoo-oauth').Strategy;
var router = express.Router();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Yahoo profile is
//   serialized and deserialized.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

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
  passport.authenticate('yahoo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // TODO: Should this be something you can pass as a parameter? How?
    res.redirect('/');
  });

// app.get('/auth/yahoo',
//   passport.authenticate('yahoo'));
//
// app.get('/auth/yahoo/callback',
//   passport.authenticate('yahoo', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

module.exports = router;
