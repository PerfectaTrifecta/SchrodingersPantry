import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Chat from './Chat';
import '../App.css';
import { io } from 'socket.io-client';
import useTheme from '@mui/material/styles/useTheme';

const socket = io(process.env.CHAT_SOCKET || 'http://localhost:3001');

const InviteToChat: React.FC = () => {
  const theme = useTheme();

  const [showChat, setShowChat] = useState(false);
  const { getUser, user } = useContext(UserContext);
  // const [username, setUsername] = useState('');
  // const [room, setRoom] = useState('');
  const { userName } = user;
  const { idMeal } = useParams<{ idMeal: string }>();

  const joinRoom = () => {
    if (userName !== '' && idMeal !== '') {
      socket.emit('join_room', idMeal);
      setShowChat(true);
    }
  };

  socket.on('connect', () => {
    console.log('Socket Connected!');
  });

  return (
    <div className='chatContainer'>
      {getUser()}
      {!showChat ? (
        <div className='joinChatContainer'>
          <button
            onClick={joinRoom}
            style={{
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.secondary.main,
            }}
          >
            Live Chat
          </button>
        </div>
      ) : (
        <Chat socket={socket} />
      )}
    </div>
  );
};

export default InviteToChat;
