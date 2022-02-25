const { Router } = require('express');
const passport = require('passport');
const { User } = require('../db/index');

const authRouter = Router();
let accessToken;

authRouter.get(
  '/spotify/login',
  passport.authenticate('spotify', {
    scope: ['streaming', 'user-read-email', 'user-read-private'],
  })
);

authRouter.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    accessToken = req.user;
    // res.cookie('spotify', accessToken);
    res.redirect('/');
  }
);
// console.log(accessToken, 20);
authRouter.get('/token', (req, res) => {
  res.json({
    accessToken: accessToken,
  });
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  () => {
    console.log('/google successful');
  }
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/logout',
  }),
  (req, res) => {
    console.log(req.session.passport.user.id, '/google/callback called');
    res.cookie('googleId', req.session.passport.user.id);
    res.redirect('/');
  }
);

authRouter.get('/user', (req, res) => {
  // console.log(req.cookies, 'auth 20');
  if (req.cookies.googleId) {
    User.findAll({
      where: {
        id: req.cookies.googleId,
      },
    })
      .then((user) => {
        res.status(200);
        res.send(user);
      })
      .catch((err) => console.error('auth 28', err));
  }
});

authRouter.get('/logout', (req, res) => {
  console.log('yep');
  res.clearCookie('googleId');
  res.clearCookie('connect.sid');
  res.status(200);
  res.redirect('/');
});

module.exports = { authRouter, accessToken };
