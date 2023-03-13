import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@aws-amplify/ui-react";
import HEADER from './header';
import {Stack, Box } from '@mui/material';

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
            <Stack direction='row' sx={{ flexGrow: 1 ,mt:10}} container spacing={2}>
                    {[0, 1, 2].map((value) => (
                    <Stack>
                        <Box key={value} item>
                            <img src = {img_list[value]} style={{width:'100%'}}></img>
                        </Box>
                        <Button onClick={() => navigate('/talk',{level:0})}>{level_list[value]}</Button>
                    </Stack>
                    ))}
            </Stack>
    </>
    )
}

export default HOME