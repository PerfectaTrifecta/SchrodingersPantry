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
import { PaletteOptions } from '@mui/material';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import green from '@mui/material/colors/green';
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
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Link } from 'react-router-dom';
import { light, dark } from '../../Theme';

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

interface ThemeOptions {
  palette?: PaletteOptions;
}

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

interface Bookmarks {
  id?: number;
  link: string;
  title: string;
  creator: string;
  relTime: string;
  img: string;
}

interface Props {
  recipeList: MyRecipeTypes[];
  setRecipeList: React.Dispatch<React.SetStateAction<MyRecipeTypes[]>>;
  bookmarkList: Bookmarks[];
  setBookmarkList: React.Dispatch<React.SetStateAction<Bookmarks[]>>;
  setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
}

//the search component should map over the results, creating a meal card for each recipe,
const ProfilePage: React.FC<Props> = ({
  recipeList,
  setRecipeList,
  bookmarkList,
  setBookmarkList,
  setTheme,
}) => {
  const theme = useTheme();

  // use user context and assign the values to corresponding state values and map thru
  const { user, setUser, userAccount, profileImage, setProfileImage } =
    useContext(UserContext);
  const { userName, favorites, diet, allergies, bio } = user;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [image, setImage] = React.useState<File | File[]>([]);
  const [editPic, setEditPic] = useState<boolean>(false);

  const [aboutMeDisplay, setAboutMeDisplay] = useState<string>(bio);
  const [aboutMeField, setAboutMeField] = useState<string>('');
  const [editBio, setEditBio] = useState<boolean>(false);
  const [dietDisplay, setDietDisplay] = useState<string>(diet);
  const [dietField, setDietField] = useState<string>('');
  const [editDiet, setEditDiet] = useState<boolean>(false);
  const [allergyDisplay, setAllergyDisplay] = useState<string>(allergies);
  const [allergyField, setAllergyField] = useState<string>('');
  const [editAllergies, setEditAllergies] = useState<boolean>(false);

  useEffect(() => {
    userAccount();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpload = async (file: File | File[]): Promise<void> => {
    if (file && !Array.isArray(file)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ivfzsgyx');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/schrodinger-s-pantry/image/upload',
          formData
        )
        .then(({ data }) => {
          setProfileImage(data.url);
          saveImage(data.url);
          setEditPic(false);
        })
        .catch((err) => console.error('error from img request:', err));
    }
  };

  const saveImage = (profileImage: string) => {
    console.log(profileImage, 'profile,', 146);

    let imgObj = {
      profileImg: profileImage,
      userId: user.id,
    };

    return axios
      .post('/routes/user/profile/upload/pic', imgObj)
      .then(() => {
        console.log();
        userAccount();
        console.log('successfully saved image');
      })
      .catch((err) => {
        console.error('error saving image url:', err);
      });
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
      .post('routes/user/profile/update/allergies', { allergies: allergyField })
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
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0.25rem',
        // alignItems: 'center',
      }}
    >
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          maxWidth: '600px',
          width: '90%',
          backgroundColor: theme.palette.primary.light,
          // color: theme.palette.primary.contrastText,
          padding: '1rem',
          margin: '1rem 0',
          boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.primary.dark}`,
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: theme.palette.primary.dark,
        }} //{onClick={handleCardClick}}
      >
        <CardHeader
          title={`${user.userName.toUpperCase()}`}
          titleTypographyProps={{ variant: 'h4' }}
          avatar={
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              {console.log(profileImage, 'profile 256')}
              <img src={profileImage} alt='profile' width='300' height='300' />
            </Box>
          }
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: theme.palette.primary.contrastText,
          }}
        />

        <CardContent style={{ color: theme.palette.primary.contrastText }}>
          <Typography variant='subtitle1' fontWeight='bold'>
            About Me:{' '}
          </Typography>
          <Typography variant='body2'>{aboutMeDisplay}</Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            Dietary Preference:{' '}
          </Typography>
          <Typography variant='body2'>{dietDisplay}</Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            Food Allergies:{' '}
          </Typography>
          <Typography variant='body2'>{allergyDisplay}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography
            variant='subtitle2'
            color={theme.palette.primary.contrastText}
            sx={{ marginLeft: '435px' }}
          >
            Edit Profile
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography
              variant='subtitle1'
              color={theme.palette.primary.contrastText}
            >
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
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={submitBio}
                  style={{ color: theme.palette.primary.contrastText }}
                >
                  Update
                </Button>
              </>
            ) : null}
            <Typography
              variant='subtitle1'
              color={theme.palette.primary.contrastText}
            >
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
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={submitDiet}
                  style={{ color: theme.palette.primary.contrastText }}
                >
                  Update
                </Button>
              </>
            ) : null}
            <Typography
              variant='subtitle1'
              color={theme.palette.primary.contrastText}
            >
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
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={submitAllergies}
                  style={{ color: theme.palette.primary.contrastText }}
                >
                  Update
                </Button>
              </>
            ) : null}
            <Typography
              variant='subtitle1'
              color={theme.palette.primary.contrastText}
            >
              Edit Profile Pic
              <IconButton
                aria-label='edit'
                onClick={() => setEditPic(!editPic)}
              >
                <FaceRetouchingNaturalIcon />
              </IconButton>
            </Typography>
            {editPic ? (
              <>
                <input
                  type='file'
                  accept='image/*'
                  multiple={false}
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => {
                    handleUpload(image);
                  }}
                  style={{
                    color: theme.palette.primary.contrastText,
                    marginRight: '300px',
                  }}
                >
                  {' '}
                  Upload{' '}
                </Button>
              </>
            ) : null}
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
          color: theme.palette.primary.contrastText,
          fontWeight: 'bold',
        }}
      >
        MY RECIPES
        <Link
          to={{
            pathname: '/create_recipe',
          }}
          style={{ textDecoration: 'none' }}
        >
          <Button
            size='small'
            style={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {' '}
            Create a New Recipe{' '}
          </Button>
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
          color: theme.palette.primary.contrastText,
        }}
      >
        {/* FAVORITE RECIPES */}
        {/* {favorites.map((favorite: string) => (
          //INTEGRATE FAVORITES HERE
          // <RecipePreview id={favorite.id} title={favorite.title} />
        ))} */}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.primary.contrastText,
          fontWeight: 'bold',
        }}
      >
        BOOKMARKS
        <List>
          {bookmarkList.map((mark) => {
            const { id, creator, title, relTime, link, img } = mark;

            const deleteBookmark = () => {
              axios
                .delete(`/routes/user/profile/delete/bookmark/${id}`)
                .then(() => {
                  userAccount();
                })
                .catch((err) => console.error(err, 'profile 215'));
            };

            return (
              <div
                id='bookmark'
                key={title}
                style={{
                  backgroundColor: theme.palette.primary.light,
                  borderColor: theme.palette.primary.dark,
                }}
              >
                <a id='headline' href={link}>
                  <div id='rssImg'>
                    <img width='120' src={img}></img>
                  </div>
                  <div
                    id='rssStoryDiv'
                    style={{ color: theme.palette.primary.contrastText }}
                  >
                    <h5 id='rssTitle'>{title}</h5>
                    <h6 id='rssCreator'>Written by: {creator}</h6>
                    <h6 id='rssTime'>{relTime}</h6>
                  </div>
                </a>
                <DeleteIcon
                  onClick={deleteBookmark}
                  style={{
                    float: 'right',
                    marginTop: '-30px',
                    // marginRight: '5px',
                  }}
                />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default ProfilePage;
