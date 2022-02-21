const { Router } = require('express');
const UserRouter = Router();
const cloudinary = require('../index')
//require User Model, sequelize

//on User post of image

//const CLOUDINARY_API_KEY = process.env;
UserRouter.post('/upload', async (req, res) => {
  console.log(req.body, 'userRoute 10');
  try {
    // const pic = req.body.selectedImg;
    // const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'Schrodinger\'s Pantry'})

    // res.sendStatus(201).send(uploadedRes.public_id);
  } catch (error) {
    console.error(error, 'user route 13');
  }

})

//on User's return to profile page

UserRouter.get('/profile', (req, res) => {
  const { userId } = req.params;
  //search database for user with that id (SEQUELIZE POSTGRES syntax)
  //get the cloudinary secret ID for their image

  axios.get('cloudnaryAPI with image id as param')
    .then((data) => {
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