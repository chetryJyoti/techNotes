import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const Created = new Date(note.createdAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
    });
    const Updated = new Date(note.updatedAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{Created}</td>
        <td className="table__cell note__updated">{Updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
};

export default Note;
