import {React, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {Stack, Box, Button,Typography,IconButton, Menu, MenuItem} from '@mui/material';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';

import HEADER from '../header/header';

import chalengerIm from './assets/chalenger.png';
import selectIm from './assets/select_level.png';
import easyIM from './assets/biginer.png';
import normalIM from './assets/nomal.png';
import hardIM from './assets/hard_black.png';
import startIM from './assets/start.png';


const HOME = () => {
    const navigate = useNavigate();
    const img_list = ['https://dic.nicovideo.jp/oekaki/836138.png',
                    'https://hochi.news/images/2022/12/21/20221221-OHT1I51332-L.jpg',
                    'https://dol.ismcdn.jp/mwimgs/d/5/750/img_88f89f52d1e1833ee8de671a178c006544566.jpg'];
    const level_img = [easyIM,normalIM,hardIM];
    const themes = ['ハッカソン','たけのこの里','きのこの山','NAIST','iphone','Android'];
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [value,setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [theme,setTheme] = useState('');
    const [ThemeFlag,setThemeFlag] = useState(false);

    const anchorEl = useRef(null);
    // メニュー開閉ハンドル
    const handleClick = () => {
        setOpen(!open);
    };
    // メニューを閉めるハンドル
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <>
        <HEADER/>
        <Box sx={{mt:5}}>
            <img src = {chalengerIm} style={{height:80}}></img>
        </Box>
        <Box sx={{mt:1,justifyContent: 'center',display: 'flex',}}>
            <img src = {selectIm} style={{height:80}}></img>
        </Box>
        <Stack direction='row' sx={{ flexGrow: 1 ,mt:5, justifyContent: 'center',display: 'flex',}} container spacing={2}>
                {[0, 1, 2].map((value) => (
                <Stack>
                    <Button onClick={() => {setEditModalIsOpen(true);setValue(value);}}>
                        <img src= {level_img[value]} style={{height:100}}></img>
                    </Button>
                    <Button onClick={() => {setEditModalIsOpen(true);setValue(value);}} key={value}>
                        <img src = {img_list[value]} style={{height:300}}></img>
                    </Button>
                </Stack>
                ))}
        </Stack>

        {/* モーダルウインドウ */}
        <Modal isOpen={editModalIsOpen}>
            <Stack direction={'row-reverse'}>
                <IconButton onClick={() => {setEditModalIsOpen(false);}}>
                    <CloseIcon/>
                </IconButton>
            </Stack>
            <Typography variant='h3' sx={{textAlign:'center'}}>討論テーマを選べ！！</Typography>
            <Stack direction={'row'} sx= {{mt:10}}>
                <Button         
                    ref={anchorEl}
                    variant="contained"
                    onClick={()=>{
                        handleClick();}}
                    sx={{ m: 5 }}>
                <img src='https://calligra.design/m/c0092_12/c0092_12_0.svg' style={{height:100}}></img>
                </Button>
                <Menu
                    anchorEl={anchorEl.current}
                    open={open}
                    disableAutoFocusItem={false} // Falseだと、メニューを開いた時にメニューアイテムがフォーカスの対象になる
                    autoFocus={false} // Trueだとメニューが開いた時に一番上のメニューアイテムのオートフォーカスされる
                    onClose={handleClose} // 主にメニューを閉めたいときに発生するイベント
                    keepMounted // Trueにすると、メニューが閉じている状態でもメニューのノードが存在するようになる
                    transitionDuration={"auto"} // メニューの開閉のアニメーション速度を設定できる
                    sx={{}}
                    anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                    }} // 紐づけたHTML要素のどこを標準位置にしてメニューを配置するか設定できる
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                    }}// メニューの起点を設定できる。アニメーションもこの起点から生えるように出現する
                    MenuListProps={{}} // Menuコンポーネント内部で使用されているMenuListコンポーネントのPropsを変更できる
                    PaperProps={{
                    // PaperProps.elevationはメニューのシャドーを調整できる（超重要！）
                    elevation: 3
                    }} // Menuコンポーネント内部で使用されているPaperコンポーネントのPropsを変更できる
                >
                    {
                    themes.map((value)=> (
                        <MenuItem onClick={()=>{handleClose();setTheme(value);setThemeFlag(true)}}>{value}</MenuItem>
                        ))
                    }
                </Menu>

                <img src='https://calligra.design/m/c0085_10/c0085_10_0.svg' style={{height:200}}></img>

            </Stack>
            {!ThemeFlag ? (<></>):
                (<Box sx={{mt:10,justifyContent: 'center',display: 'flex',}}>
                    <Button onClick={() => { 
                        navigate('/talk',{state:{level:value, img_url:img_list[value],theme:theme}})}} 
                        sx={{backgroundColor:'#000'}}>
                    <img src={startIM} style={{width:300}}></img>
                    </Button>
                </Box>)}
        </Modal>
    </>
    )
}

export default HOME