import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {Stack, Box } from '@mui/material';

const TOP = () => {
    const navigate = useNavigate();
    return (
    <>
        <Box sx={{
            justify:'center',
            alignItems:"center",
            mt:10,
            mu:20
        }}>
            <img src='https://calligra.design/m/c0126_2/c0126_2_0.svg'></img>
        </Box>
        <Stack
        direction="row" 
        spacing={2} 
        justifyContent="center"
        alignItems="center"
        >
            <Button onClick={() => navigate('/home') } 
                variant="outlined"   
                sx={{
                    width: '15%',
                    color: '#fff',
                    bgcolor:'#000',
                    width: '15%',
                    height:70,
                    fontSize: 24,
                }}>ログイン</Button>
            <Button onClick={() => navigate('/talk',{state:{level:0,img_url:'https://hochi.news/images/2022/12/21/20221221-OHT1I51332-L.jpg'}})} 
                variant="outlined"
                sx={{
                    width: '15%',
                    color: '#000',
                    bgcolor:'#fff',
                    outlineColor :'#000',
                    width: '15%',
                    height:70,
                    fontSize: 24,
                }}>使ってみる</Button>
        </Stack>
    </>
    )
}

export default TOP