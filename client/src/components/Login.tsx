import React from 'react';
import useTheme from '@mui/material/styles/useTheme';

const Login = () => {
  const theme = useTheme();

  return (
    <div>
      <a
        id='button-google'
        href='/auth/google'
        style={{
          color: theme.palette.primary.contrastText,
          textDecoration: 'none',
        }}
      >
        Sign in with Google
      </a>
    </div>
  );
};

export default Login;
