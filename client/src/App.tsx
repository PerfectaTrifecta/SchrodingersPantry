import React from 'react';
import CreateRecipeForm from './components/Profile/CreateRecipeForm';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './components/Search';
import ProfilePage from './components/Profile/ProfilePage';
import VideoModal from './components/VideoModal';


const App: React.FC = (): JSX.Element => {
  const dummy = {
    username: 'Keith',
    aboutMe: 'Yeeeeeee Yeeeeee yeyeyeyeye',
    creations: ['um', 'ig', 'well', 'nerver', 'know'],
    favorites: ["everyone", "wanted", 'to know', 'what i would do', 'if i DIDNT win']
  }
  const bummy = "shtupid";
  return (
    <div> 
      <PulloutMenu />
       {// <HomePage />
       }
      <Search  /> 
      {/* <CreateRecipeForm /> */}
      {/* <ProfilePage user={dummy}/> */}
    </div>
  );
};

export default App;
