import React, {
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { light, dark, veggie, meat } from '../../Theme';
import Login from '../Login';
import SpotLog from './spotify/SpotLog';
import WebPlayback from './spotify/WebPlayback';
import Timer from '../Timer/Timer';
import useTheme from '@mui/material/styles/useTheme';
import { PaletteOptions } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Link } from 'react-router-dom';
import schrodingers_logo from '../../img/schrodingers_logo_black.png';

interface TokenValue {
  token: string;
}

interface ThemeOptions {
  palette?: PaletteOptions;
}

interface Props {
  changeTheme: Dispatch<SetStateAction<ThemeOptions>>;
}

const PulloutMenu: React.FC<Props> = ({ changeTheme }) => {
  const inCategories = [
    'Profile',
    '/profile',
    'Find a Recipe',
    '/recipe_finder',
    'The Feed',
    '/rss',
    'Market Locator',
    '/market_finder',
  ];
  const outCategories = ['Find a Recipe', '/recipe_finder', 'The Feed', '/rss'];
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const [token, setToken] = useState('');

  // //Theme Checkbox States
  const [radioVal, setRadioVal] = useState('light');

  if (radioVal === 'light') {
    changeTheme(light);
  } else if (radioVal === 'dark') {
    changeTheme(dark);
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
      .then(() => {
        setLoggedIn(false);
        setUser(null);
        console.log('user set to null');
      })
      .catch((err) => console.error('error pullout 47', err));
  };

  const drawer = (
    <div
      style={{
        background: theme.palette.primary.main,
        height: '100%',
      }}
    >
      <Link to={'/'}>
        <img
          src={schrodingers_logo}
          width='180'
          style={{ paddingTop: '20px' }}
        />
      </Link>
      {loggedIn ? (
        <List
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            alignContent: 'stretch',
          }}
        >
          {inCategories.map((text, index) => {
            if (index % 2 === 0) {
              return (
                <Link
                  to={inCategories[index + 1]}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              );
            }
          })}
          {token === undefined ? (
            <SpotLog key={1} />
          ) : (
            <WebPlayback token={token} key={token} />
          )}
          <Button
            onClick={logout}
            // key={text}
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              paddingLeft: '0px',
              // width: '175px',
            }}
          >
            <ListItem button>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
          </Button>
        </List>
      ) : (
        <List>
          <Login />
          {outCategories.map((text, index) => {
            if (index % 2 === 0) {
              return (
                <Link
                  to={outCategories[index + 1]}
                  key={text}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.primary.contrastText,
                  }}
                >
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
        style={{
          background: theme.palette.primary.dark,
          color: theme.palette.secondary.main,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            style={{ background: theme.palette.primary.dark }}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          {/* <Link to={'/'}>
            <img src={logo} width='110' height='80' />
          </Link> */}

          <Typography variant='h6' noWrap>
            <Link
              style={{
                textDecoration: 'none',
                color: theme.palette.secondary.main,
              }}
              className='navbar-logo'
              to={'/'}
            >
              <span>Schrödinger's Pantry</span>
            </Link>
          </Typography>
          <FormControl component='fieldset' style={{ marginLeft: 'auto' }}>
            <RadioGroup
              aria-label='position'
              row
              value={radioVal}
              onChange={handleChange}
            >
              <FormControlLabel
                value='light'
                control={
                  <Radio
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        style={{ color: theme.palette.secondary.main }}
                      />
                    }
                  />
                }
                label='Light'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='dark'
                control={
                  <Radio
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        style={{ color: theme.palette.secondary.main }}
                      />
                    }
                  />
                }
                label='Dark'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>
        </Toolbar>
      </AppBar>
      <nav style={{ backgroundColor: theme.palette.primary.main }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden
          smUp
          implementation='css'
          // style={{ backgroundColor: theme.palette.primary.main }}
        >
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              style={{
                backgroundColor: theme.palette.primary.main,
                width: '100%',
                borderRadius: '0px',
              }}
              // edge='start'
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div>
        <div />
      </div>
    </div>
  );
};

export default PulloutMenu;
