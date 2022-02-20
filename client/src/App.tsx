import React, { useState, useEffect} from 'react';
import Search from './Search';
import Login from './spotify/Login';
import WebPlayback from './spotify/WebPlayback';
import axios from 'axios'

interface TokenValue {
  token: String
}

const App: React.FC = (): JSX.Element => {
  const [token, setToken] = useState(undefined);
  

  useEffect(() => {

    async function getToken() {
      const response = axios.get('/auth/token').then(res => {
        setToken(res.data.accessToken)
      });
      // setToken(json.access_token);

    }

    getToken();
  }, []);
  
  return (
    <div>
      {' '}
      What up World
      {/* <Search /> */}
         { token === undefined ? <Login/> : <WebPlayback token={token}/> }

    </div>
  );
};

export default App;
