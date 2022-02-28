import React from 'react';
import axios from 'axios';

const finalURL = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_KEY = 'AIzaSyASkBskNLM6_d51ncg_q5MmkzXfV9XJR3c';

interface SearchProps {
  meal: string;
}

//pass meal string to video modal for axios
interface VideoProps {
  video: {
    meal: string;
  };
}

//take meal from props passed from a clicked recipe
const SearchYoutube = async ({ meal }: SearchProps) => {
  const [video, setVideo] = React.useState<VideoProps>();

  // search youtube api for that meal, displaying top result
  await (() => {
    axios
      .get(
        `${finalURL}search?part=snippet&q=best way to cook ${meal}&key=${YOUTUBE_KEY}&maxResults=1`
      )
      .then((data: any): any => {
        setVideo(data);
      })
      .catch((err) => {
        console.error(`could not fetch video because: ${err}`);
      });
  });
  //const { video: { videoId } } = video;
  return (
    <div>
      {/* USE VIDEO THAT WAS ASSIGNED IN STATE*/}
      <iframe
        width='345'
        height='300'
        src='https://www.youtube.com/embed/VgaRwWS3o'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default SearchYoutube;
