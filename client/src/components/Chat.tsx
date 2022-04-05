import React, { useEffect, useState, useContext, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom'; /*<-- Researched 
this and there does not appear to be a fix. It doesn't break anything*/
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '@mui/material/styles/useTheme';

type Props = {
  socket: Socket;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SocketData {
  author: string;
  room: string;
  message: string;
  time: Date;
}

const Chat: React.FC<Props> = ({ socket, showChat, setShowChat }) => {
  const theme = useTheme();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { user } = useContext(UserContext);
  const { userName } = user;
  const { idMeal } = useParams<{ idMeal: string }>();
  const sendMessage = async () => {
    const currentTime: Date = new Date();
    if (currentMessage !== '') {
      const messageData = {
        room: idMeal,
        author: userName,
        message: currentMessage,
        time: moment(currentTime).format('h:mm a'),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: SocketData) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Draggable>
      <div className='chat-window'>
        <div
          className='chat-header'
          style={{ backgroundColor: theme.palette.primary.light }}
        >
          <CloseIcon
            style={{
              float: 'right',
              fontSize: 'large',
              fontWeight: '700',
              marginTop: '10px',
              marginRight: '5px',
            }}
            onClick={}
          />
          <p style={{ color: theme.palette.primary.dark }}>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='chat-body'>
            {messageList.map((messageContent, i) => {
              return (
                <div
                  key={i}
                  className='message'
                  id={userName === messageContent.author ? 'you' : 'other'}
                >
                  <div>
                    <div className='message-content'>
                      <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p>{`${messageContent.author} ${messageContent.time}`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className='chat-footer'>
          <input
            type='text'
            value={currentMessage}
            placeholder='message...'
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === 'Enter' && sendMessage();
            }}
          ></input>
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.dark,
            }}
          >
            &#9658;
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default Chat;
