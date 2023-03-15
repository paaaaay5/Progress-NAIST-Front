import React from 'react'
import HEADER from '../header/header'
//import { createTodo as createMutation, deleteTodo as deleteMutation } from '../../graphql/mutations';
import { Box}  from '@mui/material'
import positive_negative_recognition from '../talk/positive_negative_recognition'
// async function fetchNotes() {
//   const apiData = await API.graphql({ query: listNotes });
//   setNotes(apiData.data.listNotes.items);
// }

const TOROPHY = () => {
  return (
    <>
      <HEADER/>
      <Box sx={{mt:30,justifyContent: 'center',display: 'flex',height:200}}>
        <img src = 'https://calligra.design/m/c0177_7/c0177_7_0.svg'></img>
      </Box>
    </>
  )
}

export default TOROPHY