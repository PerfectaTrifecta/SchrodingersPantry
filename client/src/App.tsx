
import React, { useState, useContext } from 'react';
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
import axios from 'axios';
import { UserContext } from './UserContext';
import { ThemeProvider } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material";
import { light, dark, veggie, meat } from "./Theme";

interface ThemeOptions {
  palette?: PaletteOptions
}

const App: React.FC = (): JSX.Element => {
  const { getUser } = useContext(UserContext);
  const [theme, setTheme] = useState<ThemeOptions>(dark);

  return (
    <ThemeProvider theme={ theme }>
      {getUser()}

      <PulloutMenu changeTheme={setTheme}/>
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

      </Switch>
    </ThemeProvider>

  );
};
export default App;
