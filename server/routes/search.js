const axios = require('axios').default;
const { Router } = require('express');

const searchRouter = Router();
//This returns a list of meals by ingredients
searchRouter.get('/:ingredients', (req, res) => {
  let { ingredients } = req.params;
  //This is where we need to shape the input data to fit what the api expects, just in case the user puts in dumb stuff.
  ingredients = ingredients.replace(/[\s.;?%0-9]/g, '');
  const options = {
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { i: ingredients },
    headers: {
      'x-rapidapi-host': 'themealdb.p.rapidapi.com',
      'x-rapidapi-key': '95d3a2e670msh83b8d187118d736p19835bjsn1790a24f2333',
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.status = 200;
      res.send(response.data.meals);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

//This function returns the actual recipe for a mealcard that a user clicks
searchRouter.get('/getRecipe/:idMeal', (req, res) => {
  let { idMeal } = req.params;
  const options = {
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/lookup.php',
    params: { i: idMeal },
    headers: {
      'x-rapidapi-host': 'themealdb.p.rapidapi.com',
      'x-rapidapi-key': '95d3a2e670msh83b8d187118d736p19835bjsn1790a24f2333',
    },
  };
  axios
    .request(options)
    .then((response) => {
      const { meals } = response.data;
      /*Need to send what the front end expects, so we pull out the properties
      from the response that we need here and send it on it's merry way */
      const interfacedData = [
        {
          strInstructions: meals[0].strInstructions,
          id: meals[0].idMeal,
          strYoutube: meals[0].strYoutube,
        },
      ];
      res.status = 200;
      res.send(interfacedData);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

//This returns a list of meals depending on the time of day.
const lunchCategories = ['chicken', 'pork', 'vegetarian', 'miscellaneous'];
const dinnerCategories = ['beef', 'seafood', 'lamb', 'pasta'];
let category;
let currentTime = new Date();
let hour = currentTime.getHours();
if (hour > 5 && hour < 11) {
  category = 'breakfast';
} else if (hour > 11 && hour < 17) {
  category =
    lunchCategories[Math.floor(Math.random() * lunchCategories.length)];
} else {
  category =
    dinnerCategories[Math.floor(Math.random() * dinnerCategories.length)];
}

searchRouter.get('/tod', (req, res) => {
  console.log('its working', 82);

  const options = {
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { c: category },
    headers: {
      'x-rapidapi-host': 'themealdb.p.rapidapi.com',
      'x-rapidapi-key': '95d3a2e670msh83b8d187118d736p19835bjsn1790a24f2333',
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data.meals, 82);
      res.status = 200;
      res.send(response.data.meals);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = { searchRouter };
