import React from 'react';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';

interface CardProps {
  recipe: { strMeal: string; idMeal: string; strMealThumb: string };
}

const MealCard = ({ recipe }: CardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        alignContent: 'space around',
        justifyContent: 'space-evenly',
        margin: '16px',
        maxWidth: '600px',
        width: '90%',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='250'
          image={recipe ? `${recipe.strMealThumb}` : ''}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {recipe.strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={{ pathname: '/recipe_view', state: { idMeal: recipe.idMeal } }}
          style={{ textDecoration: 'none' }}
        >
          <Button
            size='small'
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Go To Recipe
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MealCard;
