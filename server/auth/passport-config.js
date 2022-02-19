const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy
const crypto = require('crypto');
const dotenv = require('dotenv');
const { userInfo } = require('os');
dotenv.config()



module.exports = passport => {
  passport.use('spotify',
    new SpotifyStrategy(
      {
        spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http:localhost:4000/auth/spotify/callback'
      },
      function(accesToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({ spotifyId: profile.id}, function(err, user) {
          return done(err, user);
        })
      }
    )
  )
}