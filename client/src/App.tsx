import React, { useState } from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import VideoModal from './components/VideoModal';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

//refactor user state to be userContext using react context
const App: React.FC = (): JSX.Element => {
  interface userProps {
    createdAt: string;
    id: string;
    name: string;
    preference: string;
    updatedAt: string;
  }

  const [user, setUser] = useState<userProps | null>(null);

  function getUser() {
    if (!user) {
      axios.get('/user')
        .then(({ data }) => {
          console.log(data[0], 'pullout 34');
          setUser(data[0]);
        })
        .catch(err => console.error('error pullout 38', err))
    }
  }

  function logout() {
    axios.get('/logout')
      .then(() => {
        setUser(null);
      })
      .catch(err => console.error('error pullout 47', err));
  }

  return (
    <div>
      {getUser()}
      <Link to={'/'}>
        <img src="https://upload.wikimedia.org/wikipedia/en/5/52/Star_Fox_SNES.jpg" width='200' />
      </Link>
      <PulloutMenu user={user} logout={logout}/>
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
          <ProfilePage user={user} /> 
        </Route>
      </Switch>

    </div>
  );
};
export default App;
