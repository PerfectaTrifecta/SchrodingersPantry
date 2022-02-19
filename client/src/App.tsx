import React from 'react';
import Search from './Search';
import Login from './spotify/Login';
const App: React.FC = (): JSX.Element => {
  return (
    <div>
      {' '}
      What up World
      {/* <Search /> */}
      <Login/>
    </div>
  );
};

export default App;
