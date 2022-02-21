const express = require('express');
const path = require('path');
const passport = require('passport');
const { sql } = require('./db/index.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

const router = require('./routes/index.js');

require('dotenv').config();

const app = express();
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/', express.static(DIST_DIR));

app.use(cookieParser());
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
  // console.log(user, 'serialize');
  cb(null, user);

});

passport.deserializeUser(function(user, cb) {
  // console.log(user, 'deserialize');
  cb(null, user);
 
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


router(app);
const PORT = 4000;
app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'))
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
sql.authenticate()
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));


module.exports = cloudinary;


