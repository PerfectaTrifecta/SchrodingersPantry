import React, { useState, useRef } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


type Props = {
  timeOfDay: string;
  setTimeOfDay: (val: string) => void;
}
const TimeOfDayMenu: React.FC<Props> = ({ timeOfDay, setTimeOfDay }) => {

  const [open, setOpen] = useState<boolean>(false);
  
  const handleOpenToggle = () => {
    setOpen((prevState) => !prevState);
  }

  const handleClose = () => {

    setOpen(false);
  }
  return (
    <div>
      
      <div>
        <Button onClick={handleOpenToggle} >
          Select Meal
        </Button>
        <Popper open={open} placement="bottom-start">
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <MenuItem onClick={() => {
                setTimeOfDay('Breakfast');
                setOpen(false);
              }}>Breakfast</MenuItem>
              <MenuItem onClick={() => {
                setTimeOfDay('Lunch');
                setOpen(false);
              }}>Lunch</MenuItem>
              <MenuItem onClick={() => {
                setTimeOfDay('Dinner');
                setOpen(false);
              }}>Dinner</MenuItem>
            </MenuList>
            </ClickAwayListener>
            </Paper>
        </Popper>

      </div>
      <h5>Currently Editing: {timeOfDay}</h5>
    </div>
  )
}

export default TimeOfDayMenu;