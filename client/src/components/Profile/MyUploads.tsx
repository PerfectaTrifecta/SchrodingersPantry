import React, { useContext }from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../UserContext';


const MyUploads = (): JSX.Element => {

  //const [uploads, setUploads] = useContext(UserContext);
const uploads: any[] = [];
  //take user uploads from state in context
  //map through and create a box that holds the videoURL and cloudinary support



  return (
    <div className="uploads-container">
      <h1>My Uploads</h1>
      {uploads.length ? uploads.map((upload : any) => {
        return(
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {upload.recipeName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {upload.date}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Fullscreen</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
        )
      }) : 
      <h2>You haven't uploaded any items</h2>}
    </div>
    
  );

}

export default MyUploads;
