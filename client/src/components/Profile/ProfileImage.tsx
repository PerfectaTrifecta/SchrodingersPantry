import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const ProfileImage = () => {
  const [image, setImage] = React.useState<File | File[]>([]);
  const { profileImage, setProfileImage, userAccount, user } =
    React.useContext(UserContext);

  const handleUpload = async (file: File | File[]): Promise<void> => {
    if (file && !Array.isArray(file)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ivfzsgyx');

      console.log('uploading image, profileImg 18 ');
      axios
        .post(
          'https://api.cloudinary.com/v1_1/schrodinger-s-pantry/image/upload',
          formData
        )
        .then(({ data }) => {
          console.log(data.url, 30);
          setProfileImage(data.url);
        })
        .then(() => {
          return saveImage(profileImage);
        })
        .catch((err) => {
          console.error('error from img request:', err);
        });
    }
  };

  const saveImage = (profileImage: string) => {
    console.log(profileImage, 'profile Image,', 36);

    let imgObj = {
      profileImg: profileImage,
      userId: user.id,
    };

    return axios
      .post('/routes/user/profile/upload/pic', imgObj)
      .then(() => {
        console.log();
        userAccount();
        console.log('successfully saved image');
      })
      .catch((err) => {
        console.error('error saving image url:', err);
      });
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
