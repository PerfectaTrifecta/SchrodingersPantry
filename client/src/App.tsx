import React from 'react';
import HomePage from './components/Home Page/HomePage';
import PulloutMenu from './components/Home Page/PulloutMenu';
import RSSFeed from './components/rss/RSSFeedContainer';
import Search from './Search';
import Login from './Login';

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Login />
      <HomePage />
      <Search />
    </div>
  );
};

export default App;
