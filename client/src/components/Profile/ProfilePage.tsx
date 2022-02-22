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
import { UserContext } from '../../UserContext'
import axios, { AxiosResponse } from 'axios';
import CreateRecipeForm from './CreateRecipeForm';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
//import SearchYoutube from './SearchYoutube';

//-----for card chevron expansion functionality-----/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface MyRecipeTypes {
  id: number;
  user_id: string;
  title: string;
  ingredients: string;
  instructions: string;
  vote_count: number;
  comment_count: number;
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
  const [creations, setCreations] = useState<MyRecipeTypes[]>([])
  // use user context and assign the values to corresponding state values and map thru
  const { user, setUser, getUser } = useContext(UserContext)

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_NAME,
    },
  });
  const profilePic = cld.image(img);
  //checkout different url-gen actions to see how to style the image using profilePic.<action>

  //when page loads, get user's recipes (& favorites & bookmarks) from db
  useEffect(() => {
    axios.get('/recipes')
      .then(({ data }) => {
        setCreations(data);
      })
      .catch(err => console.error('problem grabbing recipes', err));
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
        console.log(selectedImg, 'profile 76')
      };
    }
  };

  //CURRENTLY GIVING 404 ERROR W NO DESCRIPTION
  const submitImg = () => {
    // console.log(selectedImg, 83);
    axios.post('/upload/pic', selectedImg)
      .then((id) => {
        //BUG TO REVISTS
        // setImg(id);      
      })
      .catch(err => console.log('problem uploading profile pic', err));
  };

  return (
    <div>
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
            avatar={
             <AdvancedImage cldImg={profilePic}/>
            } 
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={user ? `${user.name.toUpperCase()}` : 'nope'} //user.name
          />
        ) : (
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: orange[500], width: 56, height: 56 }}
                aria-label='recipe'
              >
                {console.log(user.name, 'profile 99')}
                {user.name.slice(0, 1)}
                {/* this should be user profile's first letter */}
              </Avatar>
            } 
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={user ? `${user.name.toUpperCase()}` : 'nope'} //user.name
          />
        )}
     
        {/* <ProfileImage /> */}
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            About Me:
            {/* <AboutMe aboutMe={user.aboutMe} /> */}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Dietary Preference:
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Food Allergies:
          </Typography>
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
            <Typography paragraph>Edit About Me</Typography>
            <Typography paragraph>Edit Food Allergies</Typography>
            <Typography paragraph>Edit Profile Pic</Typography>
              <input type="file" accept="image/*" onChange={handleImgUpload} multiple={false} />
              <button onClick={submitImg}> Submit </button>
          </CardContent>
        </Collapse>
      </Card>
      <div>
        MY RECIPES 
        {/* BUG TO REVISIT*/}
        {/* {creations.map((creation) => {
          return <MyRecipe creation={creation} />;
        })} */}
        <button onClick={handleForm}> Create a New Recipe </button>
        { showForm ? <CreateRecipeForm /> : null}
      </div>
      <div>
        FAVORITE RECIPES 
        {/* {user.favorites.map((favorite: string) => {
          return <Favorite favorite={favorite} />;
        })} */}
      </div>
      <div>
        BOOKMARKS 
        
      </div>
    </div>
  
  );
};

export default ProfilePage;
