///------------MATERIAL UI IMPLEMENTATION--------------//
import React, { useState, useContext, useEffect, SetStateAction } from 'react';
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
import { orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Box from '@mui/material/Box';
import ProfileImage from './ProfileImage';
import AboutMe from './AboutMe';
import Favorite from './Favorite';
import MyRecipe from './MyRecipe';
import { UserContext } from '../../UserContext';
import axios, { AxiosResponse } from 'axios';
import CreateRecipeForm from './CreateRecipeForm';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import EditIcon from '@mui/icons-material/Edit';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import SearchYoutube from './SearchYoutube';
import RecipePreview from './RecipePreview';

//-----for card chevron expansion functionality-----/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface MyRecipeTypes {
  id: number;
  userId: string;
  title: string;
  ingredients: string;
  instructions: string;
  vote_count: number;
  comment_count: number;
  createdAt: string;
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

//the search component should map over the results, creating a meal card for each recipe,
const ProfilePage: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer>();
  const [img, setImg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [creations, setCreations] = useState<MyRecipeTypes[]>([]);
  const [favorites, setFavorites] = useState<MyRecipeTypes[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const [aboutMeDisplay, setAboutMeDisplay] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [editBio, setEditBio] = useState<boolean>(false);
  const [dietDisplay, setDietDisplay] = useState<string>('None');
  const [diet, setDiet] = useState<string>('');
  const [editDiet, setEditDiet] = useState<boolean>(false);
  const [allergyDisplay, setAllergyDisplay] = useState<string>('None');
  const [allergies, setAllergies] = useState<string>('');
  const [editAllergies, setEditAllergies] = useState<boolean>(false);
  // use user context and assign the values to corresponding state values and map thru
  const { user, setUser, getUser } = useContext(UserContext);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_NAME,
    },
  });
  const profilePic = cld.image(img);
  //checkout different url-gen actions to see how to style the image using profilePic.<action>

  // when page loads, get user's recipes (& favorites & bookmarks) from db
  useEffect(() => {
    axios
      .get('/routes/user/profile/recipes')
      .then(({ data }) => {
        // console.log(data, 'user recipes, profile 96')
        setCreations(data);
      })
      .catch((err) =>
        console.error('problem getting recipes, profile 98', err)
      );

    // axios.get('/routes/user/profile/favorites')
    //   .then(({ data }) => {
    //     // console.log(data, 'user faves, profile 103');
    //     setFavorites(data)
    //   })
    //   .catch(err => console.error('problem getting faves, profile 108'));

    // axios.get('/routes/user/profile/bookmarks')
    //   .then(({ data }) => {
    //     // console.log(data, 'user bookmarks, profile 112');
    //     setBookmarks(data);
    //   })
    //   .catch(err => console.error('problem getting bookmarks, profile 115'));
  })

  //for now use dummy data
  // const [creations, setCreations] = React.useState<Array<string>>(['um', 'ig', 'well', 'nerver', 'know']);
  // const [favorites, setFavorites] = React.useState<Array<String>>(["everyone", "wanted", 'to know', 'what i would do', 'if i DIDNT win']);

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
        console.log(selectedImg, 'profile 76');
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
    setAboutMe(e.target.value);
  };

  const submitBio = () => {
    setAboutMeDisplay(aboutMe);
    setEditBio(false);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiet(e.target.value);
  };

  const submitDiet = () => {
    setDietDisplay(diet);
    setEditDiet(false);
  };

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllergies(e.target.value);
  };

  const submitAllergies = () => {
    setAllergyDisplay(allergies);
    setEditAllergies(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
                {user.userName.slice(0, 1)}
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
                  defaultValue={aboutMe}
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
                  defaultValue={diet}
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
                  defaultValue={allergies}
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
      {showForm ? <CreateRecipeForm handleForm={handleForm} /> : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        MY RECIPES 
        <Button size='small' onClick={handleForm}> Create a New Recipe </Button>
        {creations.map(creation => <RecipePreview id={creation.id} title={creation.title} />)}
      </div>
      <div>
        FAVORITE RECIPES
        {/* {favorites.map((favorite) => {
          //should return a recipe preview like the search page
        })} */}
      </div>
      <div>
        BOOKMARKS
        <List>
          {/* {bookmarks.map(mark => {
            <ListItem>
              <ListItemText primary={mark} />
            </ListItem>
          })} */}
        </List>
      </div>
    </div>
  );
};

export default ProfilePage;
