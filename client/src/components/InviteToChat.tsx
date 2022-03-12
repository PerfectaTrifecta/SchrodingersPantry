import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import Chat from './Chat';
import '../App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const InviteToChat: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className='chatContainer'>
      {getUser()}
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Live Chat</h3>
          <input
            type='text'
            placeholder='Room ID...'
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default InviteToChat;
