const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000',
    method: ['GET', 'POST'], //methods to allow. maybe add more.
  },
});
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

server.listen(3001, () => {
  console.log('SOCKET SERVER RUNNING');
});
