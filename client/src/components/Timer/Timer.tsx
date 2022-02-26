import React from 'react'
import { useState, useEffect } from 'react';

const Timer: React.FC = () => {

  
  const [ minutes, setMinutes ] = useState(0);
  const [seconds, setSeconds ] =  useState(0);

  const startTimer = () => {
      const int = setInterval(() => {
              if (seconds > 0) {
                  setSeconds(seconds - 1);
              }
              if (seconds === 0) {
                  if (minutes === 0) {
                      clearInterval(int)
                  } else {
                      setMinutes(minutes - 1);
                      setSeconds(59);
                  }
              }
          }, 1000)
          return ()=> {
              clearInterval(int);
          };
  }


  const onMinChange = (e: any) => {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         setMinutes(e.target.value);
          }
  }
  
 useEffect(() => {
     startTimer();
 })

  const onSecChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       setSeconds(e.target.value);
        }
}

          
    return (
        <div>
          <h1>Set A Timer: </h1>
          <input type='text' onChange={onMinChange} />
          <input type='text' onChange={onSecChange} />
          <button onClick={startTimer}>Start</button>
          
        { minutes === 0 && seconds === 0
            ? <h1>Food is Ready!</h1>
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;