const { Router } = require('express');
const passport = require('passport');
const { GoogleStrategy } = require('../oauth/passport');

const authRouter = Router();

authRouter.get('/login/federated/google', passport.authenticate('google'));