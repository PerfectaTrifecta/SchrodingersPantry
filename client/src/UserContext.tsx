import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface UserTypes{
  googleId?: number,
  userName?: string,
  profileImage?: File | null,
  selectedImage?: File | null,
}

interface UserContextType {
  googleId?: number,
  setGoogleId: React.Dispatch<React.SetStateAction<number>>,
  userName?: string,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  profileImage?: File | null,
  setProfileImage:React.Dispatch<React.SetStateAction<File | null>>,
  selectedImage?: File | null,
  setSelectedImage:React.Dispatch<React.SetStateAction<File | null>>
  user?: UserTypes,
  setUser: React.Dispatch<React.SetStateAction<UserTypes>>,
  getProfileImage: () => void,
  updateProfileImage: () => void
}
interface Props {
  children: React.ReactNode,
}

const UserContext = createContext({} as UserContextType);

function UserContextProvider({ children } : Props) {

  const [user, setUser] = useState<UserTypes>({} as UserTypes);
  const [userName, setUserName] = React.useState<string>('');
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [googleId, setGoogleId] = React.useState<number>(0);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  // FOR USERS THAT HAVE UPLOADED AN IMAGE

  const getProfileImage = () => {
// on successful login, google id should update in state, 

//make axios request to backend to find user by google id
//save user in response to state
    axios.get('/:user')
      .then((data) => {

      })
      .catch((err) => {
        console.error(err);
      })
//make a new axios get request to cloudinary for that user's image id 
//save the response file in the state as profile image

//render image in profile image componenet
  }

//FOR USERS POSTING AN IMAGE

const updateProfileImage = () => {
//user state should update on login, on click of upload in profile image component save their file input as profile image in state 
// send patch request to cloudinary with that user id
  axios.patch('/user/upload')
    .then(() => {

    })
    .catch(() => {

    })
//save cloudinary secret to user image uploads
//front end accepts file in response, updates state of profile image and renders image
}


 const UserProps: UserContextType = {
   getProfileImage,
   updateProfileImage,
   googleId,
   setGoogleId,
   selectedImage,
   setSelectedImage,
   profileImage,
   setProfileImage,
   userName,
   setUserName,
   user,
   setUser
 
 }

    return (
    <UserContext.Provider value={UserProps}>{children}</UserContext.Provider>
  );



}
 export { UserContextProvider, UserContext };