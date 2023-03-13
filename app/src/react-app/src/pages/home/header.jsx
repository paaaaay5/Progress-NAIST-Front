import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useAuthenticator} from "@aws-amplify/ui-react";

export default function HEADER() {
    const {signOut,user} = useAuthenticator((context) => [
        context.user,
        context.signOut,
    ]);
    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
        <img src='https://calligra.design/m/c0126_2/c0126_2_0.svg' style={{height:30}}></img>
        <Box>
            <Button onClick={() => navigate('/torophy')} color='inherit'>実績</Button>
            <Button onClick={signOut} color='inherit'>サインアウト</Button>
        </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}