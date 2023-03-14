export default async function profilePost (text){
  const API_KEY = 'AIzaSyB_j_k3enQCD9SpAkccM8UVqAG8AkAwcho'
  const url = 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + API_KEY;
  const data = {
    "input": {
      "text": text
    },
    "voice": {
      "languageCode": "ja-JP",
      "name": "ja-JP-Neural2-D"
    },
    "audioConfig": {
      "audioEncoding": "MP3",
      "speaking_rate": "1.4",
      "pitch" : "14.4",            
    }
  }

  const otherparam={
    headers: {
      "content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
    method: "POST"
  }

  await fetch(url, otherparam)
  .then(data=>{return data.json()})
  .then(res=>{
    try {
      var blobUrl = base64ToBlobUrl(res.audioContent)
      var audio = new Audio()
      console.log(1)
      audio.src = blobUrl
      audio.play()
    } catch(e) {
      console.log(e)
    }
  })
  .catch(error=>alert(error))  
}

function base64ToBlobUrl(base64) {
  var bin = atob(base64.replace(/^.*,/, ''))
  var buffer = new Uint8Array(bin.length)
  for (var i = 0; i < bin.length; i++ ) {
    buffer[i] = bin.charCodeAt(i)
  }
  return window.URL.createObjectURL(new Blob([buffer.buffer], {type: "audio/wav"}))
}