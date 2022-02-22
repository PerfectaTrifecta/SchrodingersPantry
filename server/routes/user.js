const { Router } = require('express');
const UserRouter = Router();
const { Recipe } = require('../db/index');
const cloudinary = require('cloudinary').v2;
//require User Model, sequelize

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//on User post of image
UserRouter.post('/pic', async (req, res) => {
  // console.log(req.body, 'userRoute 10');
  try {
    const pic = req.body;
    console.log(pic, 'user 18');
    const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'sPantry'})

    console.log(public.id, 'user 14');
    res.status(201).send(uploadedRes.public_id);
  } catch (error) {
    console.error(error, 'user route 13');
  }

})

//on User submission of recipe
UserRouter.post('/recipes', (req, res) => {
  console.log(req.body, 'userRoute 23')
  const { title, ingredients, instructions, userId} = req.body;

  Recipe.create({ user_id: userId, title, ingredients, instructions})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error('problem uploading recipe', err))

})

module.exports = { UserRouter };