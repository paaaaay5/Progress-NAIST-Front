import React, { ChangeEvent, useState } from 'react'
import superagent from 'superagent'

const AUDIO = () => {
  const [inputText, setInputText] = useState('')
  const [queryJson, setQueryJson] = useState()
  const [audioData, setAudioData] = useState()

  // 文字列からQueryを作り出す
  const createQuery2 = async () => {
    const res = await fetch('https://20.191.178.147:50021/audio_query?text=' + inputText + "&speaker=1",{
      method: 'POST',
      mode: 'cors',
      credentials: "include",
      headers:{
        'Content-Type': 'application/json',
      }
    }
    )
    console.log(res)
    setQueryJson(res.body)
  }

  // Queryから合成音声を作り出す
  const createVoice = async () => {
    const res = await superagent
      .post('https://20.191.178.147:50021/synthesis')
      .query({ speaker: 1 })
      .send(queryJson)
      .responseType('blob')

    if (!res) return

    setAudioData(res.body)
  }

  return (
    <div className='AUDIO-header'>
      <div>
        <h2>読み上げたい文章を入力</h2>
        <textarea 
          value={inputText}
          onChange={
            (e) => setInputText(e.target.value)
          }
        />
      </div>

      {inputText ? (
        <div>
          <p>↓</p>
          <h2>文章からクエリデータを作成</h2>
          <button  onClick={createQuery2}>クエリ作成</button>
        </div>
      ) : null}

      {queryJson ? (
        <div>
          <p>↓</p>
          <h2>クエリデータから音声を合成</h2>
          <button onClick={createVoice}>音声合成</button>
        </div>
      ) : null}
      
      {audioData ? (
        <div>
          <p>↓</p>
          <h2>返却された音声ファイルを再生</h2>
          <audio
            controls
            src={audioData ? window.URL.createObjectURL(audioData) : undefined}>
          </audio>
        </div>
      ) : null}
    </div>
  )
}

export default AUDIO