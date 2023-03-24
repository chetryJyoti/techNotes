import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { ThreeDots } from "react-loader-spinner";
const EditUser = () => {
  const { id } = useParams();
  // console.log("userId:", id);
  const user = useSelector((state) => selectUserById(state, id));
  // console.log("user:", user);
  const content = user ? (
    <EditUserForm user={user} />
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

export default EditUser;
