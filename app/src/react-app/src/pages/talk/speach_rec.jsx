import {React ,useState} from 'react'
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';

const SPEACH = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition ();

    const [text,setText] = useState('None');
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
        <div className="voice-input">
            {!recFlag ?(
                <IconButton onClick={() =>{recognition.start();setRecFlag(!recFlag)}}  color='primary'>
                    <MicIcon />
                </IconButton>
            ):(
                <IconButton onClick={() =>{recognition.stop();setRecFlag(!recFlag)}}  color='error'>
                    <StopIcon />
                </IconButton>
            )}
        </div>
    </div>
    </>
    )
}
export default SPEACH