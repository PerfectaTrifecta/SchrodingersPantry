const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../db/index.js');

module.exports = (passport) => {
  passport.use(
    'spotify',
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/spotify/callback',
      },
      function (accesToken, refreshToken, expires_in, profile, done) {
        passport.serializeUser(function (user, done) {
          done(null, user);
        });
        passport.deserializeUser(function (user, done) {
          done(null, user);
        });

        process.nextTick(function () {
          return done(null, accesToken, refreshToken, profile);
        });
      }
    )
  );
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        //find or create the user
        // console.log('passport 13');
        console.log(profile, 'passport 45');
        User.findOrCreate({
          where: { id: profile.id },
          defaults: { userName: profile.displayName },
        })
          .then((user) => {
            // console.log(user[0], '19?');
            cb(null, profile);
          })
          .catch((err) => console.log(err, 'passport 21'));
      }
    )
  );
};
