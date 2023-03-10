import {Button} from '@aws-amplify/ui-react'
import { React, useState, useRef } from 'react'
import SPEACH from './speach_rec';

const TALK = (props) => {

  const inputEL = useRef(null);
  const themes = ['ハッカソン'];

  const chatSystem = ["あなたは生意気な小学生です。一人称はぼくを使用してください。今からあなたは討論を行います。テーマはハッカソンです。あなたは相手の言うことに対して肯定的であってください。"
                      ,"あなたは生意気な小学生です。一人称はぼくを使用してください。今からあなたは討論を行います。テーマはハッカソンです。あなたは相手の言うことに対して否定的であってください。"]
  const [chatLogs, setChat] = useState([{"role": "system","content": chatSystem[0]}]);
  const [text, setText] = useState('');
  const [res,setRes] = useState('');
  let [cnt,setCnt] = useState(1);
  const [flag,setFlag] = useState(false)
  const [result,setResult] = useState('失敗')

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
        "max_tokens": 150, // 出力される文章量の最大値（トークン数） max:4096
        "temperature": 1.05, // 単語のランダム性 min:0.1 max:2.0
        "top_p": 1, // 単語のランダム性 min:-2.0 max:2.0
        "frequency_penalty": 0.0, // 単語の再利用 min:-2.0 max:2.0
        "presence_penalty": 0.6, // 単語の再利用 min:-2.0 max:2.0
        //"stop": [" Human:", " AI:"] // 途中で生成を停止する単語
      }),
    })
    const data = await response.json()
    //console.log(data)
    setRes(data.choices[0].message.content)
    setCnt(++cnt)
    setChat([...chatLogs, {"role" : "user", "content": inputEL.current.value},
            {"role" : "assistant", "content": data.choices[0].message.content}])

    if (cnt === 5){
      setFlag(true);
      //成功失敗判定を組み込む
      setResult('成功')
    }
  };
  
  const send = () => {
    setText(inputEL.current.value)
    sendPrompt([...chatLogs, {"role" : "user", "content": inputEL.current.value}])
  };

  return (
    <>      
      <h1>TALK</h1>
      <div className="chat-head">
        <p>テーマ : {themes[0]}</p>
        <p>ターン {cnt}/5</p>
      </div>
      <div className="chat-body-left">
        <img src='https://dol.ismcdn.jp/mwimgs/d/5/750/img_88f89f52d1e1833ee8de671a178c006544566.jpg' alt="ひろゆき"></img>
      </div>
      <div className='chat-body-right'>
        <div className="chat-log">
          <p>自分 : {text} </p>
          <p>返信 : {res} </p>
        </div>
        <div className="chat-send">
          <input ref= { inputEL } type="text" />
          <Button onClick={ send }>送信</Button>
          <SPEACH/>
        </div>
      </div>
      <div className="result">
        {!flag ?  (<p></p>) : (<p>結果 : 布教 {result} </p>)}
      </div>
    </>
  )
};

export default TALK;