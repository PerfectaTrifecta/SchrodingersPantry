
//this component will render a container with a list of the users created Recipes by name, that render a modal on click
//using user context, make get request to server for users created recipes, 
//display a container with links to recipe view
import  React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { orange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

//-----for card chevron expansion functionality-----/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//-----------------------------------------------------//


type CreationProps = {
  id: number;
  user_id: string;
  title: string;
  ingredients: string;
  instructions: string;
  vote_count: number;
  comment_count: number;
}

const myRecipe: React.FC<CreationProps> = (creation) => {

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };

  return (
    <Card 
    sx={{ maxWidth: 345 }}
    style={{
      alignContent: 'space around',
      justifyContent: 'space-evenly',
      margin: '16px',
      maxWidth: '600px',
      width: '90%',
    }} 
    >
      <CardHeader 
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${creation.title}`}
      />
      {/* <CardMedia
          component='img'
          height='194'
          image={ add images to createRecipeForm, make a get req and render them here}
      /> */}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
        {/* {add tags to createRecipeForm and render the tags for the current recipe id here} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='share'>
          {/* allow users to send to friends */}
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients: </Typography>
          {`${creation.ingredients}`}
          <Typography paragraph>Instructions: </Typography>
          {creation.instructions.split('\n').map((p, i) => (
            <Typography paragraph key={p + i}>
              {p}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )

}

export default myRecipe;
