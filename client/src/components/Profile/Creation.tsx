
//this component will render a container with a list of the users created Recipes by name, that render a modal on click
//using user context, make get request to server for users created recipes, 
//display a container with links to recipe view
import  React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { orange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';


interface CreationProps {
  creation: String
}


const Creation = ( { creation } : CreationProps) => {
  return (
        <Box
    sx={{
      width: 300,
      height: 100,
      backgroundColor: 'primary.light',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
    }}
  >
    <Avatar sx={{ bgcolor: orange[500], width: 28, height: 28 }} aria-label="recipe">
  {creation.slice(0,1)}
 </Avatar>
    {creation}</Box>
      )

}

export default Creation
