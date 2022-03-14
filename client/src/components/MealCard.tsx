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
        maxWidth: '600px',
        width: '90%',
        padding: '1rem',
        margin: '1rem 0',
        boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.secondary.main}`,

        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        borderRadius: '0.25rem',
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
          to={{
            pathname: `/recipe_view/${recipe.idMeal}`,
            state: { idMeal: recipe.idMeal },
          }}
        >
          <Button size='small' color='primary'>
            Go To Recipe
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MealCard;
