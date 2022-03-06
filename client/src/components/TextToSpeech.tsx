import React, { useState } from 'react';

type instProps = {
  instructions: string[];
}

const TextToSpeech: React.FC<instProps> = ({ instructions }) => {

const [step, setStep] = useState({ index: 0 });

  const synth = window.speechSynthesis;

  const readAloud = () => {
    if(synth.paused) {
      synth.resume();
    }
    
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    
    
    if (instructions.length > 0) {
      const utterThis = new SpeechSynthesisUtterance(instructions[step.index]);
      utterThis.onend = () => {
          setStep(previous => ({index: previous.index += 1}));
        }
        utterThis.onerror = () => {
          console.error('SpeechSynthesisUtterance.onerror');
        }
        synth.speak(utterThis);
    }
  }

  const temporarilyPause = () => {
    if(!synth.paused) {
      synth.pause();
    } else if(synth.paused) {
      synth.resume();
    }
  }

  const stopAndCancel = () => {
    synth.cancel();
    setStep({index: 0})
  }

  return (
  <div>
    <button onClick={()=> {
      readAloud();
    }}>Start</button>
    <button onClick={() => {
      temporarilyPause();
    }}>Pause</button>
    <button onClick={() => {
      stopAndCancel();
    }}>Stop</button>
  </div>
  )
}

export default TextToSpeech;
