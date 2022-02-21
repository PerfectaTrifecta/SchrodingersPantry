import React from 'react';
// import CreateRecipeForm from './components/Profile/CreateRecipeForm';
// import HomePage from './components/Home Page/HomePage';
// import PulloutMenu from './components/Home Page/PulloutMenu';
// import RSSFeed from './components/rss/RSSFeedContainer';
// import Search from './components/Search';
// import ProfilePage from './components/Profile/ProfilePage';
// import VideoModal from './components/VideoModal';
// import { Route, Switch, Link } from 'react-router-dom';
import  ProfileImage  from './components/Profile/ProfileImage.jsx';

// : React.FC = (): JSX.Element 
const App = () => {
  return (
    <div>
      {/* <Link to={'/'}>
        <img src="client/images/testlogo.png" alt="logo" />
      </Link>
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
          
        </Route>
      </Switch> */}
  <ProfileImage /> 
    </div>
  );
};
export default App;
