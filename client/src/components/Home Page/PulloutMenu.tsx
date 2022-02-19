import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

}));
const PulloutMenu: React.FC = () => {
  interface userProps {
    createdAt: string;
    id: string;
    name: string;
    preference: string;
    updatedAt: string;
  }

  const inCategories = ["Profile", "/profile", "Find a Recipe", "/recipe_finder", "The Feed", "/rss", "Sign Out", "/logout"];
  const outCategories = ["Sign In", "/google", "Find a Recipe", "/recipe_finder", "The Feed", "/rss"];
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<userProps | null>(null);

  function getUser() {
    if (!user) {
      axios.get('/user')
        .then(({ data }) => {
          console.log(data[0], 'pullout 34');
          setUser(data[0]);
        })
        .catch(err => console.error('error pullout 38', err))
    }
  }

  function logout() {
    axios.get('/logout')
      .then(() => {
        setUser(null);
      })
      .catch(err => console.error('error pullout 47', err));
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      {
        user ? (
          <List>
            {inCategories.map((text, index) => {
              if(index % 2 === 0){
                return (
                  <Link to={inCategories[index + 1]}>
                    <ListItem button key={text}>
                    <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                )
              }
            })}
          </List>
        ) : (
          <List>
            {outCategories.map((text, index) => {
              if(index % 2 === 0){
                return (
                  <Link to={outCategories[index + 1]}>
                    <ListItem button key={text}>
                    <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                )
              }
            })}
          </List>
        )
      }
     
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Schroedinger's Pantry
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          {getUser()}
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} >
              <CloseIcon/>
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
}
PulloutMenu.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default PulloutMenu;