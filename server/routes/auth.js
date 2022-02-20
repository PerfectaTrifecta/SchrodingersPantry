const axios = require('axios').default;
const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();
var accessToken;

authRouter.get('/spotify/login', passport.authenticate('spotify', { 
  scope: ['streaming', 'user-read-email', 'user-read-private'] 
}));

authRouter.get('/spotify/callback', 
  passport.authenticate('spotify', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  console.log(req.user, 17);
  accessToken = req.user;
  res.cookie(accessToken);
  res.redirect('/');
});
// console.log(accessToken, 20);
authRouter.get('/token', (req, res) => {
  console.log(accessToken, 21);
  res.json(
    {
      accessToken: accessToken
    }
  )
})
module.exports = { authRouter, accessToken };