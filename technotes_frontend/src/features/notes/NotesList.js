import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import { ThreeDots } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;

  if (isLoading)
    content = (
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
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids, entities } = notes;
    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }
    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId}></Note>);

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default NotesList;
