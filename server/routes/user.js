const axios = require('axios').default;
const { Router } = require('express');

const UserRouter = Router();

//on User post of image

//const CLOUDINARY_API_KEY = process.env;
UserRouter.post('/:userId', (req, res) => {
  //take userID from req.params and file from req.body
  const { userId } = req.params, file = req.body;
  //make axios post request with file, get back secret to store in database
  axios.post('cloudinaryAPI')
    .then((data) => {
      //save cloudinary secret to user in database
      //send back file and 201 
      res.status = 201;
      res.send(file)
    })
    .catch((err) => {
      console.err(`could not upload: ${err}`);
      res.sendStatus(500);
    })
})

//on User's return to profile page

UserRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  //search database for user with that id (SEQUELIZE POSTGRES syntax)
  //get the cloudinary secret ID for their image

  axios.get('cloudnaryAPI with image id as param')
    .then((data) => {
      //take the file from data
      //send the file with a 200 status
    })
    .catch((err) => {
      console.error(err);
      res.status = 404;
      res.send('No images for ths user');
    })

})