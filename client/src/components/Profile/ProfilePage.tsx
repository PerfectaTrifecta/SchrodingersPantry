///------------MATERIAL UI IMPLEMENTATION--------------//
import * as React from 'react';
import { styled } from '@mui/material/styles';
import  Card  from '@mui/material/Card';
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
import Creation from './Creation';
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

interface UserProps {
  user: { username: String, aboutMe: String, creations: Array<String>, favorites: Array<String>, imageUrl?: String}
}

//the search component should map over the results, creating a meal card for each recipe, 
 const ProfilePage = ({ user }: UserProps) => {


  const [expanded, setExpanded] = React.useState<boolean>(false);
  // use user context and assign the values to corresponding state values and map thru

  //for now use dummy data
  // const [creations, setCreations] = React.useState<Array<string>>(['um', 'ig', 'well', 'nerver', 'know']);
  // const [favorites, setFavorites] = React.useState<Array<String>>(["everyone", "wanted", 'to know', 'what i would do', 'if i DIDNT win']);


  const handleExpandClick = () => {
    console.log(expanded);
    setExpanded(!expanded);
  };

  // const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
  // // set state of meal to the clicked cards title
  //   setMeal(event.target.value);
  // }

  return (
    <Card  sx={{ maxWidth: 460 }}style={{
      alignContent: "space around",
      justifyContent: "space-evenly",
     
    }} //{onClick={handleCardClick}}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[500], width: 56, height: 56 }} aria-label="recipe">
           {user.username.slice(0,1)}
            {/* this should be user profile's first letter */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user ? `${user.username.toUpperCase()}`:'nope' }//user.name
      />
      <ProfileImage />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ACCOUNT DETAILS:
          {/* user.description*/}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>About Me</Typography>
        <AboutMe  aboutMe={user.aboutMe}/>
        <Typography paragraph>Favorites</Typography>
        {
        user.favorites.map((favorite: String) => {
          return (
            <Favorite favorite={favorite} />
          )
        })
  }
        <Typography paragraph>Creations</Typography>
        {
        user.creations.map((creation: String) => {
          return (
            <Creation creation={creation}/>
          )
        })
  }
        </CardContent>
      </Collapse>
    </Card>

     );
    }

export default ProfilePage;