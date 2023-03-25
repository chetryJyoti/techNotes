import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

//here we are getting all users in the note form because we want to assign the notes to a user
const NewNote = () => {
  const users = useSelector(selectAllUsers);
  if(!users?.length) return <p>Not Available</p>
  const content =  (
    <NewNoteForm users={users} />
  ) 
  return content;
};

export default NewNote;
