import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
//data.items[0].id.videoId
const finalURL = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_KEY = 'AIzaSyASkBskNLM6_d51ncg_q5MmkzXfV9XJR3c';

// const VideoContext = createContext();

// function VideoContextProvider({ children }) {

//   //   return (
//   //   <VideoContext.Provider value={VideoProps}>{children}</VideoContext.Provider>
//   // );



// }
//  export { VideoContextProvider, VideoContext };