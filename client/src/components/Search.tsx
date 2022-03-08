import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, Stack, TextField } from '@mui/material';
import NewCard from './MealCard';

interface SearchProps {
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
}
const Search: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [meals, setMeals] = useState<SearchProps[]>([]);

  //get a mealcard rendered depending on the time of day on page load.
  useEffect(() => {
    axios
      .get<SearchProps[]>('/routes/search/tod')
      .then(({ data }) => {
        data && setMeals(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInput = (e: any) => {
    e.preventDefault();
    setIngredients(e.target.value);
    e.target.reset;
  };

  const searchRecipes = () => {
    axios
      .get<SearchProps[]>(`/routes/search/ingredients/${ingredients}`)
      .then(({ data }) => {
        setMeals(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSearch = (e: any) => {
    searchRecipes();
    setIngredients('');
  };

  return (
    <div>
      <h1>Search For A Recipe!</h1>
      <Stack spacing={2} direction='row' padding={2}>
        <Button variant='outlined' onClick={onSearch}>
          Search
        </Button>
        <TextField
          type='text'
          required
          fullWidth
          label='ingredients'
          value={ingredients}
          id='fullWidth'
          onChange={handleInput}
        />
      </Stack>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {meals.map((meal, i) => (
          <NewCard recipe={meal} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
