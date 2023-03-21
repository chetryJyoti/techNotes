import React from 'react'
import {useSelector} from "react-redux"
import {selectAllUsers} from "../users/usersApiSlice"
import NewNoteForm from './NewNoteForm'

//here we are getting all users in the note form because we want to assign the notes to a user
const NewNote = () => {
  const users = useSelector(selectAllUsers)
  const content = users?<NewNoteForm users={users}/>:<p>Loading ....</p>
    
  return content
}

export default NewNote 