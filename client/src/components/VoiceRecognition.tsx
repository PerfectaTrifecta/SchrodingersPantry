import React from "react";

declare const SpeechRecognition: () => void;
declare const SpeechGrammarList: any;
declare const SpeechRecognitionEvent: any;



interface Props {
  readAloud: () => void;
  temporarilyPause: () => void;
  stopAndCancel: () => void;
  
}

const VoiceCommands: React.FC<Props> = ({ readAloud, temporarilyPause, stopAndCancel }) => {
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
  
  const voiceCommands = [ 'start' , 'stop' , ' pause', 'continue', 'read', 'speak', 'start over', 'clear'];
  const grammar = '#JSGF V1.0; grammar commands; public <commands> = ' + voiceCommands.join(' | ') + ' ;'
  
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  const diagnostic = document.querySelector('.output');

  
  const startListen = () => {
    recognition.start();
    console.log('Ready to receive a command.');
  }
  
  recognition.onresult = (event) => {
    if(event.results[0][0].transcript ===  'start' || event.results[0][0].transcript === 'continue' || event.results[0][0].transcript ==='read' || event.results[0][0].transcript === 'speak') {
      readAloud();
    } else if (event.results[0][0].transcript === 'pause') {
      temporarilyPause();
    } else if(event.results[0][0].transcript === 'stop' || event.results[0][0].transcript === 'clear' || event.results[0][0].transcript === 'start over') {
      stopAndCancel();
    }
   
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onnomatch = () => {
    diagnostic.textContent = "I didn't recognize that command.";
  }
  
  recognition.onerror = (event) => {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  }

  return (

      <button onClick={() => {
        startListen();
      }} >Voice Command</button>

  )
}

export default VoiceCommands;
