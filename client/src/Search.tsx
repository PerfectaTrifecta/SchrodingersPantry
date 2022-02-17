import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// import e from 'express';
const Search = () => {
  const [ingredients, setIngredients] = useState([]);

  const handleInput = (e: any) => {
    e.preventDefault();
    setIngredients(e.target.value);
  };

  const searchRecipes = () => {
    axios
      .get(`/routes/search/${ingredients}`)
      .then((data) => {
        console.log(data, 19);
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
    </div>
  );
};

export default Search;
