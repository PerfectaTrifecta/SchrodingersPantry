///------------MATERIAL UI IMPLEMENTATION--------------//
import React, { useState, useContext, useEffect, SetStateAction } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserContext } from '../../UserContext';
import CreateRecipeForm from './CreateRecipeForm';
import ProfileImage from './ProfileImage';
import AboutMe from './AboutMe';
import Favorite from './Favorite';
import MyRecipe from './MyRecipe';
import RecipePreview from './RecipePreview';
import styled from '@mui/material/styles/styled';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import orange from '@mui/material/colors/orange';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Link } from 'react-router-dom';

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

//the search component should map over the results, creating a meal card for each recipe,
const ProfilePage: React.FC<Props> = ({ recipeList, setRecipeList }) => {
  // use user context and assign the values to corresponding state values and map thru
  const { user, setUser } = useContext(UserContext);
  const { userName, bookmarks, favorites, diet, allergies, bio } = user;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer>();
  const [img, setImg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  // const [creations, setCreations] = useState<MyRecipeTypes[]>([]);
  // const [favorites, setFavorites] = useState<MyRecipeTypes[]>([]);
  // const [bookmarks, setBookmarks] = useState<string[]>([]);

  const [aboutMeDisplay, setAboutMeDisplay] = useState<string>(bio);
  const [aboutMeField, setAboutMeField] = useState<string>('');
  const [editBio, setEditBio] = useState<boolean>(false);
  const [dietDisplay, setDietDisplay] = useState<string>(diet);
  const [dietField, setDietField] = useState<string>('');
  const [editDiet, setEditDiet] = useState<boolean>(false);
  const [allergyDisplay, setAllergyDisplay] = useState<string>(allergies);
  const [allergyField, setAllergyField] = useState<string>('');
  const [editAllergies, setEditAllergies] = useState<boolean>(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_NAME,
    },
  });
  const profilePic = cld.image(img);
  //checkout different url-gen actions to see how to style the image using profilePic.<action>

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
  // // set state of meal to the clicked cards title
  //   setMeal(event.target.value);
  // }

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(typeof reader.result);
        setSelectedImg(reader.result);
        console.log(reader.result, 'profile 76');
      };
    }
  };

  const submitImg = () => {
    // console.log(selectedImg, 83);
    axios
      .post('/routes/user/profile/upload/pic', selectedImg)
      .then((id) => {
        //BUG TO REVISTS
        // setImg(id);
      })
      .catch((err) => console.log('problem uploading profile pic', err));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAboutMeField(e.target.value);
  };

  const submitBio = () => {
    setAboutMeDisplay(aboutMeField);

    axios
      .post('/routes/user/profile/update/bio', { bio: aboutMeField })
      .then(() => {
        setAboutMeField('');
        setEditBio(false);
      })
      .catch((err) => console.error(err, 'profile 176'));
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDietField(e.target.value);
  };

  const submitDiet = () => {
    setDietDisplay(dietField);

    axios
      .post('routes/user/profile/update/diet', { diet: dietField })
      .then(() => {
        setDietField('');
        setEditDiet(false);
      })
      .catch((err) => console.error(err, 'profile 191'));
  };

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllergyField(e.target.value);
  };

  const submitAllergies = () => {
    setAllergyDisplay(allergyField);

    axios
      .post('routes.user/profile/update/allergies', { allergies: allergyField })
      .then(() => {
        setAllergyField('');
        setEditAllergies(false);
      })
      .catch((err) => console.error(err, 'profile 206'));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
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
        {img ? (
          <CardHeader
            avatar={<AdvancedImage cldImg={profilePic} />}
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={user ? `${user.userName.toUpperCase()}` : 'nope'} //user.name
          />
        ) : (
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: orange[500], width: 56, height: 56 }}
                aria-label='recipe'
              >
                {/* {console.log(user.name, 'profile 99')} */}
                {userName.slice(0, 1)}
                {/* this should be user profile's first letter */}
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={user ? `${user.userName.toUpperCase()}` : 'nope'} //user.name
          />
        )}

        {/* <ProfileImage /> */}
        <CardContent>
          <Typography variant='subtitle1'>About Me: </Typography>
          <Typography variant='body2'>{aboutMeDisplay}</Typography>
          <Typography variant='subtitle1'>Dietary Preference: </Typography>
          <Typography variant='body2'>{dietDisplay}</Typography>
          <Typography variant='subtitle1'>Food Allergies: </Typography>
          <Typography variant='body2'>{allergyDisplay}</Typography>
        </CardContent>
        <CardActions disableSpacing>
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
            <Typography variant='subtitle1' color='text.secondary'>
              Edit About Me
              <IconButton
                aria-label='edit'
                onClick={() => setEditBio(!editBio)}
              >
                <EditIcon />
              </IconButton>
            </Typography>
            {editBio ? (
              <>
                <TextField
                  id='outlined-multiline-static'
                  label='Write about yourself'
                  multiline
                  rows={5}
                  defaultValue={aboutMeField}
                  onChange={handleBioChange}
                />
                <Button size='small' color='primary' onClick={submitBio}>
                  Update
                </Button>
              </>
            ) : null}
            <Typography variant='subtitle1' color='text.secondary'>
              Edit Dietary Preference
              <IconButton
                aria-label='edit'
                onClick={() => setEditDiet(!editDiet)}
              >
                <EditIcon />
              </IconButton>
            </Typography>
            {editDiet ? (
              <>
                <TextField
                  id='outlined-multiline-static'
                  label='Set your preference'
                  multiline
                  rows={1}
                  defaultValue={dietField}
                  onChange={handleDietChange}
                />
                <Button size='small' color='primary' onClick={submitDiet}>
                  Update
                </Button>
              </>
            ) : null}
            <Typography variant='subtitle1' color='text.secondary'>
              Edit Food Allergies
              <IconButton
                aria-label='edit'
                onClick={() => setEditAllergies(!editAllergies)}
              >
                <EditIcon />
              </IconButton>
            </Typography>
            {editAllergies ? (
              <>
                <TextField
                  id='outlined-multiline-static'
                  label='Any food allergies?'
                  multiline
                  rows={3}
                  defaultValue={allergyField}
                  onChange={handleAllergyChange}
                />
                <Button size='small' color='primary' onClick={submitAllergies}>
                  Update
                </Button>
              </>
            ) : null}
            <Typography variant='subtitle1' color='text.secondary'>
              Edit Profile Pic
              <IconButton aria-label='edit'>
                <FaceRetouchingNaturalIcon />
              </IconButton>
            </Typography>
            <input
              type='file'
              accept='image/*'
              onChange={handleImgUpload}
              multiple={false}
            />
            <Button onClick={submitImg}> Submit </Button>
          </CardContent>
        </Collapse>
      </Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        MY RECIPES
        <Link
          to={{
            pathname: '/create_recipe',
          }}
          style={{ textDecoration: 'none' }}
        >
          <Button size='small'> Create a New Recipe </Button>
        </Link>
        {recipeList.map((recipe) => (
          <RecipePreview id={recipe.id} title={recipe.title} />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        FAVORITE RECIPES
        {favorites.map((favorite: MyRecipeTypes) => (
          <RecipePreview id={favorite.id} title={favorite.title} />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        BOOKMARKS
        <List>
          {bookmarks.map((mark) => {
            const { creator, title, relTime, link, img } = mark;

            return (
              <div id='bookmark' key={title}>
                <a id='headline' href={link}>
                  <div id='rssImg'>
                    <img width='120' src={img}></img>
                  </div>
                  <div id='rssStoryDiv'>
                    <h5 id='rssTitle'>{title}</h5>
                    <h6 id='rssCreator'>Written by: {creator}</h6>
                    <h6 id='rssTime'>{relTime}</h6>
                  </div>
                </a>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default ProfilePage;
