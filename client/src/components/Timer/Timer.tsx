import React, {useState}  from 'react';
import moment from 'moment';
 
const Timer = () => {

    const [minutes, setMins] = useState(0);
    const [seconds, setSecs] = useState(0);
    const [newTime, setNewTime] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [minutesRemaining, setMinutesRemaining] = useState(0);


    const test = moment.duration({
      minutes,
      seconds,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
         let milliseconds = test.asMilliseconds();
         const timeKeeper = setInterval(() => {
            milliseconds = milliseconds - 1000;
            setNewTime(milliseconds);
            setMinutesRemaining(Math.floor(milliseconds / 60000));
            setSecondsRemaining(Math.floor(milliseconds % 60000) / 1000);
            if(milliseconds === 0) {
              clearInterval(timeKeeper);
              setMinutesRemaining(0);
              setSecondsRemaining(0);
            }
         }, 1000);

    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>
          minutes :
          <input
            type="text"
            value={minutes}
            size={10}
            onChange={e => setMins(Number(e.target.value))}
          />
        </label><br />
        <label>
          seconds:
          <input
            type="text"
            size={10}
            value={seconds}
            onChange={e => setSecs(Number(e.target.value))}
          ></input>
        </label><br />
        <input type="submit" value="Start Timer"></input>
      </form>
      <h3>Time Remaining: {minutesRemaining}:{secondsRemaining}</h3>
      </div>
    )
}

export default Timer;