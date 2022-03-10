import React, { useState, useEffect, useContext } from 'react';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import RecipeView from './components/RecipeView';
import Map from './components/marketLocator/map';
import MealPrep from './components/MealPrep/AddMealToCal';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { PaletteOptions } from '@mui/material';
import { light, dark, veggie, meat } from './Theme';
import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const socket = io.connect('http://localhost:3001', { path: '/socket.io' });
interface ThemeOptions {
  palette?: PaletteOptions;
}

const App: React.FC = (): JSX.Element => {
  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  // socket is what we call the actual connection to the socket server

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#1682B2');
  // const { userAccount, loggedIn } = useContext(UserContext);

  useEffect(() => {
    userAccount();
  }, [loggedIn]);

  // console.log(user, 'app tsx 41');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [theme, setTheme] = useState<ThemeOptions>(light);

  const chosenTheme = createTheme(theme);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <ThemeProvider theme={chosenTheme}>
      {getUser()}

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <ClimbingBoxLoader color={color} loading={loading} size={30} />
        </div>
      ) : (
        <div>
          <PulloutMenu changeTheme={setTheme} />
          <div className='chatContainer'>
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
            <Route path='/meal_prep'>
              <MealPrep />
            </Route>
            <Route path='/market_finder'>
              <Map />
            </Route>
          </Switch>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
