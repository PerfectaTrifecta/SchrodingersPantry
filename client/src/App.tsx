// import React, { useState, useEffect} from 'react';
// import Search from './Search';
// import Login from './spotify/Login';
// import WebPlayback from './spotify/WebPlayback';
// import axios from 'axios'

// interface TokenValue {
//   token: String
// }

// const App: React.FC = (): JSX.Element => {
//   const [token, setToken] = useState(undefined);
  

//   useEffect(() => {

//     async function getToken() {
//       const response = axios.get('/auth/token').then(res => {
//         setToken(res.data.accessToken)
//       });
//       // setToken(json.access_token);

//     }

//     getToken();
//   }, []);
  
//   return (
//     <div>
//       {' '}
//       What up World
//       {/* <Search /> */}
//          { token === undefined ? <Login/> : <WebPlayback token={token}/> }
import React, { useState, useContext } from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import VideoModal from './components/VideoModal';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';


const App: React.FC = (): JSX.Element => {
  
  const { getUser } = useContext(UserContext)

  return (
    <div>
      {getUser()}
      
      <PulloutMenu />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path="/recipe_finder">
          <Search />
        </Route>
        <Route path='/rss'>
          <RSSFeed />
        </Route>
        <Route path='/profile'>
          <ProfilePage /> 
        </Route>
      </Switch>

    </div>
  );
};
export default App;
