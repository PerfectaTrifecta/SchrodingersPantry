const axios = require('axios').default;
const { Router } = require('express');

//options from rapid api example

const searchRouter = Router();

searchRouter.get('/:ingredients', (req, res) => {
  let { ingredients } = req.params;
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

module.exports = { searchRouter };
