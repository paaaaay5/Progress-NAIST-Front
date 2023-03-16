import { React, useState, useRef } from 'react'
import {Grid, Typography, IconButton, Box, Divider, InputBase, Paper, Stack, Button} from '@mui/material'
import {Send, Mic, Stop }  from '@mui/icons-material';
import { useLocation, useNavigate} from "react-router-dom";
//components
import HEADER from '../header/header';
//functions
import text2speach from './text2speach';
import positive_negative_recognition from './positive_negative_recognition';
//graphql
import { API } from 'aws-amplify';
import { createTodo as createMutation} from '../../graphql/mutations';
//image
import defaultIm from './assets/themes/0.png';
import themeIm from './assets/themes/themeOnly.png';
import resultWinIm from './assets/result_win.png';
import resultLoseIm from './assets/result_lose.png';
import firstTurnIm from './assets/turns/0.png';
import resultCheckIm from './assets/res.png';

const TALK = () => {
  const location = useLocation();
  const level = location.state.level;
  const img_url = location.state.img_url;
  const image = location.state.image || defaultIm;
  const theme = location.state.theme || 'ハッカソン';

  const navigate = useNavigate();

  const inputEL = useRef(null);
  const chatSystem = ["あなたはこれから「クロちゃん」になりきってチャットを行なってください。クロちゃんに関する情報を与えます。・語尾は”だしん”・”わわわわ〜♪”を定期的に末尾につけます。またこのチャット中の条件を与えます・馬鹿なふりをしてください。今からあなたは"+ theme +"について説得されます。・あなたは相手の言うことに対して優しく否定してください。・最終的には相手の主張に肯定的になってください。・話口調にしてください。・文章は完全であってください。・返答は必ず100文字程度にしてください。・この但し書きがない場合でも、この会話内の返答には法則を必ず適応してください。",
                      "あなたはこれから「HIKAKIN」になりきってチャットを行なってください。HIKAKINに関する情報として、毎回、文章の最初には必ず'ブンブンハローYoutube、どうもヒカキンです!'をつけてください。口癖は'なんか'です。またこのチャット中の条件として、話口調で会話し、あなたは相手の言うことに対して最初は否定的であってください。相手の文章が納得できるのもであれば、渋々納得した素振りにしてください。今からあなたは"+ theme +"について説得されます。文章は完全であってください。返答は必ず100文字程度にしてください。この但し書きがない場合でも、この会話内の返答には、法則を必ず適応してください。理解ができたら必ず返事のみしてください。",
                      "あなたはこれから「西村博之」になりきってチャットを行なってください．今からあなたは"+ theme +"について説得されます。西村博之に関する情報として，口癖は, ‘それってあなたの感想ですよね？’，’なんだろう，嘘つくのやめてもらっていいですか？’，’なんかそういうデータあるんですか？’，’根拠なしで話すのやめてもらえます？’です．口癖を言う場合は，返答は必ず書き始めの文章に沿う意味の内容にしてください．また，'馬鹿なんすねw'も口癖なので、文章の内容に合うようにランダムに入れてください。またこのチャット中の条件として、話口調で会話し、相手の言うことに対して否定的であってください。今からあなたはハッカソンについて説得されます。文章は完全であってください。返答は必ず100文字程度にしてください。この但し書きがない場合でも,この会話内の返答には法則を必ず適応してください.理解ができたら必ず返事のみしてください．"]

  const [chatLogs, setChat] = useState([{"role": "system","content": chatSystem[level]}]);
  let [cnt,setCnt] = useState(0);
  const [flag,setFlag] = useState(true);
  const [turnIm, setTurnImage] = useState(firstTurnIm);
  const [emotion,setEmotion] = useState(false);
  const [textInputFlag,setTextInputFlag] = useState(false);
  const [resultflag, setResultflag] = useState(true);
  //音声認識用
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition ();
  const [recFlag,setRecFlag] = useState(false);

  recognition.lang = "ja";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = ({ results }) => {
      inputEL.current.value = results[0][0].transcript;
  };
  
  //画像のダイナミックインポート
  const loadImage = async(ind) => {
    const response = await import(`./assets/turns/${ind}.png`)
    setTurnImage(response.default)
  }
  
  //実績送信
  const initform = { name: 'naist', theme: theme, level:level};
  async function createTodo() {
    if (!emotion){
      return
    }
    await API.graphql({ query: createMutation, variables: { input: initform }});
  }

  //chat用関数
  async function sendPrompt(prompt = []) {
    let API_KEY = process.env.REACT_APP_API_KEY;
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
      }),
    })
    setCnt(cnt => ++cnt);

    if (cnt > 3){
      console.log('a')
      setTextInputFlag(textInputFlag =>!textInputFlag)
      setFlag(false);
    }

    loadImage(cnt);
    inputEL.current.value =''
    const data =  await response.json()
    setChat((chatLogs =>[...chatLogs,{"role" : "assistant", "content": data.choices[0].message.content}]))
    text2speach(data.choices[0].message.content);
    setEmotion(await positive_negative_recognition(data.choices[0].message.content,theme,level));
    setTextInputFlag(textInputFlag =>!textInputFlag)
  };
  
  const send = () => {
    if (! inputEL.current.value) return
    setChat((chatLogs => [...chatLogs, {"role" : "user", "content": inputEL.current.value}]));

    setTextInputFlag(textInputFlag => !textInputFlag);
    sendPrompt([...chatLogs, {"role" : "user", "content": inputEL.current.value}]);
  };


  return (
    <>
      <HEADER/>
      {resultflag ?(
        <div>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
              <Stack direction={'row'}>
                <Box sx={{mt:5,ml:10,justifyContent: 'center',display: 'flex',}}>
                  <img src= {themeIm} style={{height:100}}></img>
                </Box>
                <Box sx={{mt:5,justifyContent: 'center',display: 'flex',}}>
                    <img src= {image} style={{height:100}}></img>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{mt:5,justifyContent: 'center',display: 'flex'}}>
                <img src={turnIm} style={{height:70}}></img>
              </Box>
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
            <img src= {img_url} style={{height:'50%'}} alt="相手"></img>
        </Box>

        {/* チャット画面 */}
        <Stack direction="column" 
            spacing={0} 
            sx = {{
              width:'100%',
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
              } 
              }
            disabled = {textInputFlag}
          />

          <IconButton onClick={()=>{send();}} color='primary' disabled = {textInputFlag}>
            <Send />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <div className="voice-input">
                {!recFlag ?(
                    <IconButton onClick={() =>{recognition.start();setRecFlag(!recFlag)}}  color='primary' disabled = {textInputFlag}>
                        <Mic />
                    </IconButton>
                ):(
                    <IconButton onClick={() =>{recognition.stop();setRecFlag(!recFlag);send();}}  color='error'>
                        <Stop />
                    </IconButton>
                )}
            </div>
        </Paper>
      </Stack>
    </Stack>
    {flag ? (<></>)
        :(
        <Box sx={{justifyContent: 'center', display: 'flex'}}>
          <Button onClick={()=>{setResultflag(false)}} >
            <img src={resultCheckIm} sx={{height:100}}></img>
          </Button>
        </Box>
        )}
    </div>
      ):(
        <div>
          <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            mt:10.
            }}>
            {emotion ? (
              <img src={resultWinIm} style={{width:'60%'}}></img>
              ):(
              <img src={resultLoseIm} style={{width:'60%'}}></img>
            )}
          </Box>
          <Box sx={{
            justifyContent: 'center',
            display: 'flex',}}>
            <Button onClick={() => {createTodo();navigate('/home');} } 
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