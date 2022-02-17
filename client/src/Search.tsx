import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MealCard from './MealCard';

interface SearchProps {
 meal: {
  strMeal: String;
  idMeal: String;
  strMealThumb: String;
  }

}
// import e from 'express';
const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState<
    Array<SearchProps>
  >([]);

  const handleInput = (e: any) => {
    e.preventDefault();
    setIngredients(e.target.value);
  };

  const searchRecipes = () => {
    axios
      .get<AxiosResponse>(`/routes/search/${ingredients}`)
      .then(({data}: AxiosResponse) => {
        console.log(data, 32);
        setMeals(data: Array<SearchProps>);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSearch = (e: any) => {
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
          <MealCard recipe={meal}/>
          //<div key={i}>{meal.strMeal} </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
