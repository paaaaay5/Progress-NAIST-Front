import Button from '@mui/material/Button';
import { React, useState, useRef } from 'react'
import SPEACH from './speach_rec';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const TALK = (props) => {

  const inputEL = useRef(null);
  const themes = ['ハッカソン'];

  const chatSystem = ["今からあなたは説得されます。あなたは相手の言うことに対して肯定的であってください。"
                      ,"今からあなたは説得されます。あなたは相手の言うことに対して否定的であってください。"]
  const [chatLogs, setChat] = useState([{"role": "system","content": chatSystem[1]}]);
  const [text, setText] = useState('');
  const [res,setRes] = useState('');
  let [cnt,setCnt] = useState(1);
  const [flag,setFlag] = useState(false)
  const [result,setResult] = useState('失敗')

  async function sendPrompt(prompt = []) {
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
        "max_tokens": 150, // 出力される文章量の最大値（トークン数） max:4096
        "temperature": 1.05, // 単語のランダム性 min:0.1 max:2.0
        "top_p": 1, // 単語のランダム性 min:-2.0 max:2.0
        "frequency_penalty": 0.0, // 単語の再利用 min:-2.0 max:2.0
        "presence_penalty": 0.6, // 単語の再利用 min:-2.0 max:2.0
        //"stop": [" Human:", " AI:"] // 途中で生成を停止する単語
      }),
    })

    const data = await response.json()
    console.log(data)
    setRes(data.choices[0].message.content)
    setChat([...chatLogs, {"role" : "user", "content": inputEL.current.value},
            {"role" : "assistant", "content": data.choices[0].message.content}])
  };
  
  const send = () => {
    setText(inputEL.current.value);
    sendPrompt([...chatLogs, {"role" : "user", "content": inputEL.current.value}]);
    setCnt(++cnt);
    if (cnt === 5){
      setFlag(true);
      //成功失敗判定を組み込む
      setResult('成功')
    }
  };

  const initState = () => {
    setCnt(0);
    setChat([{"role": "system","content": chatSystem[1]}]);
    setText('');
    setRes('');
    setFlag(!flag);
}

  return (
    <>      
      <div className="chat-head">
        <h1>テーマ : {themes[0]}</h1>
        <h2>ターン {cnt}/5</h2>
      </div>
      <Stack direction="row" spacing={2}>
        <div className="chat-body-left" style={{height:'80%',}}>
          {/* <img src='https://dol.ismcdn.jp/mwimgs/d/5/750/img_88f89f52d1e1833ee8de671a178c006544566.jpg' alt="ひろゆき"></img> */}
        </div>
        <div className='chat-body-right' style={{width:'100%'}}>
          <Box
            sx={{
              bgcolor:'#b0c4de',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
              height: '90%',
              width:'80%',
            }}
          >
            <div className="chat-log">
              <Box
                component="p"
                  sx={{
                    bgcolor:'#90ee90',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    width: 'fit-content',
                    justifyContent: 'flex-end',
                  }}>{text} 
                </Box>
              <Box
              component="p"
              sx={{
                bgcolor:'#f0e68c',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                width: 'fit-content',
                justifyContent: 'flex-start',
              }}>
                {res}
              </Box>
            </div>
            
          </Box>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
          >
            <InputBase
              sx={{ ml: 1, 
                  flex: 1,}}
              placeholder="メッセージを入力"
              inputProps={{ 'aria-label': 'search google maps' }}
              inputRef={ inputEL }
            />
            <IconButton onClick={ send }  color='primary'>
              <SendIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <SPEACH/>
        </Paper>

        
        </div>
      </Stack>
      <div className="result">
        {!flag ?  (<p></p>) 
          : (
          <>
            <p>結果 : 布教{result} </p>
            <Button onClick={ initState }>やり直す</Button>
          </>
          )}
      </div>
    </>
  )
};

export default TALK;