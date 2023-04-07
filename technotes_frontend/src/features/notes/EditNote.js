import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import { ThreeDots } from "react-loader-spinner";
const EditNote = () => {
  const { id } = useParams();
  const { isAdmin, isManager, username } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length)
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
  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }
  const content = <EditNoteForm note={note} users={users} />;

  return content;
};

export default EditNote;
