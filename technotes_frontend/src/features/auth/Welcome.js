import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isAdmin, isManager, status } = useAuth();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  const content = (
    <section className="welcome">
      <p>{currentDate}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/notes">View AllNotes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add NewNote</Link>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add NewUser</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users"> User Settings</Link>
        </p>
      )}
    </section>
  );
  return content;
};

export default Welcome;
