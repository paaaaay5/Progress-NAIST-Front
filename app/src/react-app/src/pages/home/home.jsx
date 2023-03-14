import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@aws-amplify/ui-react";
import HEADER from '../header/header';
import {Stack, Box } from '@mui/material';
import chalengerIm from './assets/chalenger.png';
import selectIm from './assets/select_level.png';

const HOME = () => {
    const navigate = useNavigate();
    const level_list = ['初級','中級','上級']
    const img_list = ['https://hochi.news/images/2022/12/21/20221221-OHT1I51332-L.jpg',
                        'https://pbs.twimg.com/profile_images/1476938674612805637/Z9-fGmey_400x400.jpg',
                        'https://dol.ismcdn.jp/mwimgs/d/5/750/img_88f89f52d1e1833ee8de671a178c006544566.jpg']
    return (
    <>
        <HEADER/>
        {/* <h2>ようこそ{user.username}さん</h2> */}
        <Box sx={{mt:5}}>
            <img src = {chalengerIm} style={{height:80}}></img>
        </Box>
        <Box sx={{mt:1,justifyContent: 'center',display: 'flex',}}>
            <img src = {selectIm} style={{height:80}}></img>
        </Box>
        <Stack direction='row' sx={{ flexGrow: 1 ,mt:5, justifyContent: 'center',display: 'flex',}} container spacing={2}>
                {[0, 1, 2].map((value) => (
                <Stack>
                    <Box key={value} item>
                        <img src = {img_list[value]} style={{height:300}}></img>
                    </Box>
                    <Button onClick={() => navigate('/talk',{state:{level:value,img_url:img_list[value]}})}>{level_list[value]}</Button>
                </Stack>
                ))}
        </Stack>
    </>
    )
}

export default HOME