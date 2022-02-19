const axios = require('axios').default;
const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

authRouter.get('/spotify/login', passport.authenticate('spotify', {
  scope: ['streaming', 'user-read-email', 'user-read-private']
}));

authRouter.get('/spotify/callback', 
  passport.authenticate('spotify', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  console.log(res);;
});

module.exports = { authRouter };