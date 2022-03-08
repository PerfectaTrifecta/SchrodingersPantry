import React, { useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { VideoContext } from '../VideoContext';

interface VideoProps {
  mealName: string;
}

const VideoModal = ({ mealName }: VideoProps) => {
  const { searchClick, videoId, setRecipeName } = useContext(VideoContext);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    setRecipeName(mealName);
  });

  return (
    <>
      <IconButton
        aria-label='tutorial'
        onClick={() => {
          handleShow();
          searchClick();
        }}
      >
        {' '}
        Youtube Tutorial
        {/* allow users to play most relevant tutorial from youtube */}
        <PlayCircleIcon />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${videoId}`}
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

export default VideoModal;
