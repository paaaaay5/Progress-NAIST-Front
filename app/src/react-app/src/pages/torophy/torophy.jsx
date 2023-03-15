import {React, useState, useEffect} from 'react'
import HEADER from '../header/header'
import { API } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import achiveIm from './jisseki.png';
import {Box, Stack,Card,CardContent,Typography,Button,CardActions} from '@mui/material'

const TOROPHY = () => {
  const themes = ['ハッカソン','たけのこの里','きのこの山','NAIST','iphone','Android'];
  const [notes, setNotes] = useState([]);
  const colors = ['#8b4513','#c0c0c0','#ffd700']
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    console.log(apiData.data.listTodos.items)
    setNotes(apiData.data.listTodos.items);
  }

  return (
    <>
      <HEADER/>
      <Stack>
        <Box sx={{justifyContent: 'center',flex:'true',m:'auto'}}>
          <img src={achiveIm} style={{height:150}}></img>
        </Box>
        {/* <Stack direction={'row'} sx={{}}>
          {
            themes.map((note,index) => (
            <Box sx={{width:200, height:500}} key={index}>
              <Card sx={{ml:3}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {note}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {notes.level || '-'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            ))
          }
        </Stack> */}
        <Stack direction={'row'} sx={{m:'auto'}}>
          {
            notes.map((note,index) => (
            <Box sx={{width:200, height:500}} key={index}>
              <Card sx={{ml:3 ,backgroundColor: colors[note.level]}}>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    {note.theme}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {note.level}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            ))
          }
        </Stack>
      </Stack>
    </>
  )
}

export default TOROPHY