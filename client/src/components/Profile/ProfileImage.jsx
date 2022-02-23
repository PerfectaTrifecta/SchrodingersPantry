import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Icon from '@mui/material/Icon';
import { Fab } from '@mui/material';
import AddIcon from '@material-ui/icons/Add'

const ProfileImage =  (files) => {

  const [imageSelected, setImageSelected] = React.useState("");
  const [shownImage, setShownImage] = React.useState(''); //url string from axios response

 

  const uploadImage = (files) => {
    // (files && console.log(files[0]));
    const formData = new FormData();
  
      formData.append('file', imageSelected),
      formData.append('upload_preset', "ivfzsgyx" ),
      
      axios.post('https://api.cloudinary.com/v1_1/schrodinger-s-pantry/image/upload', formData)
        .then((response) => {
          setShownImage(response.data.url);
        });

  }

  return (
 <div>
   <Image 
        style={{ width: 520, height: 356, borderRadius: 10}}
        cloudName="schrodinger-s-pantry"
        publicId={`${shownImage}`} />
   <br />
   <br />
  <label 
      htmlFor="upload-photo" 
      onChange={(event) => {
      setImageSelected(event.target.files[0]);
    }}
    style={{ justifyContent: "space-evenly"}}>
    <input
    style={{ display: "none"}}
    id="upload-photo"
    name="upload-photo"
    type="file"
    onChange={(event) => {
      setImageSelected(event.target.files[0]);
    }}
  />

  <Fab
    color="primary"
    size="small"
    component="span"
    aria-label="add"
    variant="extended"
    
  >
    CHOOSE FILE
  </Fab>
  

</label>


<label onClick={uploadImage} >

  <Fab
    color="primary"
    size="small"
    component="span"
    aria-label="add"
    variant="extended"
    justifycontent="space-around"
    
  >
    <AddIcon /> UPLOAD IMAGE
  </Fab>
  

</label>




    {/* <div>
      <Image 
        style={{width: 600, height: 450}}
        cloudName="schrodinger-s-pantry"
        publicId={`${shownImage}`} />
        </div>
      
      <label htmlFor="upload-photo">
      <input 
        style={{ display: 'none' }}
        type="file"
        onChange={(event) => {
        setImageSelected(event.target.files[0]);
      }}/>
       <br />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
        <AddIcon onClick={uploadImage}/> Upload photo
  </Fab>
 
        
        </label>; */}

   {/* <Box 
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
    </Box> */}
    
    </div>
  );
};
export default ProfileImage;