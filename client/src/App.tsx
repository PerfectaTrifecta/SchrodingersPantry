import React, { useState, useEffect, useContext } from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import RecipeView from './components/RecipeView';
import VideoModal from './components/VideoModal';
import MealPrep from './components/MealPrep/AddMealToCal';
import { Route, Switch, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import Favorite from './components/Favorite';
// import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css';

//import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";



//const socket = io.connect('http://localhost:3001');

const App: React.FC = (): JSX.Element => {
  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  // const [loading, setLoading] = useState(false);
// let [color, setColor] = useState("#1682B2");
  //const { userAccount, loggedIn } = useContext(UserContext);
  
  useEffect(() => {
 
      userAccount();

     
  }, [loggedIn]);

// useEffect(() => {
//   setLoading(true);
//   setTimeout(() => {
//     setLoading(false);
//   }, 8000)
// }, [])


  // const joinRoom = () => {
  //   if (room !== '') {
  //     socket.emit('join_room', room);
  //     setUsername(user.name);
  //     setShowChat(true);
  //   }

 
  // };
 

  return (
    <div>
     
      {getUser()}
      
    {/* {loading ? 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <ClimbingBoxLoader color={color} loading={loading}  size={30} />
      </div>

      : */}

          
  <div>
      <PulloutMenu />
      {/* <div>
        {!showChat ? (
          <div className='joinChatContainer'>
            <h3>Enter Chat</h3>
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
      </div> */}
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
        {/* <Route path='/profile'>
          <ProfilePage />
        </Route> */}
        <Route path='/recipe_view'>
          <RecipeView />
        </Route>
        <Route path='/meal_prep'>
          <MealPrep />
        </Route>
      </Switch>
    </div>
      {/* } */}
      </div>
  );
};
export default App;
