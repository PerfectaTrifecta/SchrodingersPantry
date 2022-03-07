import React, {
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import SpotLog from './spotify/SpotLog';
import WebPlayback from './spotify/WebPlayback';
import {
  PaletteOptions,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Timer from '../Timer/Timer';
import { light, dark, veggie, meat } from '../../Theme';

interface TokenValue {
  token: string;
}

interface ThemeOptions {
  palette?: PaletteOptions;
}

interface Props {
  changeTheme: Dispatch<SetStateAction<ThemeOptions>>;
}

const drawerWidth = 240;
const PulloutMenu: React.FC<Props> = ({ changeTheme }) => {
  const inCategories = [
    'Profile',
    '/profile',
    'Find a Recipe',
    '/recipe_finder',
    'The Feed',
    '/rss',
    // 'Meal Prep',
    // '/meal_prep',
    'Sign Out',
    '/logout',
  ];
  const outCategories = ['Find a Recipe', '/recipe_finder', 'The Feed', '/rss'];
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = useState('');

  //Theme Checkbox States
  const [radioVal, setRadioVal] = useState('light');

  if (radioVal === 'light') {
    changeTheme(light);
  } else if (radioVal === 'dark') {
    changeTheme(dark);
  } else if (radioVal === 'veggie') {
    changeTheme(veggie);
  } else if (radioVal === 'meat') {
    changeTheme(meat);
  }

  //Theme Checkbox Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioVal(e.target.value);
  };

  useEffect(() => {
    const getToken = async () => {
      const response = axios.get('/auth/token').then((res) => {
        setToken(res.data.accessToken);
      });
      // setToken(json.access_token);
    };

    getToken();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    axios
      .get('/auth/logout')
      .then((res) => {
        setUser(null);
        console.log('user set to null');
      })
      .catch((err) => console.error('error pullout 47', err));
  };

  const drawer = (
    <div>
      <Link to={'/'}>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/5/52/Star_Fox_SNES.jpg'
          width='200'
        />
      </Link>
      {user ? (
        <List>
          {inCategories.map((text, index) => {
            if (index % 2 === 0) {
              if (text === 'Sign Out') {
                return (
                  <Button onClick={logout} key={text}>
                    <ListItem button>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Button>
                );
              } else {
                return (
                  <Link to={inCategories[index + 1]}>
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                );
              }
            }
          })}
          {token === undefined ? (
            <SpotLog key={1} />
          ) : (
            <WebPlayback token={token} key={token} />
          )}
        </List>
      ) : (
        <List>
          <Login />
          {outCategories.map((text, index) => {
            if (index % 2 === 0) {
              return (
                <Link to={inCategories[index + 1]} key={text}>
                  <ListItem button>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              );
            }
          })}
        </List>
      )}
      <Timer />
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar
        position='static'
        style={{ background: theme.palette.primary.main }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Schroedinger's Pantry
          </Typography>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Themes</FormLabel>
            <RadioGroup
              aria-label='position'
              row
              value={radioVal}
              onChange={handleChange}
            >
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='Light'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='veggie'
                control={<Radio />}
                label='Veggie'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='meat'
                control={<Radio />}
                label='Meat'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='dark'
                control={<Radio />}
                label='Dark'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>
        </Toolbar>
      </AppBar>
      <nav>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        {/* <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
          >
            <div />
            {drawer}
          </Drawer>  
        </Hidden> */}
      </nav>
      <div>
        <div />
      </div>
    </div>
  );
};

export default PulloutMenu;
