import React from "react";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import { ThreeDots } from "react-loader-spinner";
const UsersList=()=> {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
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
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId}></User>)
      : null;

    content = (
      <>
        <h3>Users database:</h3>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__roles">
                Roles
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
}

export default UsersList;
