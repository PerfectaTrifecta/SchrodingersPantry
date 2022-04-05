import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';

const ProfileImage = () => {
  const [image, setImage] = React.useState<File | File[]>([]);
  const [displayImg, setDisplayImg] = React.useState<string>(
    'http://res.cloudinary.com/schrodinger-s-pantry/image/upload/v1649119002/on2sre4jrjtrgatzovbk.png'
  );

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
          setDisplayImg(data.url);
        })
        .catch(() => {});
    }
  };
  return (
    <div>
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
        <img src={displayImg} alt='profile' width='300' height='300' />
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
