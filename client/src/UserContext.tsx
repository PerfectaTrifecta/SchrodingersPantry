import React, {
  useState,
  useEffect,
  createContext,
  ReactEventHandler,
} from 'react';
import axios from 'axios';

interface userTypes {
  id?: string;
  userName?: string;
  diet?: string;
  allergies?: string;
  bio?: string;
  theme?: string;
  favorites?: Array<string> | [];
  pics?: Array<{} | null>;
  recipes?: Array<{
    id: number;
    userId: string;
    title: string;
    ingredients: string;
    instructions: string;
    vote_count: number;
    comment_count: number;
    createdAt: string;
  } | null>;
  bookmarks?: Array<{
    id: number;
    link: string;
    title: string;
    creator: string;
    relTime: string;
    img: string;
  } | null>;
  image?: string;
}

interface UserContextType {
  user?: userTypes;
  setUser: React.Dispatch<React.SetStateAction<userTypes>>;
  getUser: () => void;
  userAccount: () => void;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  favorites?: Array<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<string>>>;
  profileImage?: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userTypes | any>({
    userName: 'Guest',
    diet: 'none',
    allergies: 'none',
    bio: 'none',
    theme: 'light',
    recipes: [],
    bookmarks: [],
    favorites: [],
    image:
      'https://res.cloudinary.com/schrodinger-s-pantry/image/upload/v1649210858/eftem6mzfrhgcnpbevuk.png',
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Array<string>>([]);
  const [profileImage, setProfileImage] = useState<string>(user.image);

  // const updateFavs = (e: ReactEventHandler) => {
  //  //take recipe id and add it to user's favorites, then setFavorites to that value

  // }

  const getUser = () => {
    if (loggedIn === false) {
      console.log(user, 'context 82');

      axios
        .get('/auth/user')
        .then(({ data }) => {
          console.log(data, 'context 69');
          setUser(data[0]);
          setProfileImage(data[0].image);
          setLoggedIn(true);
        })
        .catch((err) => console.error('error context 73', err));
    }
  };

  //this function sends a user with properties from user table in db, then receives a new user object with favs and pics
  const userAccount = () => {
    if (user.userName !== 'Guest') {
      //console.log(user);
      axios
        .post(`/auth/account`, user)
        .then(({ data }) => {
          setUser(data);
          console.log(data, 'userContext 84');
        })
        .catch((err) => {
          console.error(err, ' response from User context post request');
        });
    } else {
      return;
    }
    //console.log(user, "successfully changed")
  };

  const UserProps: UserContextType = {
    profileImage,
    setProfileImage,
    favorites,
    setFavorites,
    loggedIn,
    setLoggedIn,
    user,
    getUser,
    setUser,
    userAccount,
  };

  return (
    <UserContext.Provider value={UserProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
