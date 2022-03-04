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
import { UserContext } from '../UserContext';

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

const RecipeView: React.FC = () => {
  const { user } = useContext(UserContext);

  //Use the useLocation hook to get idMeal passed through the search route.
  const location = useLocation<{ idMeal: string }>();
  const { idMeal } = location.state;
  const [mealRecipe, setMealRecipe] = useState<RecipeProps[]>([]); //recipe
  const [instructions, setInstructions] = useState<string[]>([]);

  //Comments settings
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  const submitComment = () => {
    axios.post('routes/user/profile/comment', { text: comment, userId: user.id, mealId: idMeal})
      .then(() => console.log('Comment Posted, please erase me now: recipeView 52'))
      .catch(err => console.error(err, 'recipeView 53'))
  };

  //Prints the recipe to the screen on page load
  useEffect(() => {
    axios
      .get<RecipeProps[]>(`/routes/search/getRecipe/${idMeal}`)
      .then(({ data }) => {
        console.log(data, 'recipeView 61');
        data && setMealRecipe(data) 
        setInstructions(data[0].strInstructions.split('\r\n'));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //Conditionally renders based on meal data availability
  return !mealRecipe[0] ? null : (
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
            value={comment}
            onChange={handleCommentChange}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={submitComment}
          > 
            Submit 
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeView;
