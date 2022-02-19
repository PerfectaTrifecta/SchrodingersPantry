import React, { useEffect, useContext } from 'react'
import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';
import { VideoContext } from '../VideoContext';

interface VideoProps {
  mealName : string
}






const VideoModal = ({ mealName } : VideoProps) => {
  const { searchClick, videoId, recipeName, setRecipeName } = useContext(VideoContext);
  console.log(videoId, 'string');
const [show, setShow] = React.useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
// onClick={handleShow}
useEffect(() => {
 setRecipeName(mealName);
 console.log(mealName)
})

return (
  <>
     <IconButton aria-label="tutorial">
          {/* allow users to play most relevant tutorial from youtube */}
          <PlayCircleIcon onClick={ () => {
            //console.log(videoId, 53);
              //setMealName(recipeName);
              handleShow();
              setRecipeName(mealName)
              searchClick();
          }
           
        }/>
        </IconButton>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
<Modal.Body>
  THIS should be the videos video Id, gotten from the axios request
  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

}

//   return (
//     <div>
//      
//     </div>
  
//   )
// }

export default VideoModal;
