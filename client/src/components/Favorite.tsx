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
   const { favorites, setFavorites, user } = React.useContext(UserContext);

  
  const [toggled, setToggled] = React.useState(false);
 

  const handleClick = () => {
    setToggled(!toggled);
    //console.log(recipeId.recipeId, 300000000000000)
    return axios.post(`/routes/user/profile/favorites`, {
      userId: user.id,
      recipeId: recipeId.recipeId.toString(),
    })
      .then((response) => {
          //should recieve an array to update the state
          //save updated favorites list to user context to be used elsewhere
          setFavorites(response.data);
      })
      .catch((err) => {
        console.error("response from favs on backend,",err);
      })
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
