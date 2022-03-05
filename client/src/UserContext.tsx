import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface userTypes {
  id: string;
  userName: string;
  preference?: string;
  favorites: Array<{} | null>;
  pics: Array<{} | null>;

}



interface UserContextType {
  user?: userTypes;
  setUser: React.Dispatch<React.SetStateAction<userTypes>>;
  getUser: () => void;
  userAccount: () => void;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userTypes | any>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);



  const getUser = () => {
    if (loggedIn === false) {
      axios
        .get('/auth/user')
        .then(({ data }) => {
          //console.log(data[0], 'context 31');
          setUser(data[0]);
          setLoggedIn(true);
        })
        .catch((err) => console.error('error context 34', err));
    }
  };


  const userAccount = () => {
    
    if (user !== null ) {
      //console.log(user);
    return axios.post(`/auth/account`, user)
        .then(({ data }) => {
           const acct = {
      id: user.id,
      userName: data.userName,
      favorites: data.favorites,
      pics: data.pics
      
    };
      //console.log(data);
      setUser(acct);
      
        })
        .catch((err) => {
          console.error(err, " response from User context post request");
        })
    } else {
      return
    }
    //console.log(user, "successfully changed")
  }


  const UserProps: UserContextType = {
    loggedIn,
    setLoggedIn,
    user,
    getUser,
    setUser,
    userAccount
  };

  return (
    <UserContext.Provider value={UserProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
