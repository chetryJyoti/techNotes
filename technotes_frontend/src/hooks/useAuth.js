import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

//for decoding the token and pulling out the usename and role for authorizing users
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles } = decodedToken.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, status, roles, isManager, isAdmin };
  }

  return { username: " ", roles: [], isManager, isAdmin, status };
};

export default useAuth;
