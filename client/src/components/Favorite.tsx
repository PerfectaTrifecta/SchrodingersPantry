import React, { useContext } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../UserContext';
import { jsx } from '@emotion/react'; // If this doesn't get used, please delete

interface FavProps {
 recipeId: string 
}

const Favorite = (recipeId : FavProps) : JSX.Element => {
  //SHOULD ALL COME FROM USER CONTEXT

   const [favorites, setFavorites] = React.useState<Array<{}> | any>([]);
  
  // const [googleId, setGoogleId] = React.useState("");
  const [toggled, setToggled] = React.useState(false);
 

  const handleClick = () => {
    //set color red ( toggle between red and normal on click)
    //set state of clicked recipe
    //send in params of axios request, with user id
    //send recipe to be added to favorites
   
    setToggled(!toggled);
    return axios.post(`/routes/user/profile/favorites`, recipeId)
      .then((response) => {
        //should recieve an array to update the state
        //save updated favorites list to user context to be used elsewhere
          //should recieve an array to update the state
          //save updated favorites list to user context to be used elsewhere
          setFavorites(response);
      })
      .catch((err) => {
        console.error("response from favs on backend,",err);
      })
  }

  return (
    <div>
      <IconButton aria-label='add to favorites' onClick={() => handleClick()}>
        {toggled ?  <FavoriteIcon  style={{ color: 'red' }}/> :
        <FavoriteIcon />}
         
        </IconButton>
    </div>
  )
}

export default Favorite;
