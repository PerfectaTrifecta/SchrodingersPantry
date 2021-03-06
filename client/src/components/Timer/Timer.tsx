import React, { useState } from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';

const Timer = () => {
  const theme = useTheme();

  const [minutes, setMins] = useState(0);
  const [seconds, setSecs] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [alarm, setAlarm] = useState(false);
  const audio = new Audio(
    'http://starmen.net/mother2/music/021-%20Earthbound%20-%20Sunrise%20&%20Onett%20Theme.mp3'
  );

  if (alarm === true) {
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
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let milliseconds = test.asMilliseconds();
    const timeKeeper = setInterval(() => {
      milliseconds = milliseconds - 1000;
      setMinutesRemaining(Math.floor(milliseconds / 60000));
      setSecondsRemaining(Math.floor(milliseconds % 60000) / 1000);
      if (milliseconds === 0) {
        clearInterval(timeKeeper);
        setMinutesRemaining(0);
        setSecondsRemaining(0);
        setAlarm(true);
      }
    }, 900);
  };

  return (
    <div
      id='timerDiv'
      style={{
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      }}
    >
      <form onSubmit={handleSubmit}>
        <label id='timer'>MM/SS </label>
        <br />
        <div id='timerForm'>
          <input
            type='text'
            value={minutes}
            size={3}
            onChange={(e) => setMins(Number(e.target.value))}
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          />

          <label>:</label>
          <input
            type='text'
            size={3}
            value={seconds}
            onChange={(e) => setSecs(Number(e.target.value))}
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          ></input>
        </div>

        <br />
        <Button
          id='timerButton'
          variant='contained'
          onClick={handleSubmit}
          style={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
          }}
        >
          Start Timer
        </Button>
        <h4 id='timeRemaining'>Time Remaining:</h4>
        <div id='timerCountdown'>
          {/* //displays zeroes before numbers less than 10 */}
          {minutesRemaining < 10 && secondsRemaining < 10 ? (
            <div>
              0{minutesRemaining}:0{secondsRemaining}
            </div>
          ) : minutesRemaining < 10 ? (
            <div>
              0{minutesRemaining}:{secondsRemaining}
            </div>
          ) : (
            <div>
              {minutesRemaining}:{secondsRemaining}
            </div>
          )}
        </div>
        {alarm ? (
          <Button id='alarmStop' variant='contained' onClick={timerClear}>
            Stop Alarm
          </Button>
        ) : null}
      </form>
    </div>
  );
};

export default Timer;
