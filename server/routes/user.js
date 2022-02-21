const { Router } = require('express');
const UserRouter = Router();
const cloudinary = require('../index')
const { Recipe } = require('../db/index')
//require User Model, sequelize

//on User post of image
UserRouter.post('/upload/pic', async (req, res) => {
  console.log(req.body, 'userRoute 10');
  try {
    // const pic = req.body.selectedImg;
    // const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'Schrodinger\'s Pantry'})

    // res.status(201).send(uploadedRes.public_id);
  } catch (error) {
    console.error(error, 'user route 13');
  }

})

//on User submission of recipe
UserRouter.post('/upload/recipe', (req, res) => {
  console.log(req.body, 'userRoute 23')
  const { title, ingredients, instructions, userId} = req.body;

  Recipe.create({ user_id: userId, title, ingredients, instructions})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error('problem uploading recipe', err))

})

module.exports = { UserRouter };