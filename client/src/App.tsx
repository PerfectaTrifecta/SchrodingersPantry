import React from 'react';
import Search from './Search';
import Login from './spotify/Login';
import WebPlayback from './spotify/WebPlayback';
const App: React.FC = (): JSX.Element => {
  return (
    <div>
      {' '}
      What up World
      {/* <Search /> */}
      <Login/>
      {/* <WebPlayback/> */}
    </div>
  );
};

export default App;
