import React, { useState, useEffect, useContext } from 'react';
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
import { light, dark } from './Theme';

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

interface Bookmarks {
  id?: number;
  link: string;
  title: string;
  creator: string;
  relTime: string;
  img: string;
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
  let recipes: Array<MyRecipeTypes> = [];
  let bookmarks: Array<Bookmarks> = [];

  const [recipeList, setRecipeList] = useState<MyRecipeTypes[]>(recipes);
  const [bookmarkList, setBookmarkList] = useState<Bookmarks[]>(bookmarks);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // console.log(user, 'app 71');
      recipes = user.recipes;
      bookmarks = user.bookmarks;

      setRecipeList(recipes);
      setBookmarkList(bookmarks);
    }
  });

  useEffect(() => {
    userAccount();
    console.log(user, 'app 82');

    // if (loggedIn) {
    //   recipes = user.recipes;
    //   bookmarks = user.bookmarks;

    //   setRecipeList(recipes);
    //   setBookmarkList(bookmarks);
    // }
  }, [loggedIn]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [theme, setTheme] = useState<ThemeOptions>(light);
  const chosenTheme = createTheme(theme);

  return (
    <ThemeProvider theme={chosenTheme}>
      <div
        style={{ backgroundColor: chosenTheme.palette.primary.main, margin: 0 }}
      >
        {/* style={{ backgroundColor: appTheme.palette.primary.main }} */}
        {/* tried adding the theme colors to App to fill in the extra white spaces
        (inside the divs on line 95 and 112) but it didn't work like that */}
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
            <ClimbingBoxLoader
              loading={loading}
              size={30}
              color={chosenTheme.palette.primary.dark}
            />
          </div>
        ) : (
          <div>
            {/* style={{ backgroundColor: appTheme.palette.primary.main }}÷ */}
            <PulloutMenu changeTheme={setTheme} />
            <Switch>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Route path='/recipe_finder'>
                <Search />
              </Route>
              <Route path='/rss'>
                <RSSFeed
                  bookmarkList={bookmarkList}
                  setBookmarkList={setBookmarkList}
                />
              </Route>
              <Route path='/profile'>
                <ProfilePage
                  recipeList={recipeList}
                  setRecipeList={setRecipeList}
                  bookmarkList={bookmarkList}
                  setBookmarkList={setBookmarkList}
                />
              </Route>
              <Route path='/recipe_view/:idMeal'>
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
            </Switch>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
