import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
  // console.log("userId:", id);
  const user = useSelector((state) => selectUserById(state, id));
  // console.log("user:", user);
  const content = user ? <EditUserForm user={user} /> : <p>Loading user...</p>;
  return content;
};

export default EditUser;
