import superagent from 'superagent'

  const createQuery = async (text='デフォルト') => {
    const res = await superagent
      .post('https://vvox.azurewebsites.net/audio_query')
      .query({ speaker: 1, text: text })
    if (!res) return
    return res.body
  }

  const createVoice = async (queryJson) => {
    const res = await superagent
      .post('https://vvox.azurewebsites.net/synthesis')
      .query({ speaker: 1 })
      .send(queryJson)
      .responseType('blob')
    if (!res) return
    return res.body
  }

  const playmusic = (audioData) => {
    const music = new Audio();
    music.src = window.URL.createObjectURL(audioData);
    music.play();
  }

  export default function text2Zundamon (text){
    if (!text) return
    createQuery(text).then((res)=>{createVoice(res).then((res)=>{playmusic(res)})})
    }