import {React ,useState} from 'react'
import {Button} from '@aws-amplify/ui-react'

const SPEACH = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition ();

    const [text,setText] = useState('');
    const [recFlag,setRecFlag] = useState(false);
    recognition.lang = "ja";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = ({ results }) => {
        setText(results[0][0].transcript);
    };

    return (
    <>
    <div className="speach-input">
        <button onClick={() =>{recognition.start();setRecFlag(!recFlag)}} disabled={recFlag}>音声入力</button>
        <button onClick={() =>{recognition.stop();setRecFlag(!recFlag)}} disabled={!recFlag}>中止</button>
    </div>
    <p>{text}</p>
    </>
    )
}
export default SPEACH