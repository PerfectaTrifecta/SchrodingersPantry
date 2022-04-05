const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sql } = require('./db/index');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = express();
//Setting up http server for websockets.
const http = require('http');
const httpServer = http.createServer(express());

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
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
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
//io listens to events that originate from the other server on port 4000.
const io = require('socket.io')(httpServer, {
  cors: {
    origin: [process.env.EC2_IP || 'http://localhost:4000'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`USER CONNECTED ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data); //data is room id passed from front end.
    // console.log(`User with ID ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data); //emit data to room where it originated.
  });

  socket.on('disconnect', () => {
    // console.log('USER DISCONNECTED', socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log('socket server listening');
});
