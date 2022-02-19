import React from 'react';
import { Checkbox,  FormGroup, FormControlLabel, Grid}from '@mui/material';

const Cuisine = () => {
  return (
      <FormGroup>
    <Grid container>

        <Grid item xs={2}>
            <FormControlLabel control={<Checkbox />} label="african"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="american"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="british"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="cajun"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="carribean"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="chinese"/>
        </Grid>
        <Grid item xs={2}>
            <FormControlLabel control={<Checkbox />} label="eastern european"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="european"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="french"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="german"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="greek"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="indian"/>
        </Grid>
        <Grid item xs={2}>
            <FormControlLabel control={<Checkbox />} label="irish"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="italian"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="japanese"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="jewish"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="korean"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="latin american"/>
        </Grid>
        <Grid item xs={2}>
            <FormControlLabel control={<Checkbox />} label="mediterranean"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="mexican"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="middle eastern"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="nordic"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="southern"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="spanish"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="thai"/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox />} label="vietnamese"/>
        </Grid>
    </Grid>     
      </FormGroup>
  )
 
}

export default Cuisine