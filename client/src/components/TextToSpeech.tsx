import React, { useState } from 'react';
import VoiceCommands from './VoiceRecognition';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
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
  <div id="TTSDiv">
    <PlayCircleFilledIcon id="TTSButtons" fontSize="large" onClick={()=> {
      readAloud();
    }} />
    <PauseCircleFilledIcon id="TTSButtons" fontSize="large" onClick={() => {
      temporarilyPause();
    }} />
    <StopCircleIcon id="TTSButtons" fontSize="large" onClick={() => {
      stopAndCancel();
    }} /><br />
    <VoiceCommands readAloud={readAloud} temporarilyPause={temporarilyPause} stopAndCancel={stopAndCancel}/>
  </div>
  )
}

export default TextToSpeech;
