import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface VideoContextType {
  recipeName: string,
  setRecipeName: React.Dispatch<React.SetStateAction<string>>
  videoId: string,
  setVideoId: React.Dispatch<React.SetStateAction<string>>,
  searchClick: () => void
}
interface Props {
  children: React.ReactNode,
}

const VideoContext = createContext({} as VideoContextType);

function VideoContextProvider({ children } : Props) {

  const [videoId, setVideoId] = useState<string>('');
  const [recipeName, setRecipeName] = React.useState<string>('');


//data.items[0].id.videoId


const searchClick = (  ) => {

  console.log(recipeName)
  // search youtube api for that meal, displaying top result
console.log('string');
  return axios.post('routes/videos/youtube', {
    mealName: recipeName
  })
    .then(({ data } : any): any => {
      console.log(data);
      setVideoId(data);
      
    })
    .catch((err) => {
    console.error(`could not fetch video because: ${err}`);
    });
   
}
 const VideoProps: VideoContextType = {
   recipeName,
   setRecipeName,
   videoId,
   setVideoId,
   searchClick
 }

    return (
    <VideoContext.Provider value={VideoProps}>{children}</VideoContext.Provider>
  );



}
 export { VideoContextProvider, VideoContext };