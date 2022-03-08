import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface userTypes {
  id: string;
  userName: string;
  preference?: string;
  favorites: Array<{
    id: number;
    userId: string;
    title: string;
    ingredients: string;
    instructions: string;
    vote_count: number;
    comment_count: number;
    createdAt: string;
  } | null>;
  pics: Array<{} | null>;
  recipes: Array<{
    id: number;
    userId: string;
    title: string;
    ingredients: string;
    instructions: string;
    vote_count: number;
    comment_count: number;
    createdAt: string;
  } | null>;
  bookmarks: Array<{
    id: number;
    url: string;
  } | null>;
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



  //this function sends a user with properties from user table in db, then receives a new user object with favs and pics
  const userAccount = () => {
    
    if (user !== null ) {
      //console.log(user);
     axios.post(`/auth/account`, user)
        .then(({ data }) => {

          // console.log(data, 'userContext 65');
          setUser(data);
      
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
