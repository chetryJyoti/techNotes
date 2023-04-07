import React from "react";
import { ThreeDots } from "react-loader-spinner";
import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";

//here we are getting all users in the note form because we want to assign the notes to a user
const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  // console.log("users:",users);

  if (!users?.length)
    return (
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
  const content = <NewNoteForm users={users} />;
  return content;
};

export default NewNote;
