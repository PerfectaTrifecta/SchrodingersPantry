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
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { PaletteOptions } from '@mui/material';
import { light, dark, veggie, meat } from './Theme';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface ThemeOptions {
  palette?: PaletteOptions;
}

interface MyRecipeTypes {
  id?: number;
  userId?: string;
  title?: string;
  ingredients?: string;
  instructions?: string;
  vote_count?: number;
  comment_count?: number;
  createdAt?: string;
}

const App: React.FC = (): JSX.Element => {
  const [zoom, setZoom] = React.useState(10); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 29.951065,
    lng: -90.071533,
  });

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
  };

  const { getUser, user, userAccount, loggedIn } = useContext(UserContext);
  let recipes: Array<MyRecipeTypes | []> = [];

  if (loggedIn) {
    recipes = user.recipes;
  }

  const [recipeList, setRecipeList] = useState<MyRecipeTypes[] | null>(recipes);

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
      <div>
        {' '}
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
            <ClimbingBoxLoader loading={loading} size={30} />
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
                <ProfilePage
                  recipeList={recipeList}
                  setRecipeList={setRecipeList}
                />
              </Route>
              <Route path='/recipe_view'>
                <RecipeView />
              </Route>
              <Route path='/meal_prep'>
                <MealPrep />
              </Route>
              <Route path='/market_finder'>
                <Wrapper
                  apiKey={process.env.GOOGLE_MAPS_API_KEY}
                  render={render}
                >
                  <Map
                    setCenter={setCenter}
                    setZoom={setZoom}
                    center={center}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{
                      flexGrow: '1',
                      height: '1000px',
                      width: '1000px',
                      'margin-left': 'auto',
                      'margin-right': 'auto',
                    }}
                  ></Map>
                </Wrapper>
              </Route>
              <Route path='/create_recipe'>
                <CreateRecipeForm
                  recipeList={recipeList}
                  setRecipeList={setRecipeList}
                />
              </Route>
              <Route path='/live_chat'>
                <InviteToChat />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
