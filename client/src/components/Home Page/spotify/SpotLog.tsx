import React from 'react';
import useTheme from '@mui/material/styles/useTheme';

function SpotLog() {
  const theme = useTheme();

  return (
    <div>
      <a
        style={{
          textDecoration: 'none',
          marginLeft: '15px',
          color: theme.palette.primary.contrastText,
        }}
        href='/auth/spotify/login'
      >
        Connect To Spotify
      </a>
    </div>
  );
}

export default SpotLog;
