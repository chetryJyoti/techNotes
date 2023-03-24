import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import { ThreeDots } from "react-loader-spinner";
//here we are getting all users in the note form because we want to assign the notes to a user
const NewNote = () => {
  const users = useSelector(selectAllUsers);
  const content = users ? (
    <NewNoteForm users={users} />
  ) : (
    <div className="spinner">
      <ThreeDots
        height="50"
        width="100"
        radius="19"
        color="lightblue"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );

  return content;
};

export default NewNote;
