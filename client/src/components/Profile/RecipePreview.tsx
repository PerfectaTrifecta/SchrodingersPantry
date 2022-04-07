import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import DeleteIcon from '@mui/icons-material/Delete';

interface PreviewProps {
  id: number;
  title: string;
}

const RecipePreview: React.FC<PreviewProps> = ({ id, title }) => {
  const theme = useTheme();
  const { userAccount } = useContext(UserContext);

  const deleteRecipe = () => {
    axios
      .delete(`/routes/user/profile/delete/recipe/${id}`)
      .then(() => {
        userAccount();
      })
      .catch((err) => console.error(err, 'recipePreview 25'));
  };

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
          <Button
            size='small'
            style={{ color: theme.palette.primary.contrastText }}
          >
            Go To Recipe
          </Button>
        </Link>
        <DeleteIcon
          onClick={deleteRecipe}
          style={{
            // float: 'right',
            // marginTop: '-30px',
            // marginRight: '5px',
            marginLeft: '77%',
          }}
        />
      </CardActions>
    </Card>
  );
};

export default RecipePreview;
