import React from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { ThreeDots } from "react-loader-spinner";
const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user)
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

  const content = <EditUserForm user={user} />;

  return content;
};

export default EditUser;
