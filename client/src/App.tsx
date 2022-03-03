
import React, { useState, useEffect } from 'react';
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
import Favorite from './components/Favorite';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";



const App: React.FC = (): JSX.Element => {
  // const { getUser } = useContext(UserContext);

const [loading, setLoading] = useState(false);
let [color, setColor] = useState("#1682B2");

useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 8000)
}, [])

  return (
    <div>
      {/* {getUser()} */}
    {loading ? 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <ClimbingBoxLoader color={color} loading={loading}  size={30} />
      </div>

      :


  <div>
      <PulloutMenu />
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
        {/* <Route path='/recipe_view'>
          <RecipeView />
        </Route> */}
        <Route path='/meal_prep'>
          <MealPrep />
        </Route>

      </Switch>
    </div>
      }
      </div>
  );
};
export default App;
