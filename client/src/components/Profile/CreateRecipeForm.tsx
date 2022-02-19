import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CreateRecipeForm = () => {

  //on change should update state for given field

  //on submit should send
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Recipe Name" variant="standard" />
      <TextField
          id="outlined-multiline-static"
          label="Ingredients"
          multiline
          rows={4}
          defaultValue=""
        />
         <TextField
          id="outlined-multiline-static"
          label="Directions"
          multiline
          rows={4}
          defaultValue=""
        />
    </Box>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        CREATE
      </Button>
    </CardActions>
  </Card>
    
  );
}
export default CreateRecipeForm;