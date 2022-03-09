import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Icon from '@mui/material/Icon';
import { Fab } from '@mui/material';
import AddIcon from '@material-ui/icons/Add'

const ProfileImage =  (files) => {

  const [imageSelected, setImageSelected] = React.useState("");
  const [shownImage, setShownImage] = React.useState('https://res.cloudinary.com/schrodinger-s-pantry/image/upload/v1646857808/qfyvxnnzi6are14myzqi.png'); //url string from axios response

 

  const uploadImage = () => {
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
    <div>
       <label 
        htmlFor="upload-photo" 
        onChange={(event) => {
        setImageSelected(event.target.files[0]);
        }}>
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
            color="inherit"
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
            color="inherit"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
            justifycontent="space-around"
            >
           <AddIcon /> UPLOAD
          </Fab>
        </label>
  </div>    
</div>
  );
};
export default ProfileImage;