import React, { useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';


const Login = () => {

  return (
    <div> 
      <a className="button google" href="/auth/google">Sign in with Google</a>
    </div>
  )
};

export default Login;