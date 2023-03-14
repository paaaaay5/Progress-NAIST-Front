import Button from '@mui/material/Button';
import { React, useState, useRef } from 'react'
// import SPEACH from './speach_rec';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';
import {Grid, Typography} from '@mui/material'
import HEADER from '../header/header';
import { useLocation, useNavigate} from "react-router-dom";
import profilePost from './text2speach';

import resultWinIm from './assets/result_win.png';
import resultLoseIm from './assets/result_lose.png';

const TALK = () => {
  const location = useLocation();
  const level = location.state.level;
  const img_url = location.state.img_url;
  const theme = location.state.theme;
  const navigate = useNavigate();

  const inputEL = useRef(null);
  const chatSystem = ["あなたはクロちゃんです。馬鹿なふりをしてください。今からあなたは"+ theme +"について説得されます。あなたは相手の言うことに対して肯定的であってください。文章は完全であってください。",
                      "あなたはHIKAKINです。普通の人のふりをしてください。あなたの口癖は'ブンブンハローYoutube'です。今からあなたは"+ theme +"について説得されます。あなたは相手の言うことに対して中立的であってください。",
                      "あなたは西村博之です。あなたは揚げ足を取ることが好きです。あなたの口癖は'それってあなたの感想ですよね?','馬鹿なんすね','そういうデータってあるんすか?'です。今からあなたは"+ theme + "について説得されます。あなたは相手の言うことに対して否定的であってください。"]

  const [chatLogs, setChat] = useState([{"role": "system","content": chatSystem[level]}]);
  const [text, setText] = useState('');
  const [res,setRes] = useState('');
  let [cnt,setCnt] = useState(1);
  const [flag,setFlag] = useState(true)
  const [textFlag, setTextFlag] = useState(true)
  const [result,setResult] = useState(false)

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition ();
  const [recFlag,setRecFlag] = useState(false);
  
  recognition.lang = "ja";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = ({ results }) => {
      setText(results[0][0].transcript);
  };

  async function sendPrompt(prompt = []) {
    console.log(prompt)
    let API_KEY = process.env.REACT_APP_API_KEY;
    // promptがない場合
    if (!prompt) return
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        "model": 'gpt-3.5-turbo',
        "messages": prompt,
        "max_tokens": 1000, // 出力される文章量の最大値（トークン数） max:4096
        "temperature": 1.05, // 単語のランダム性 min:0.1 max:2.0
        "top_p": 1, // 単語のランダム性 min:-2.0 max:2.0
        "frequency_penalty": 0.0, // 単語の再利用 min:-2.0 max:2.0
        "presence_penalty": 0.6, // 単語の再利用 min:-2.0 max:2.0
        //"stop": [" Human:", " AI:"] // 途中で生成を停止する単語
      }),
    })
    const data = await response.json()
    setRes(data.choices[0].message.content)
    setChat([...chatLogs, {"role" : "user", "content": inputEL.current.value},
            {"role" : "assistant", "content": data.choices[0].message.content}])
    setTextFlag(false)
    profilePost(data.choices[0].message.content);
  };
  
  const send = () => {
    setTextFlag(true)
    setText(inputEL.current.value);
    setRes('');
    sendPrompt([...chatLogs, {"role" : "user", "content": inputEL.current.value}]);
    setCnt(++cnt);
    if (cnt >= 5){
      setFlag(false);
      //成功失敗判定を組み込む
      //sendPrompt([...chatLogs, {"role" : "user", "content": 'これまでの会話を通してあなたは私の説明に納得しましたか?"はい"か"いいえ"で答えてください'}]);
    }
  };

  const speechSend = () => {
    setTextFlag(true);
    setRes('');
    sendPrompt([...chatLogs, {"role" : "user", "content": text}]);
    setCnt(++cnt);
    if (cnt === 5){
      setFlag(true);
      //成功失敗判定を組み込む
      setResult(false)
    }
  };

  const initState = () => {
    setCnt(0);
    setChat([{"role": "system","content": chatSystem[level]}]);
    setText('');
    setRes('');
    setFlag(!flag);
}

  return (
    <>
      <HEADER/>
      {flag ?(
        <div>
        <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' sx={{'m':'auto', textAlign: 'center',}}>テーマ : {theme}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' sx={{'m':'auto', textAlign: 'center',}}>ターン {cnt}/5</Typography>
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" 
            spacing={2} 
            sx = {{
              height: '100%',
      }}>
        {/* 対話キャラクター */}
        <Box
            sx={{
              bgcolor:'#fff',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              height: '100%',
              width:'80%',
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src= {img_url} style={{width:'100%'}} alt="相手"></img>
        </Box>

        {/* チャット画面 */}
        <Stack direction="column" 
            spacing={0} 
            sx = {{
              width: '90%',
        }}>
          {/* チャットログ */}
          <Box
            sx={{
              bgcolor:'#b0c4de',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              height: 500,
              width:'90%',
              overflow: "hidden",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              {chatLogs.map((value,index) => {
                //プロンプトは非表示
                if (value.role === "system"){
                  return
                }

                //ユーザ側のメッセージ
                if (value.role === 'user'){
                  return (
                  <Stack direction={'row-reverse'}>
                    <Box
                      component="p"
                      sx={{
                        bgcolor:'#90ee90',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        width: 'fit-content',
                        textAlign: 'right'
                      }}
                      key={index}
                    >
                    {value.content} 
                  </Box>
                  </Stack>
                )}

                //chatGPT側のメッセージ
                if (value.role === "assistant"){
                  return  (
                  <Stack direction={'row'}>
                    <Box
                      component="p"
                      sx={{
                        bgcolor:'#f0e68c',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        width: 'fit-content',
                        textAlign: 'left'
                        }}
                      key={index}
                    >
                      {value.content}
                    </Box>
                  </Stack>
              )}
              })}
              {textFlag ? (
                <div>
                  {text ? (
                    <Stack direction={'row-reverse'}>
                      <Box
                        component="p"
                        sx={{
                          bgcolor:'#90ee90',
                          boxShadow: 1,
                          borderRadius: 2,
                          p: 2,
                          width: 'fit-content',
                        }}
                        >{text} 
                      </Box>
                  </Stack>):(
                  <div></div>
                  )}
                  {res ? (
                  <Stack direction={'row'}>
                    <Box
                      component="p"
                      sx={{
                        bgcolor:'#f0e68c',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        width: 'fit-content'}}
                      >
                      {res}
                    </Box>
                  </Stack>):(
                    <div></div>
                  )}
                </div>
              ):(
                <div></div>
                )}
            </div>
        </Box>

        {/* text入力 */}
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%' }}
        >
          <InputBase
            sx={{ ml: 1, 
                flex: 1,}}
            placeholder="メッセージを入力"
            inputProps={{ 'aria-label': 'search google maps' }}
            inputRef={ inputEL }
            onKeyDown={(event) => {
              if (!event.nativeEvent.isComposing  && event.key === 'Enter')
              {
                event.preventDefault();
                send();
              }
            }}
          />
          <IconButton onClick={()=>{send();}} color='primary'>
            <SendIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <div className="voice-input">
                {!recFlag ?(
                    <IconButton onClick={() =>{recognition.start();setRecFlag(!recFlag)}}  color='primary'>
                        <MicIcon />
                    </IconButton>
                ):(
                    <IconButton onClick={() =>{recognition.stop();setRecFlag(!recFlag);speechSend();}}  color='error'>
                        <StopIcon />
                    </IconButton>
                )}
            </div>
        </Paper>
      </Stack>
    </Stack>
        </div>
      ):(
        <div>
          <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            mt:10.
            }}>
            {result ? (
              <img src={resultWinIm} style={{width:'60%'}}></img>
              ):(
              <img src={resultLoseIm} style={{width:'60%'}}></img>
            )}
          </Box>
          <Box sx={{
            justifyContent: 'center',
            display: 'flex',}}>
          <Button onClick={() => navigate('/home') } 
                variant="outlined"   
                sx={{
                    width: '15%',
                    color: '#fff',
                    bgcolor:'#000',
                    height:100,
                    fontSize: 24,
                }}>ホームに戻る</Button>
          </Box>
        </div>
      )}
  </>
  )
};

export default TALK;