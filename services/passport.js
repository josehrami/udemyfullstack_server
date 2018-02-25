const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.baseURL + '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log(profile.emails[0].value)
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          u = { googleId: profile.id, email: profile.emails[0].value };
          console.log(u);
          // we don't have a user record with this ID, make a new record!
          new User(u)
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
