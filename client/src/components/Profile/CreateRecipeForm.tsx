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
import { Typography } from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen';
// import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import { Link, useLocation } from 'react-router-dom';

interface MyRecipeTypes {
  id?: number;
  userId?: string;
  title?: string;
  ingredients?: string;
  instructions?: string;
  vote_count?: number;
  comment_count?: number;
  createdAt?: string;
}

interface Props {
  recipeList: MyRecipeTypes[];
  setRecipeList: React.Dispatch<React.SetStateAction<MyRecipeTypes[]>>;
}

const CreateRecipeForm: React.FC<Props> = ({ recipeList, setRecipeList }) => {
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
  };

  //on submit should send
  const create = () => {
    setRecipeList(
      recipeList.concat([{ title, ingredients, instructions, userId: user.id }])
    );

    axios
      .post('/routes/user/profile/upload/recipe', {
        title,
        ingredients,
        instructions,
        userId: user.id,
      })
      .then(() => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        // console.log('recipe created 38');
      })
      .catch((err) => console.error(err, 'createRecipe failed 39'));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          height: 750,
          width: 625,
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Add Your Own Recipe</h2>
        <CardActionArea
          style={{
            height: 600,
          }}
        >
          <CardContent>
            <Box
              component='form'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                id='standard-basic'
                label='Recipe Name'
                variant='standard'
                onChange={handleTitleChange}
                style={{
                  width: 300,
                  height: '12vh',
                  // margin: '30px'
                }}
              />
              <TextField
                id='outlined-multiline-static'
                label='Ingredients'
                multiline
                rows={4}
                defaultValue=''
                onChange={handleIngredientChange}
                style={{
                  width: 300,
                  height: '20vh',
                  // margin: '30px'
                }}
              />
              <TextField
                id='outlined-multiline-static'
                label='Directions'
                multiline
                rows={4}
                defaultValue=''
                onChange={handleInstructionChange}
                style={{
                  width: 300,
                  height: '20vh',
                  // margin: '30px'
                }}
              />
              {/* <WidgetLoader />
          <Widget 
            cloudname={process.env.CLOUDINARY_NAME}
            uploadPreset={'sPantry'}
            resourceType={'image'}
            buttonText={'Open'}
            style={{
              color: 'white',
              border: 'none',
              width: '120px',
              backgroundColor: 'green',
              borderRadius: '4px',
              height: '25px'
            }}
            folder={'sPantry'}
          /> */}
              <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={create}
                  size='small'
                  color='primary'
                  sx={{
                    paddingBottom: '10px',
                  }}
                >
                  CREATE
                </Button>
              </Link>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default CreateRecipeForm;
