import React, { useState, useEffect} from 'react';
import Search from './Search';
import Login from './spotify/Login';
// import WebPlayback from './spotify/WebPlayback';

const App: React.FC = (): JSX.Element => {
  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);
  return (
    <div>
      {' '}
      What up World
      {/* <Search /> */}
      <Login/>
        {/* { (token === '') ? <Login/> : <WebPlayback token={token} /> } */}

    </div>
  );
};

export default App;
