import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// import e from 'express';
const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState<
    Array<{ name: String; id: String; imgUrl: String }>
  >([]);

  const handleInput = (e) => {
    e.preventDefault();
    setIngredients(e.target.value);
  };

  const searchRecipes = () => {
    axios
      .get(`/routes/search/${ingredients}`)
      .then((data<Array<{ name: String; id: String; imgUrl: String }>
        >) => {
        console.log(data, 19);
        setMeals(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSearch = (e) => {
    searchRecipes();
    e.target.reset;
  };

  return (
    <div>
      <h1>Search For A Recipe!</h1>
      <Stack spacing={2} direction='row'>
        <Button variant='outlined' onClick={onSearch}>
          Search
        </Button>
        <TextField
          fullWidth
          label='ingredients'
          id='fullWidth'
          onChange={handleInput}
        />
      </Stack>
      <div>
        {meals.map((meal, i) => (
          <div key={i}>{meal.strMeal} </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
