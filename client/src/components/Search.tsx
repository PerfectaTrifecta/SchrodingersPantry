import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import NewCard from './MealCard';
import useTheme from '@mui/material/styles/useTheme';

interface SearchProps {
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
}
const Search: React.FC = () => {
  const theme = useTheme();

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
    if (ingredients && ingredients !== '') {
      axios
        .get<SearchProps[]>(`/routes/search/ingredients/${ingredients}`)
        .then(({ data }) => {
          setMeals(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onSearch = (e: any) => {
    searchRecipes();
    setIngredients('');
  };

  return (
    <div>
      <h1
        className='search-title'
        style={{ color: theme.palette.primary.contrastText }}
      >
        Search For A Recipe!
      </h1>
      <Stack spacing={2} direction='row' padding={2}>
        <Button
          variant='outlined'
          onClick={onSearch}
          style={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.dark,
            borderRadius: '5px',
          }}
        >
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
          onKeyPress={(e) => {
            e.key === 'Enter' && onSearch();
          }}
          style={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.dark,
            borderRadius: '5px',
          }}
          sx={{
            '& .MuiOutlinedInput-input': {
              color: theme.palette.primary.contrastText,
            },
          }}
        />
      </Stack>
      {meals.length ? (
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'space-around',
          }}
        >
          {meals.map((meal, i) => (
            <NewCard recipe={meal} key={i} />
          ))}
        </div>
      ) : (
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            color: theme.palette.primary.contrastText,
          }}
        >
          Hmm....there doesn't appear to be any recipes with those
          ingredients...
        </div>
      )}
    </div>
  );
};

export default Search;
