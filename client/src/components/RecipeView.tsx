import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

//From MUI components
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  //Use the useLocation hook to get idMeal passed through the search route.
  const location = useLocation();
  const { idMeal } = location.state;
  const [mealRecipe, setMealRecipe] = useState<RecipeProps[]>([]); //recipe

  //Prints the recipe to the screen on page load
  useEffect(() => {
    axios
      .get<RecipeProps[]>(`/routes/search/getRecipe/${idMeal}`)
      .then(({ data }) => {
        data && setMealRecipe(data);
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
        alignContent: 'center',
        justifyContent: 'space-evenly',
        margin: '16px',
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
        <Typography paragraph>
          {mealRecipe[0].strInstructions.split('\n').map((p, i) => (
            <p key={p + i}>{p}</p>
          ))}
        </Typography>
        <VideoModal mealName={mealRecipe[0].strMeal} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <ShoppingBagIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          See Reviews!
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <h2>Reviews Go Here</h2>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeView;
