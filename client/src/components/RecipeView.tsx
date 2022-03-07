import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TextToSpeech from '../components/TextToSpeech';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { UserContext } from '../UserContext';
import Favorite from './Favorite';

/*Recipe View is where the user can see details about a recipe that they
either created or searched for.*/
interface RecipeProps {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  id: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  ingredients: Array<[string, string]>;
}

interface UserRecipeProps {
  id: number;
  userId: string;
  title: string;
  ingredients: string;
  instructions: string;
  vote_count: number;
  comment_count: number;
  createdAt: string;
}

interface CommentDisplay {
  name: string;
  text: string;
  postedAt: string;
}

const RecipeView: React.FC = () => {
  const { user } = useContext(UserContext);

  //Use the useLocation hook to get idMeal passed through the search route.
  const location = useLocation<{ idMeal: string | null, idUserMeal: number | null }>();
  const { idMeal, idUserMeal } = location.state;
  const [mealRecipe, setMealRecipe] = useState<RecipeProps[]>([]); //recipe
  const [mealUserRecipe, setMealUserRecipe] = useState<UserRecipeProps | null>(null); //user-created recipe
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  //Comments settings
  const [rawComment, setRawComment] = useState('');
  const [featComments, setFeatComments] = useState<CommentDisplay[]>([]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawComment(e.target.value);
  };

  const submitComment = () => {
    axios
      .post('routes/user/profile/comment', {
        text: rawComment,
        userId: user.id,
        userName: user.userName,
        mealId: idMeal,
      })
      .then(() => {
        setRawComment('');
      })
      .catch((err) => console.error(err, 'recipeView 53'));
  };

  //Prints the recipe to the screen on page load
  if (idMeal) {
    useEffect(() => {
      axios
        .get<RecipeProps[]>(`/routes/search/getRecipe/${idMeal}`)
        .then(({ data }) => {
          // console.log(data, 'recipeView 61');
          data && setMealRecipe(data) 
          setInstructions(data[0].strInstructions.split('\r\n'));
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  } else if (idUserMeal) {
    useEffect(() => {
      axios.get('/routes/search/getUserRecipe', { params: { id: idUserMeal } })
        .then(({data}) => {
          // console.log(data, 'recipeView 96');
          setMealUserRecipe(data);
        })
        .then(() => {
          console.log(mealUserRecipe, 'recipeView 101');
          // setUserIngredients(mealUserRecipe.ingredients.split(' '));
        })
        .catch(err => console.error(err, 'recipeView 98'))
    })
  }


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);

    axios
      .get('routes/user/profile/comment', { params: { mealId: idMeal } })
      .then(({ data }) => {
        // console.log(data, 'recipeView 96')
        setFeatComments(data);
      })
      .catch((err) => console.error(err, 'recipeView 77'));
  };


  //Conditionally renders based on meal data availability
  return (
    mealRecipe[0] ? (
      <Card
      sx={{ maxWidth: 345 }}
      style={{
        margin: '16px auto',
        maxWidth: '600px',
        width: '90%',
      }}
      >
        <CardHeader
          title={mealRecipe[0].strMeal}
          subheader={`${mealRecipe[0].strArea}  |  ${mealRecipe[0].strCategory}`}
        />
        <CardMedia
          component='img'
          height='380'
          src={`${mealRecipe[0].strMealThumb}`}
          alt=''
        />
        <CardContent>
          <Typography paragraph>
            <strong>Ingredients:</strong>
          </Typography>
          <ul>
            {mealRecipe[0].ingredients.map((tuple, i) => (
              <li key={i}>{`${tuple[0]}:  ${tuple[1]}`}</li>
              ))}
          </ul>
          <Typography paragraph>
            <strong>Directions:</strong>
          </Typography>
          {mealRecipe[0].strInstructions.split('\n').map((p, i) => (
            <Typography key={p + i}>{p}</Typography>
            ))}
            <TextToSpeech instructions={instructions} />
          <VideoModal mealName={mealRecipe[0].strMeal} />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton 
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <CommentIcon />
          </IconButton>
          <IconButton>
            See Reviews!
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <TextField
              id="outlined-multiline-flexible"
              label='Your Comment'
              placeholder="Tasted this dish before?"
              multiline
              maxRows={4}
              inputProps={{maxLength: 120}}
              value={rawComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={submitComment}
            > 
              Submit 
            </Button>
            {featComments.map(comment => (
              <Box
                sx={{
                  border: '1px solid lightGrey',
                  width: '450px',
                  marginTop: '5px',
                  padding: '5px 5px 10px 5px',
                }}
              >
                <Typography>{comment.name}</Typography>
                <Typography>{comment.text}</Typography>
                <Typography>{comment.postedAt}</Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    ) : mealUserRecipe ? (
      <Card
      sx={{ maxWidth: 345 }}
      style={{
        margin: '16px auto',
        maxWidth: '600px',
        width: '90%',
      }}
      >
        <CardHeader
          title={mealUserRecipe.title}
          // subheader={`${mealRecipe[0].strArea}  |  ${mealRecipe[0].strCategory}`}
        />
        {/* <CardMedia
          component='img'
          height='380'
          src={`${mealRecipe[0].strMealThumb}`}
          alt=''
        /> */}
        <CardContent>
          <Typography paragraph>
            <strong>Ingredients:</strong>
          </Typography>
          <ul>
            {userIngredients.map((tuple, i) => (
              <li key={i}>{tuple}</li>
              ))}
          </ul>
          <Typography paragraph>
            <strong>Directions:</strong>
          </Typography>
          {mealUserRecipe.instructions.split('\n').map((p, i) => (
            <Typography key={p + i}>{p}</Typography>
          ))}
          <TextToSpeech instructions={instructions} />
          <VideoModal mealName={mealUserRecipe.title} />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton 
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <CommentIcon />
          </IconButton>
          <IconButton>
            See Reviews!
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <TextField
              id="outlined-multiline-flexible"
              label='Your Comment'
              placeholder="Tasted this dish before?"
              multiline
              maxRows={4}
              inputProps={{maxLength: 120}}
              value={rawComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={submitComment}
            > 
              Submit 
            </Button>
            {featComments.map(comment => (
              <Box
                sx={{
                  border: '1px solid lightGrey',
                  width: '450px',
                  marginTop: '5px',
                  padding: '5px 5px 10px 5px',
                }}
              >
                <Typography>{comment.name}</Typography>
                <Typography>{comment.text}</Typography>
                <Typography>{comment.postedAt}</Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    ) : null
    
  );

  
};

export default RecipeView;
