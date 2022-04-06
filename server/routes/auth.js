const { Router } = require('express');
const passport = require('passport');
const {
  User,
  Favorite,
  User_Image,
  Recipe,
  Bookmark,
  User_Bookmark,
} = require('../db/index');

const authRouter = Router();
let accessToken;

authRouter.get(
  '/spotify/login',
  passport.authenticate('spotify', {
    scope: ['streaming', 'user-read-email', 'user-read-private'],
  })
);

authRouter.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    accessToken = req.user;
    // res.cookie('spotify', accessToken);
    res.redirect('/');
  }
);

authRouter.get('/token', (req, res) => {
  res.json({
    accessToken: accessToken,
  });
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  () => {
    console.log('/google successful');
  }
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/logout',
  }),
  (req, res) => {
 
    res.cookie('googleId', req.session.passport.user.id);
    res.redirect('/');
  }
);

authRouter.get('/user', (req, res) => {
  // console.log(req, 'auth 60')
  //should search all models and send back a user object

  if (req.cookies.googleId) {
    // console.log('cookie found')
    User.findAll({
      where: {
        id: req.cookies.googleId,
      },
    })
      .then((user) => {
        // console.log('auth 71', user)
        res.status(200);
        res.send(user);
      })

      .catch((err) => console.error('auth 67', err));
  } else {
    res.sendStatus(404);
  }
});

authRouter.post('/account', (req, res) => {
  //const { id } = req.params;
  const user = req.body;
  // console.log(user, 'auth 85');
 
  let userDetails = user;


  User.findOrCreate({
    where: {
      id: user.id,
    },
  })
    .then((data) => {
      
    
      const { diet, allergies, bio, theme, image } = data[0].dataValues;

      userDetails.diet = diet;
      userDetails.allergies = allergies;
      userDetails.bio = bio;
      userDetails.image = image;
      userDetails.theme = theme;

      //FAVORITES
      User.findAll({
        include: {
          model: Recipe,
          through: Favorite,
          where: {
            userId: user.id,
          },
        },
      })
        .then((favs) => {
          if (favs) {
            userDetails.favorites = favs;
           
          } else {
            userDetails.favorites = [];
          }
          //IMAGES
          User_Image.findAll({
            where: {
              userId: user.id,
            },
          })
            .then((images) => {
              if (images) {
                userDetails.pics = images;
              } else {
                userDetails.pics = [];
              }
             

              //RECIPES
              Recipe.findAll({
                where: {
                  userId: user.id,
                },
              })
                .then((recipes) => {
                  if (recipes) {
                    userDetails.recipes = recipes;
                  } else {
                    userDetails.recipes = [];
                  }

                  //BOOKMARKS
                  Bookmark.findAll({
                    include: [{
                      model: User,
                      required: true,
                      through: {
                        where: {
                          userId: user.id,
                        },
                      }
                    }],
                  })
                    .then((bookmarks) => {
                      if (bookmarks) {
                        userDetails.bookmarks = bookmarks;
                      } else {
                        userDetails.bookmarks = [];
                      }

                      // console.log(userDetails, 'auth 162')
                      res.status(200).send(userDetails);
                    })
                    .catch((err) => {
                      console.error(err);
                      res.sendStatus(404);
                    });
                })
                .catch((err) => {
                  console.error(err);
                  res.sendStatus(404);
                });
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(404);
            });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
    })
    .catch((err) => {
      console.error('auth user lookup error:', err);
      res.sendStatus(500);
    });
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('googleId');
  res.clearCookie('connect.sid');
  res.status(200);


  res.redirect('/');
});

module.exports = { authRouter, accessToken };
