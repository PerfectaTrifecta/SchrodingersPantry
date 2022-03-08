import * as React from 'react';
import { Box }from '@mui/material';

const ProfileImage = () => {

  const handleUpload = async ( file: File | File[]) : Promise<void> => {
    if(file && !Array.isArray(file)) {
    const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', '')

      //const newPic

    }
  }
  return (
    <div>
      Change your profile pic?
      <div> 
        <input type="file" accept="image/*" multiple={false} />
      </div>

      <Box 
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        Profile Image
      </Box>
    </div>
    
  );
};
export default ProfileImage;