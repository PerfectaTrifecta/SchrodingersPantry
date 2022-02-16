import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

//interface to handle the expected shape of data being returned from api.
interface SearchProps {
  name: String; id: String; imgUrl: String
}
// import e from 'express';
const Search = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [meals, setMeals] = useState<
    Array<SearchProps>
  >([]);

  const handleInput = (e) => {
    e.preventDefault();
    setIngredients(e.target.value);
  };

  const searchRecipes = () => {
    axios
      .get<AxiosResponse>(`/routes/search/${ingredients}`)
      .then(({data}: AxiosResponse) => {
        console.log(data, 19);
        setMeals(data: Array<SearchProps>);
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
