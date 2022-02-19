const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy
const dotenv = require('dotenv');
dotenv.config()



module.exports = passport => {
  passport.use('spotify',
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/spotify/callback'
      },
      function(accesToken, refreshToken, expires_in, profile, done) {
        // User.findOrCreate({ spotifyId: profile.id}, function(err, user) {
        //   return done(err, user);
        // })
      }
    )
  )
}