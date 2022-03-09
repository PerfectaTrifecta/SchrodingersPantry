import React, { useState, useEffect, useContext } from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import RecipeView from './components/RecipeView';
import Map from './components/marketLocator/map'
import VideoModal from './components/VideoModal';
import MealPrep from './components/MealPrep/AddMealToCal';
import { Route, Switch, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material';
import { light, dark, veggie, meat } from './Theme';
import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css';
import { ClimbingBoxLoader } from 'react-spinners';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


const render = (status: Status) => {
  return <h1>{status}</h1>;
};
interface ThemeOptions {
  palette?: PaletteOptions;
}

const App: React.FC = (): JSX.Element => {
  const [zoom, setZoom] = React.useState(10); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 29.951065,
    lng: -90.071533,
  });

  

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    // setZoom(m.getZoom()!);
    // setCenter(m.getCenter()!.toJSON());
  };





  
  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  // socket is what we call the actual connection to the socket server
  const socket = io.connect('ws://localhost:443');

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
    if (room !== '') {
      socket.emit('join_room', room);
      setUsername(user.userName);
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
            <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} render={render}>
             <Map
              setCenter={setCenter}
              setZoom={setZoom}
              center={center}
              onIdle={onIdle}
              zoom={zoom}
              style={{flexGrow: '1', height: '500px', width: '500px'}}
             >
             </Map>
            </Wrapper>
            </Route>
          </Switch>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
