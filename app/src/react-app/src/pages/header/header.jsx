import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useAuthenticator} from "@aws-amplify/ui-react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import { API } from 'aws-amplify';

export default function HEADER() {
    const {signOut,user} = useAuthenticator((context) => [
        context.user,
        context.signOut,
    ]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
      setAnchorEl(null);
    }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
        <Button onClick={()=> navigate('/')}>
          <img src='https://calligra.design/m/c0126_2/c0126_2_0.svg' style={{height:30}}></img>
        </Button>
        { user && (
        <Box sx={{'ml':'auto'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{navigate('/torophy')}}>実績</MenuItem>
              <MenuItem onClick={signOut}>サインアウト</MenuItem>
            </Menu>
          </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}