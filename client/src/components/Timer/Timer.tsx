import React, {useState}  from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
 
const Timer = () => {

    const [minutes, setMins] = useState(0);
    const [seconds, setSecs] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [minutesRemaining, setMinutesRemaining] = useState(0);
    const [alarm, setAlarm] = useState(false);
    const audio = new Audio('http://starmen.net/mother2/music/005-%20Earthbound%20-%20Opening%20Credits.mp3');

    if(alarm === true) {
      audio.play();
    }

    const test = moment.duration({
      minutes,
      seconds,
    });

    const timerClear = (e: any) => {
      e.preventDefault();
      setAlarm(false);
      setMinutesRemaining(0);
      setSecondsRemaining(0);
      audio.pause();
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
         let milliseconds = test.asMilliseconds();
         const timeKeeper = setInterval(() => {
            milliseconds = milliseconds - 1000;
            setMinutesRemaining(Math.floor(milliseconds / 60000));
            setSecondsRemaining(Math.floor(milliseconds % 60000) / 1000);
            if(milliseconds === 0) {
              clearInterval(timeKeeper);
              setMinutesRemaining(0);
              setSecondsRemaining(0);
              setAlarm(true);
            }
          }, 1000);
    }

    return (
      <div id="timerDiv">
        <form onSubmit={handleSubmit}>
        <label id="timer">
          MM/SS </label>
        <br />
        <div id="timerForm">
          <input
            type="text"
            value={minutes}
            size={3}
            onChange={e => setMins(Number(e.target.value))}
          />
       
        <label>:</label>
          <input
            type="text"
            size={3}
            value={seconds}
            onChange={e => setSecs(Number(e.target.value))}
          ></input>
        </div>
          
        <br />
        <Button id ="timerButton" variant="contained" onClick={handleSubmit}>Start Timer</Button>
        <h4 id="timeRemaining">Time Remaining:</h4>
        <div id="timerCountdown">
          {/* //displays zeroes before numbers less than 10 */}
          {(minutesRemaining < 10 && secondsRemaining < 10) ? (<div>0{minutesRemaining}:0{secondsRemaining}</div>) 
          : (minutesRemaining < 10) ? (<div>0{minutesRemaining}:{secondsRemaining}</div>) 
          : (<div>{minutesRemaining}:{secondsRemaining}</div>) }
        </div>
        {(alarm) ? <Button id="alarmStop" variant='contained' onClick={timerClear} >Stop Alarm</Button> : null}
        
      </form>
      
      </div>
    )
}

export default Timer;