import {Button} from '@aws-amplify/ui-react'
import { React, useState, useRef } from 'react'
const TALK = () => {

  const inputEL = useRef(null);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([{"role": "system", "content": "あなたは生意気な小学生です。会話には適当に返信してください。"},]);
  const [res,setRes] = useState('')
  
  async function sendPrompt(prompt = []) {
    let API_KEY = ''
  
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
        "max_tokens": 100, // 出力される文章量の最大値（トークン数） max:4096
        "temperature": 1, // 単語のランダム性 min:0.1 max:2.0
        "top_p": 1, // 単語のランダム性 min:-2.0 max:2.0
        "frequency_penalty": 0.0, // 単語の再利用 min:-2.0 max:2.0
        "presence_penalty": 0.6, // 単語の再利用 min:-2.0 max:2.0
        //"stop": [" Human:", " AI:"] // 途中で生成を停止する単語
      }),
    })
    const data = await response.json()
    //console.log(data)
    console.log(prompt)
    setRes(data.choices[0].message.content)
    setChat([...chat, {"role" : "user", "content": inputEL.current.value},
            {"role" : "assistant", "content": data.choices[0].message.content}])
  };
  
  const send = () => {
    setText(inputEL.current.value)
    sendPrompt([...chat, {"role" : "user", "content": inputEL.current.value}])
  };


  return (
    <>
      <h1>TALK</h1>
      <input ref= { inputEL } type="text" />
      <Button onClick={ send }>送信</Button>
      <p>自分 : {text} </p>
      <p>返信 : {res} </p>
    </>
  )
};

export default TALK;