import React, { useState, useContext } from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import RecipeView from './components/RecipeView';
import VideoModal from './components/VideoModal';
import { Route, Switch, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import io from 'socket.io-client';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:3001');

const App: React.FC = (): JSX.Element => {
  const { getUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {getUser()}

      <PulloutMenu />
      <div>
        {!showChat ? (
          <div className='enterChatContainer'>
            <h2>Enter Chatroom</h2>
            <input
              type='text'
              placeholder='Username'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type='text'
              placeholder='Room ID...'
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/recipe_finder'>
          <Search />
        </Route>
        <Route path='/rss'>
          <RSSFeed />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path='/recipe_view'>
          <RecipeView />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
