const express = require('express');
const session = require('express-session')
const passport = require('passport');
const path = require('path');
const router = require('./routes/index.js');
require('./auth/passport-config')(passport);


const PORT = 4000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const app = express();

app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,
})); // 
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

router(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
