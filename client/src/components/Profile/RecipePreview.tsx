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

interface PreviewProps {
  id: number;
  title: string;
}

const RecipePreview: React.FC<PreviewProps> = ({ id, title }) => {
  const theme = useTheme();

  return (
    <Card
      // sx={{ maxWidth: 345 }}
      style={{
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        margin: '16px',
        maxWidth: '600px',
        width: '90%',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.primary.dark}`,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.primary.dark,
      }}
    >
      <CardActionArea>
        {/* <CardMedia
                    component='img'
                    height='250'
                    // image={/add images to recipe creation, render recipe thumbnails here}
                    alt='green iguana'
                />  */}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={{
            pathname: `/recipe_view/${id.toString()}`,
            state: { idUserMeal: id },
          }}
          style={{ textDecoration: 'none' }}
        >
          <Button size='small' color='primary'>
            Go To Recipe
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default RecipePreview;
