declare class webkitSpeechRecognition extends SpeechRecognition {}

export default typeof SpeechRecognition === "undefined"
  ? webkitSpeechRecognition
  : SpeechRecognition;
