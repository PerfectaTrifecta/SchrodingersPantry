import React, { useContext } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../UserContext';
import { jsx } from '@emotion/react'; // If this doesn't get used, please delete

interface FavProps {
 recipeId: String
}

const Favorite = (recipeId : FavProps) : JSX.Element => {
  //SHOULD ALL COME FROM USER CONTEXT


  //favorites is an array that comes from usercontext that contains strings of recipe ids
  //favorites will be updated in the context on click, but the axios request wont be made until the end of a session to maintain site speed
   //const { favorites, setFavorites } = React.useContext(UserContext);
   //the string of recipe id thats clicked, to be pushed into favorites
  
  const [toggled, setToggled] = React.useState(false);
 

  const handleClick = () => {
    //set color red ( toggle between red and normal on click)
    //set state of clicked recipe
    //send in params of axios request, with user id
    //send recipe to be added to favorites

  //  setFavorites(favorites.push(recipeId.toString()))
    setToggled(!toggled);
    // return axios.post(`/routes/user/profile/favorites`, recipeId)
    //   .then((response) => {
    //     //should recieve an array to update the state
    //     //save updated favorites list to user context to be used elsewhere
    //       //should recieve an array to update the state
    //       //save updated favorites list to user context to be used elsewhere
    //       //setFavorites(response);
    //   })
    //   .catch((err) => {
    //     console.error("response from favs on backend,",err);
    //   })
  }

  return (
    <div>
      <IconButton aria-label='add to favorites' onClick={() => handleClick()} size='large'>
        {toggled ?  <FavoriteIcon  style={{ color: 'red' }} fontSize="large" /> :
        <FavoriteIcon  fontSize="large" />}
         
        </IconButton>
    </div>
  )
}

export default Favorite;
