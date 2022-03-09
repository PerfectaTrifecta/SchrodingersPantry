import React, {useState}  from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
 
const Timer = () => {

    const [minutes, setMins] = useState(0);
    const [seconds, setSecs] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [minutesRemaining, setMinutesRemaining] = useState(0);


    const test = moment.duration({
      minutes,
      seconds,
    });


    const handleSubmit = (e: any) => {
        e.preventDefault();

   
         let milliseconds = test.asMilliseconds();
         const timeKeeper = setInterval(() => {
            milliseconds = milliseconds - 1000;
            setMinutesRemaining(Math.floor(milliseconds / 60000));
            setSecondsRemaining(Math.floor(milliseconds % 60000) / 1000);
            if(milliseconds === 0) {
              const mp3_url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';

              
              alert("Cooking Time Is Up!");
              clearInterval(timeKeeper);
              setMinutesRemaining(0);
              setSecondsRemaining(0);
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
      </form>
      
      </div>
    )
}

export default Timer;