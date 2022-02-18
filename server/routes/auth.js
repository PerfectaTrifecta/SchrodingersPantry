const { Router } = require('express');
const passport = require('passport');
const { GoogleStrategy } = require('../oauth/passport');

const authRouter = Router();

authRouter.get('/oauth2/redirect/google', passport.authenticate('google'));