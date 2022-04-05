const { default: axios } = require('axios');
const { Router } = require('express');
const UserRouter = Router();
const { Recipe, Favorite, User_Bookmark, Bookmark, Comment, User } = require('../db/index');
const cloudinary = require('cloudinary').v2;
//require User Model, sequelize

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//on User post of image
UserRouter.post('/upload/pic', async (req, res) => {
  
  try {
    const pic = Object.keys(req.body)[0];
    
    const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'sPantry'})

   
    res.sendStatus(201);
    // .send(uploadedRes.public_id)
  } catch (error) {
    console.error(error, 'user route 25');
  }

});

//on User submission of recipe
UserRouter.post('/upload/recipe', (req, res) => {
  
  const { title, ingredients, instructions, userId} = req.body;

  Recipe.create({ userId, title, ingredients, instructions})
    .then(() => {
      res.sendStatus(201);
      
    })
    .catch(err => console.error(err, 'userRoute 38'))

});

//Profile Info Updates//
UserRouter.post('/update/bio', (req, res) => {
  
  const { bio } = req.body;

  User.update({ bio }, {
    where: {
      id: req.cookies.googleId
    }
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => console.error(err, 'userRoute 56'));
});

UserRouter.post('/update/diet', (req, res) => {
  const { diet } = req.body;

  User.update({ diet }, {
    where: {
      id: req.cookies.googleId
    }
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => console.error(err, 'userRoute 70'));
});

UserRouter.post('/update/allergies', (req, res) => {
  const { allergies } = req.body;

  User.update({ allergies }, {
    where: {
      id: req.cookies.googleId
    }
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => console.error(err, 'userRoute 84'));
});

//On user post of comment
UserRouter.post('/comment', (req, res) => {
  const { mealId, userId, text, userName } = req.body; 
  //create a row in the Comment table
  //where text comes from req.body, userId, & recipeId
  Comment.create({mealId, userId, userName, text})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error(err, 'userRoute 68'));
});

UserRouter.post('/userComment', (req, res) => {
  const { recipeId, userId, text, userName } = req.body;

  Comment.create({ recipeId, userId, text, userName })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error(err, 'userRouter 62'));
})

UserRouter.get('/comment', (req, res) => {
  
  const { mealId } = req.query;
  //find all comments where the mealId matches the mealId in req.params
  Comment.findAll({
    where: {
      mealId
    }
  })
  .then(comments => {
  

    const polishedComments = comments.map(comment => {
    
      const { userName, text, createdAt } = comment;

     return ({
        name: userName,
        text,
        postedAt: createdAt
      })

    });

    
    res.status(200).send(polishedComments);
  })
  .catch(err => console.error(err, 'userRoute 93'))
})

UserRouter.get('/userComment', (req, res) => {
 
  const { recipeId } = req.query;
  //find all comments where the mealId matches the mealId in req.params
  Comment.findAll({
    where: {
      recipeId
    }
  })
  .then(comments => {
   

    const polishedComments = comments.map(comment => {
     
      const { userName, text, createdAt } = comment;

     return ({
        name: userName,
        text,
        postedAt: createdAt
      })

    });


    res.status(200).send(polishedComments);
  })
  .catch(err => console.error(err, 'userRoute 124'))
})

UserRouter.get('/recipes', (req, res) => {
  Recipe.findAll({
    where: {
      userId: req.cookies.googleId
    }
  })
  .then(recipes => {
   
      res.status(200).send(recipes)
    })
    .catch(err => console.error(err, 'userRoute 52'));
});

UserRouter.get('/favorites', (req, res) => {
  // find all recipes included in the favorites table where the user id is our signed in user
  Recipe.findAll({
   include: {
     model: Favorite,
     where: {
       userId: req.cookies.googleId
     }
   }
  })
  .then(faves => {
 
    res.status(200). send(faves);
  })
  .catch(err => console.error(err, 'userRoute 67'));
});

UserRouter.get('/bookmarks', (req, res) => {
  //find all bookmarks included in user_bookmarks where the userId in out signed in user
  Bookmark.findAll({
   include: {
     model: User_Bookmark,
     where: {
       userId: req.cookies.googleId
     }
   }
  })
  .then(urls => {
    
    res.status(200).send(urls);
  })
  .catch(err => console.error(err, 'userRoute 82'))
})

//updating favorites



UserRouter.post('/favorites', (req, res) => {
  const { recipeId, userId } = req.body;


  Favorite.create({ 
    recipeId, userId }
    )
    .then(() => {
      Favorite.findAll({
        where: {
          userId
        }
     })
    })
   .then(() => {
      
      res.status(201).send(favs);
    })
    .catch((err) => {
      console.error('error with post request to favorites', err);
      res.sendStatus(500);
    });
});

UserRouter.patch('/favorites/delete/:favId', (req, res) => {
  const { googleId, favId } = req.body;

  findAndDeleteFavorites(googleId, favId)
    .then((user) => {
     
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


UserRouter.post('/upload/recipe-image/:recipeId', (req, res) => {
  //upload to cloudinary, save response url string,
  const image = req.body;
  axios.post('cloudinaryApi', image)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      console.error(err);
    })
});

UserRouter.delete('/delete/recipe/:id', (req, res) => {
 
  const { id } = req.params;

  Recipe.destroy({
    where: {
      id
    }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => console.error(err, 'userRoute 295'));
  
});

UserRouter.delete('/delete/bookmark/:id', (req, res) => {
 
  const { id } = req.params;

  User_Bookmark.destroy({
    where: {
      bookmarkId: id,
      userId: req.cookies.googleId
    }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => console.error(err, 'userRoute 311'));

})

module.exports = { UserRouter };