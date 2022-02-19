import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';

interface VideoProps {
  recipe: { strMeal: string; idMeal: string; strMealThumb: string };
}

const VideoModal = ({ recipe }: VideoProps) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //onClick={handleShow}
  const [video, setVideo] = React.useState([]);

  return (
    <>
      <IconButton aria-label='tutorial'>
        {/* allow users to play most relevant tutorial from youtube */}
        <PlayCircleIcon
          onClick={() => {
            handleShow();
          }}
        />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {/* THIS should be the videos video Id, gotten from the axios request */}
          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${recipe.idMeal}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   return (
//     <div>
//
//     </div>

//   )
// }

export default VideoModal;
