import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface VideoContextType {
  recipeName: string;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  videoId: string;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  searchClick: () => void;
}
interface Props {
  children: React.ReactNode;
}

const VideoContext = createContext({} as VideoContextType);

function VideoContextProvider({ children }: Props) {
  const [videoId, setVideoId] = useState<string>('');
  const [recipeName, setRecipeName] = React.useState<string>('');

  //data.items[0].id.videoId

  const searchClick = () => {
    // search youtube api for that meal, displaying top result
    return axios
      .post('routes/videos/youtube', {
        mealName: recipeName,
      })
      .then(({ data }: any): any => {
        setVideoId(data);
      })
      .catch((err) => {
        console.error(`could not fetch video because: ${err}`);
      });
  };
  const VideoProps: VideoContextType = {
    recipeName,
    setRecipeName,
    videoId,
    setVideoId,
    searchClick,
  };

  return (
    <VideoContext.Provider value={VideoProps}>{children}</VideoContext.Provider>
  );
}
export { VideoContextProvider, VideoContext };
