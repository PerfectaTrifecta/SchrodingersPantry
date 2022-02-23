const axios = require('axios').default;
const { Router } = require('express');
const { User } = require('../db');



const UserRouter = Router();
//require User Model, sequelize

//on User post of image

const handleUpload = async ({ formData }) => {
  await axios.post('https://api.cloudinary.com/v1_1/schrodinger-s-pantry/image/upload', formData)
        .then((response) => {
          setShownImage(response.data.url);
        });
};






//const CLOUDINARY_API_KEY = process.env;
UserRouter.patch('/image/upload', (req, res) => {
  //take userID from req.params and file from req.body
  const { userId } = req.params, formData = req.body;
  //make axios post request with file, get back secret to store in database
  handleUpload()
    .then((data) => {
      //save cloudinary url to user in database
      //send back file and 201 
      res.status = 201;
      res.send(formData)
    })
    .catch((err) => {
      console.err(`could not upload: ${err}`);
      res.sendStatus(500);
    })
})

//on User's return to profile page

UserRouter.get('/', (req, res) => {
  const { googleId } = req.params;
  //search database for user with that id (SEQUELIZE POSTGRES syntax)
  //get the cloudinary secret ID for their image

  //access that User's profile image url, if they dont have one return 404
  User.findOne({where : {
    googleId : googleId
  }})
    .then((user) => {
      //send the whole user back to front end for context
      //take the file from data
      //send the file with a 200 status
      res.status = 200;
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status = 404;
      res.send('No images for ths user');
    })

})

module.exports = { UserRouter };