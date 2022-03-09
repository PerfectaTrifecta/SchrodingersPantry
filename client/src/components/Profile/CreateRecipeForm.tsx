import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

interface Props {
  handleForm: () => void;
}

const CreateRecipeForm = ({ handleForm }: Props) => {

  const [title, setTitle] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const { user } = useContext(UserContext);

  //on change should update state for given field
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredients(e.target.value);
  };

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructions(e.target.value);
  }

  //on submit should send
  const create = () => {
    console.log('listening? 41');
    axios.post('/routes/user/profile/upload/recipe', { title, ingredients, instructions, userId: user.id})
      .then(() => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        handleForm();
        console.log('recipe created 38');
      })
      .catch(err => console.error(err, 'createRecipe failed 39'));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
    
      <CardContent>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField 
        id="standard-basic" 
        label="Recipe Name" 
        variant="standard" 
        onChange={handleTitleChange}
      />
      <TextField
        id="outlined-multiline-static"
        label="Ingredients"
        multiline
        rows={4}
        defaultValue=""
        onChange={handleIngredientChange}
      />
      <TextField
        id="outlined-multiline-static"
        label="Directions"
        multiline
        rows={4}
        defaultValue=""
        onChange={handleInstructionChange}
      />
    </Box>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button onClick={create} size="small" color="primary">
        CREATE
      </Button>
    </CardActions>
  </Card>
    
  );
}
export default CreateRecipeForm;