import React from 'react';

function SpotLog() {
  return (
    <div
      className='App'
      style={{ maxWidth: '165px', maxHeight: '50px', textDecoration: 'none' }}
    >
      <header className='App-header'>
        <a className='btn-spotify' href='/auth/spotify/login'>
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default SpotLog;
