const { Router } = require('express');
const UserRouter = Router();
const { Recipe, Favorite, User_Bookmark, Bookmark } = require('../db/index');
// const cloudinary = require('cloudinary').v2;
// //require User Model, sequelize

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

//on User post of image
UserRouter.post('/upload/pic', async (req, res) => {
  // console.log(req.body, 'userRoute 10');
  try {
    const pic = req.body;
    console.log(pic, 'user 18');
    // const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'sPantry'})

    // console.log(public.id, 'user 14');
    // res.status(201).send(uploadedRes.public_id);
  } catch (error) {
    console.error(error, 'user route 13');
  }

});

//on User submission of recipe
UserRouter.post('/upload/recipe', (req, res) => {
  console.log(req.body, 'userRoute 23')
  const { title, ingredients, instructions, userId} = req.body;

  Recipe.create({ user_id: userId, title, ingredients, instructions})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error(err, 'userRoute 38'))

});

UserRouter.get('/recipes', (req, res) => {
  Recipe.findAll({
    where: {
      user_id: req.cookies.googleId
    }
  })
  .then(recipes => {
      // console.log(recipes, 43);
      res.status(200).send(recipes)
    })
    .catch(err => console.error(err, 'userRoute 52'));
});

UserRouter.get('/favorites', (req, res) => {
  Favorite.findAll({
    where: {
      user_id: req.cookies.googleId
    }
  })
  .then(faves => {
    // console.log(faves, 'userRoute 62');
    //for each of the favorites, find all recipes where the id matches recipe_id
    //send an array of recipe objects to the front
    res.send(200);
  })
  .catch(err => console.error(err, 'userRoute 67'));
});

UserRouter.get('/bookmarks', (req, res) => {
  User_Bookmark.findAll({
    where: {
      user_id: req.cookies.googleId
    }
  })
  .then(userMarks => {
    //console.log(userMarks, 'userRoute 77');
    //for each userMark, find all bookmarks where the id matches bookmark_id
    //send an array of urls to the front
    res.send(200);
  })
  .catch(err => console.error(err, 'userRoute 82'))
})

module.exports = { UserRouter };