const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../db/index.js');

module.exports = () => {
  passport.use(
    'spotify',
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL:
          process.env.SPOTIFY_CALLBACK_URL ||
          'http://localhost:4000/auth/spotify/callback',
      },
      function (accesToken, refreshToken, expires_in, profile, done) {
        passport.serializeUser(function (user, done) {
          done(null, user);
        });
        passport.deserializeUser(function (user, done) {
          done(null, user);
        });

        process.nextTick(() => {
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
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          'http://localhost:4000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        //find or create the user
       
        User.findOrCreate({
          where: { id: profile.id },
          defaults: { userName: profile.displayName },
        })
          .then(() => {
            cb(null, profile);
          })
          .catch((err) => console.log(err, 'passport 21'));
      }
    )
  );
};
