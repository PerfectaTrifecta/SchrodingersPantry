import React, { useState, useEffect, useContext } from 'react';
import InviteToChat from './components/InviteToChat';
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

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

interface ThemeOptions {
  palette?: PaletteOptions;
}

const App: React.FC = (): JSX.Element => {
  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#1682B2');

  useEffect(() => {
    userAccount();
  }, [loggedIn]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [theme, setTheme] = useState<ThemeOptions>(light);

  const chosenTheme = createTheme(theme);

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
            <Route path='/live_chat'>
              <InviteToChat />
            </Route>
          </Switch>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
