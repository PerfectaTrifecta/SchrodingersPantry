const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sql } = require('./db/index');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const { instrument } = require('@socket.io/admin-ui');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const router = require('./routes/index.js');
require('./auth/passport-config.js')(passport);

require('dotenv').config();

app.use(cors());

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/', express.static(DIST_DIR));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

passport.serializeUser(function (user, cb) {
  // console.log(user, 'serialize');
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  // console.log(user, 'deserialize');
  cb(null, user);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(
  session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
  })
); //

router(app);
const PORT = 4000;
app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
sql
  .authenticate()
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

///////////////////Socket Server/////////////////////
// const socketPort = 443;
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4000', 'https://admin.socket.io'],
    method: ['GET', 'POST'], //methods to allow. maybe add more.
  },
});
io.path('/socket.io');
//Socket io acts by listening to events.
io.on('connection', (socket) => {
  console.log(`USER CONNECTED ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data); //data is room id passed from front end.
    console.log(`User with ID ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data); //emit data to room where it originated.
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED', socket.id);
  });
});

instrument(io, { auth: false });

server.listen(3001, () => {
  console.log('socket server listening');
});
