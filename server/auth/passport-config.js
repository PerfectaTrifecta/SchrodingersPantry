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

        passport.serializeUser(function (user, done) {
          done(null, user);
        });
      
       
        console.log(accesToken, 24);
        process.nextTick(function () {
          // To keep the example simple, the user's spotify profile is returned to
          // represent the logged-in user. In a typical application, you would want
          // to associate the spotify account with a user record in your database,
          // and return that user instead.
          return done(null, accesToken, refreshToken, profile);
        });
      }
    )
  )
}