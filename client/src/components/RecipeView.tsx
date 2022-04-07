import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';
import Favorite from './Favorite';
import TextToSpeech from '../components/TextToSpeech';
import { UserContext } from '../UserContext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import InviteToChat from './InviteToChat';
import useTheme from '@mui/material/styles/useTheme';
import moment from 'moment';
// import {createMemoryHistory} from 'history';

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
  const theme = useTheme();
  //Use the useLocation hook to get idMeal passed through the search route.
  // const location = useLocation<{ idUserMeal: number | null }>();
  const { idUserMeal } = useParams<{ idUserMeal: string }>();
  const { idMeal } = useParams<{ idMeal: string }>();
  //Parsing the meal id from the URI.
  const [mealRecipe, setMealRecipe] = useState<RecipeProps[]>([]); //recipe
  const [mealUserRecipe, setMealUserRecipe] = useState<
    UserRecipeProps[] | null
  >(null); //user-created recipe
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  // const [mealId, setMealId] = useState<string>('');
  //Comments settings
  const [rawComment, setRawComment] = useState('');
  const [featComments, setFeatComments] = useState<CommentDisplay[]>([]);
  // const postTime: Date = new Date();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawComment(e.target.value);
  };
  const submitComment = () => {
    if (idMeal.length === 5) {
      setFeatComments(
        featComments.concat([
          {
            name: user.userName,
            text: rawComment,
            postedAt: new Date().toString(),
          },
        ])
      );

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
        .catch((err) => console.error(err, 'recipeView 84'));
    } else {
      setFeatComments(
        featComments.concat([
          {
            name: user.userName,
            text: rawComment,
            postedAt: new Date().toString(),
          },
        ])
      );

      axios
        .post('routes/user/profile/userComment', {
          text: rawComment,
          userId: user.id,
          userName: user.userName,
          recipeId: idUserMeal,
        })
        .then(() => {
          setRawComment('');
        })
        .catch((err) => console.error(err, 'recipeView 96'));
    }
  };
  //Prints the recipe to the screen on page load

  useEffect(() => {
    if (idMeal.length === 5) {
      axios
        .get<RecipeProps[]>(`/routes/search/getRecipe/${idMeal}`)
        .then(({ data }) => {
          data && setMealRecipe(data);
          setInstructions(data[0].strInstructions.split('\r\n'));
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .get('routes/user/profile/comment', { params: { mealId: idMeal } })
        .then(({ data }) => {
          setFeatComments(data);
        })
        .catch((err) => console.error(err, 'recipeView 143'));
    } else {
      axios
        .get('/routes/search/getUserRecipe', { params: { id: idMeal } })
        .then(({ data }) => {
          setMealUserRecipe(data);
        })
        .then(() => {
          setUserIngredients(mealUserRecipe[0].ingredients.split(','));
        })
        .catch((err) => console.error(err, 'recipeView 135'));

      axios
        .get('routes/user/profile/userComment', {
          params: { recipeId: idMeal },
        })
        .then(({ data }) => {
          setFeatComments(data);
        })
        .catch((err) => console.error(err, 'recipeView 142'));
    }
  }, []);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //Conditionally renders based on meal data availability

  return mealRecipe[0] ? (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        borderRadius: '0.25rem',
      }}
    >
      <InviteToChat />
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          maxWidth: '600px',
          width: '90%',
          padding: '1rem',
          margin: '1rem 0',
          boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          borderRadius: '0.25rem',
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
          <p>
            <TextToSpeech instructions={instructions} />
          </p>
        </CardContent>
        <CardActions>
          {/* <Favorite recipeId={idMeal} /> */}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <CommentIcon fontSize='large' />
          </IconButton>
          <VideoModal mealName={mealRecipe[0].strMeal} />
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <TextField
              id='outlined-multiline-flexible'
              label='Your Comment'
              placeholder='Tasted this dish before?'
              multiline
              maxRows={4}
              inputProps={{
                maxLength: 120,
                color: theme.palette.primary.contrastText,
              }}
              value={rawComment}
              onChange={handleCommentChange}
            />
            <Button
              variant='outlined'
              size='small'
              onClick={submitComment}
              style={{ color: theme.palette.primary.contrastText }}
            >
              Submit
            </Button>
            {featComments.map((comment) => (
              <Box
                sx={{
                  border: `1px solid ${theme.palette.primary.contrastText}`,
                  width: '450px',
                  marginTop: '5px',
                  padding: '5px 5px 10px 5px',
                  borderRadius: '5px',
                }}
              >
                <Typography>{comment.name}</Typography>
                <Typography>{comment.text}</Typography>
                <Typography>
                  {moment(comment.postedAt).format('MMMM Do YYYY, h:mm a')}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  ) : mealUserRecipe ? (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        borderRadius: '0.25rem',
      }}
    >
      <InviteToChat />
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          maxWidth: '600px',
          width: '90%',
          padding: '1rem',
          margin: '1rem 0',
          boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          borderRadius: '0.25rem',
        }}
      >
        <CardHeader
          title={mealUserRecipe[0].title}
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
            {mealUserRecipe[0].ingredients.split(',').map((tuple, i) => (
              <li key={i}>{tuple}</li>
            ))}
          </ul>
          <Typography paragraph>
            <strong>Directions:</strong>
          </Typography>

          {mealUserRecipe[0].instructions
            .split('\n')
            .map((p: string, i: number) => (
              <Typography key={p + i}>{p}</Typography>
            ))}
          <TextToSpeech instructions={instructions} />
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
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <TextField
              id='outlined-multiline-flexible'
              label='Your Comment'
              placeholder='Tasted this dish before?'
              multiline
              maxRows={4}
              inputProps={{ maxLength: 120 }}
              value={rawComment}
              onChange={handleCommentChange}
              onKeyPress={(e) => {
                e.key === 'Enter' && submitComment();
              }}
            />
            <Button
              variant='outlined'
              size='small'
              onClick={submitComment}
              style={{ color: theme.palette.primary.contrastText }}
            >
              Submit
            </Button>
            {featComments.map((comment) => (
              <Box
                sx={{
                  border: `1px solid ${theme.palette.primary.contrastText}`,
                  width: '450px',
                  marginTop: '5px',
                  padding: '5px 5px 10px 5px',
                }}
              >
                <Typography>{comment.name}</Typography>
                <Typography>{comment.text}</Typography>
                <Typography>
                  {moment(comment.postedAt).format('MMMM Do YYYY, h:mm a')}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  ) : null;
};

export default RecipeView;
