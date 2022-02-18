import * as React from 'react';
import Box from '@mui/material/Box';

interface FavProps {
  favorite : String
}

const Favorite = ({ favorite } : FavProps) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'secondary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >{favorite}</Box>
  );
};
export default Favorite;