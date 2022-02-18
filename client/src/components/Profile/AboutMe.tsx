import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface AboutProps {
  aboutMe: String
}

const AboutMe = ({ aboutMe }: AboutProps) : JSX.Element => {
  return (
    <div>
     <Box
      sx={{
        width: 300,
        height: 100,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >{aboutMe}</Box>
    </div>
  )
}

export default AboutMe
