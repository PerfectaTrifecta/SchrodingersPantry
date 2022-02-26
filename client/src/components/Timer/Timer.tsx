import React, {useState}  from 'react';
import moment from 'moment';
 
const Timer = () => {

    const [minutes, setMin] = useState("");
    const [newTime2, setNewTime] = useState(1000);

    const handleSubmit = (e) => {
        e.preventDefault();
        let test = moment.duration({
          minutes: 0,
          seconds: 5,
        });
         let seconds = test.asMilliseconds();
         setInterval(() => {
             seconds = seconds - 1000;
             if(newTime2 === 0){
               clearInterval();
             } else {
               setNewTime(seconds);
               console.log('CountDown', seconds) //if this === oldTime, then stop
             }
         }, 1000);

    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>
          minute:
          <input
            type="text"
            value={minutes}
            onChange={e => setMin(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
}

export default Timer;