const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db/index.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/google/callback'
},
(accessToken, refreshToken, profile, cb) => {
  //find or create the user
  console.log('passport 13');
  User.findOrCreate({
    where: { id: profile.id},
    defaults: { name: profile.displayName}
  })
  .then((user) => {
    console.log(user[0], '19?');
    cb(null, profile);
  })
  .catch(err => console.log(err, 'passport 21'));
}));

module.exports = {
  GoogleStrategy,
};