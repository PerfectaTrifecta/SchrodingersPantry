import React from 'react';
import Search from './Search';
import Login from './Login';

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Login />
      <Search />
    </div>
  );
};

export default App;
