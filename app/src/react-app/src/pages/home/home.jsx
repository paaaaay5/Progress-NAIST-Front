import {React, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {Stack, Box, Button,Typography,IconButton, Menu, MenuItem, Grid} from '@mui/material';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';

import HEADER from '../header/header';

import chalengerIm from './assets/chalenger.png';
import selectIm from './assets/select_level.png';
import easyIM from './assets/biginer.png';
import normalIM from './assets/nomal.png';
import hardIM from './assets/hard_black.png';
import startIM from './assets/start.png';
import selectThemeIm from './assets/choose.png'
import themeIm from './assets/themes/themeOnly.png';
import CircularProgress from '@mui/material/CircularProgress';

const HOME = () => {
    const navigate = useNavigate();
    const img_list = ['https://1.bp.blogspot.com/--c0K8UbKthw/USSkrgcx9EI/AAAAAAAANWI/wSq7qttn9Lg/s400/hiyoko.png',
                    'https://2.bp.blogspot.com/-v5ZQsLqjzp4/W3abLWfpDzI/AAAAAAABN_Q/zrk9tPTZ7qEYrk-Vpd0iHhT8Dd6vwHG5QCLcBGAs/s300/dog3_4_tehe.png',
                    'https://1.bp.blogspot.com/-xihtSBkTelA/YMVaXFmp71I/AAAAAAABd4E/XnKUTf9qc9EsC68ovza2txUtI19N19NNQCNcBGAsYHQ/s450/animal_lion.png'];

    const level_img = [easyIM,normalIM,hardIM];
    const themes = ['ハッカソン','たけのこの里','きのこの山','NAIST','iphone','Android'];
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [value,setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [theme,setTheme] = useState('');
    const [load, setLoad] = useState(false);
    
    const [ThemeFlag,setThemeFlag] = useState(false);
    const anchorEl = useRef(null);
    const [image, setImage] = useState(null)

    // useEffect(()=>{
    //     setTimeout(()=>{setLoad(false)},300)
    //     // setLoad(false)
    // },[])

    //画像のダイナミックインポート
    const loadImage = async(ind) => {
        const response = await import(`./assets/themes/${ind}.png`)
        setImage(response.default)
    }

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

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx={{mt:10,ml:10,justifyContent: 'center',display: 'flex',}}>
                            <img src= {themeIm} style={{height:200}}></img>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {/* テーマ画像 */}
                    {!ThemeFlag ? (
                        <image src= '' style={{height:200}}></image>)
                        :(
                        <Box sx={{mt:10,justifyContent: 'center',display: 'flex',}}>
                            <img src= {image} style={{height:200}}></img>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={3}>
                    {/* 選択画像 */}
                <Box>
                    <Button         
                        ref={anchorEl}
                        onClick={()=>{
                            handleClick();}}
                        sx={{ mt: 10 }}>
                        <img src = {selectThemeIm} style={{height:100}}></img>
                    </Button>
                </Box>
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
                        themes.map((value,index)=> (
                            <MenuItem onClick={() => {
                                handleClose();
                                setThemeFlag(true);
                                loadImage(index);
                                setTheme(themes[index]);}}>
                            {value}
                            </MenuItem>
                            ))
                        }
                    </Menu>
                </Grid>
            </Grid>
    
            <Stack direction={'row'} sx= {{mt:10}}>
            </Stack>
            {/* スタートボタン */}
            {!ThemeFlag ? (<></>):
                (<Box sx={{mt:10,justifyContent: 'center',display: 'flex',}}>
                    <Button onClick={() => { 
                        navigate('/talk',{state:{level:value, img_url:img_list[value],image:image,theme:theme}})}} 
                        sx={{backgroundColor:'#000'}}>
                    <img src={startIM} style={{width:300}}></img>
                    </Button>
                </Box>)}
        </Modal>
    </>
    )
}

export default HOME