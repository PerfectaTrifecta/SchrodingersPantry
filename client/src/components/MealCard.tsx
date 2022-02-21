///------------MATERIAL UI IMPLEMENTATION--------------//
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VideoModal from './VideoModal';
//import SearchYoutube from './SearchYoutube';

//-----for card chevron expansion functionality-----/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//-----------------------------------------------------//

interface CardProps {
  recipe: { strMeal: string, idMeal: String, strMealThumb: String}
  //recipe: { strMeal: string; idMeal: string; strMealThumb: string };
}

//interface for returned recipe
interface RecipeProps {
  strInstructions: string;
  id: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  ingredients: Array<[string, string]>;
}

//the search component should map over the results, creating a meal card for each recipe,
const MealCard = ({ recipe }: CardProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  //you only want to make an axios request for the meal that is selected, not for each meal card on the screen, wait until user clicks to assign, and use that recipes name to make the request by passing down the meal prop from state to the Search Youtube component
  const [meal, setMeal] = React.useState<string>(``);//recipe.name
  /* you only want to make an axios request for the meal that is selected, not for each 
  meal card on the screen, wait until user clicks to assign, and use that recipes name to
   make the request by passing down the meal prop from state to the Search Youtube component*/

  const [mealRecipe, setMealRecipe] = useState<RecipeProps[]>([]); //recipe

  const getRecipeById = () => {
//     console.log('expanded');
    const { idMeal } = recipe;
    axios
      .get<RecipeProps[]>(`/routes/search/getRecipe/${idMeal}`)
      .then(({ data }) => {
        setMealRecipe(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      getRecipeById();
    }
  };

  useEffect(() => {
    getRecipeById();
  }, []);
  // console.log(mealRecipe[0], 86);
  // const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
  // // set state of meal to the clicked cards title
  //   setMeal(event.target.value);
  // }

  return !mealRecipe[0] ? null : (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        alignContent: 'space around',
        justifyContent: 'space-evenly',
        margin: '16px',
        maxWidth: '600px',
        width: '90%',
      }} //{onClick={handleCardClick}}
    >
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //     {/* this should be user profile's first letter */}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe ? `${recipe.strMeal}` : ''} //recipe.name
      />
      <CardMedia
        component='img'
        height='194'
        image={recipe ? `${recipe.strMealThumb}` : ''}
        alt={recipe ? `${recipe.strMeal}` : ''}
        // image for dish from api
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {mealRecipe[0].strArea} • {mealRecipe[0].strCategory}
          {/* recipe.description*/}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          {/* send post request to that user's favorites on click */}
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          {/* allow users to send to friends */}
          <ShareIcon />
        </IconButton>
        <VideoModal mealName={recipe.strMeal} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients: </Typography>
          <ul>
            {mealRecipe[0].ingredients.map((tuple, i) => (
              <li key={i}>{`${tuple[0]}:  ${tuple[1]}`}</li>
            ))}
          </ul>
          <Typography paragraph>Instructions: </Typography>
          {mealRecipe[0].strInstructions.split('\n').map((p, i) => (
            <Typography paragraph key={p + i}>
              {p}
            </Typography>
          ))}

          {/* <SearchYoutube meal={meal}/> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MealCard;
