import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const ProfileImage = () => {
  const [image, setImage] = React.useState<File | File[]>([]);
  const { profileImage, setProfileImage } = React.useContext(UserContext);
  
  

  const handleUpload = async (file: File | File[]): Promise<void> => {
    if (file && !Array.isArray(file)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ivfzsgyx');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/schrodinger-s-pantry/image/upload',
          formData
        )
        .then(({ data }) => {
          setProfileImage(data.url);
          let imgObj = { profileImg: data.url};

          axios.post('/routes/user/profile/upload/pic', imgObj)

          .then(() => {
            console.log('successfully saved image');
          }).catch((err) => {
            console.error('error saving image url:' , err);
          })

        })
        .catch((err) => {
          console.error('error from img request:', err);
        });
    }
  };
  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
        }}
      >
        <img src={profileImage} alt='profile' width='300' height='300' />
      </Box>
      <div>
        <input
          type='file'
          accept='image/*'
          multiple={false}
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
      </div>
      <button
        onClick={() => {
          handleUpload(image);
        }}
      >
        Upload
      </button>
    </div>
  );
};
export default ProfileImage;
