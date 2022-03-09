import * as React from 'react';
import blue from '@mui/material/colors/blue';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

interface FavProps {
  favorite : String
}

const Favorite = ({ favorite } : FavProps) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        backgroundColor: 'secondary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    ><Avatar sx={{ bgcolor: blue[500], width: 28, height: 28 }} aria-label="recipe">
    {favorite.slice(0,1)}
   </Avatar>
      {favorite}</Box>
  );
};
export default Favorite;