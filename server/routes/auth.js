const { Router } = require('express');
const passport = require('passport');
const { GoogleStrategy } = require('../oauth/passport');
const { User } = require('../db/index');

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  (res, req) => {
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
  res.clearCookie('googleId');
  res.status(200);
  res.redirect('/');
});

module.exports = { authRouter };
