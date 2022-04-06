const axios = require('axios').default;
const { Router, response } = require('express');
require('dotenv').config();

//options from rapid api example
const finalURL = 'https://www.googleapis.com/youtube/v3/';
const { YOUTUBE_KEY } = process.env;


const videoRouter = Router();



//sending meal name from front
videoRouter.post('/youtube', (req, res) => {
  const { mealName } = req.body;

   return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how to cook${mealName}&key=${YOUTUBE_KEY}`) 
      .then(( { data } ) => {
       
        
        
        //returns an object with an array of 1 video
        //only need to send back the videoID
        const videoId = data.items[0].id.videoId;
      
        res.status(201).send(videoId);
      })
      .catch((err) => {
     
        console.error(err);
        res.sendStatus(500);
      })
})


module.exports = { videoRouter };
