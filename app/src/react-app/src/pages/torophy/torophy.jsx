import React from 'react'
import HEADER from '../header/header'
//import { createTodo as createMutation, deleteTodo as deleteMutation } from '../../graphql/mutations';
import { Button }  from '@mui/material'

// async function fetchNotes() {
//   const apiData = await API.graphql({ query: listNotes });
//   setNotes(apiData.data.listNotes.items);
// }

const TOROPHY = () => {
  return (
    <>
      <HEADER/>
      <Button onClick={()=>{}}>
        おして
      </Button>
    </>
  )
}

export default TOROPHY