import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { ThreeDots } from "react-loader-spinner";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log("err:", err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    console.log("No persit");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content =  <div className="spinner">
    <ThreeDots
      height="50"
      width="100"
      radius="19"
      color="lightblue"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </div>
  } else if (isError) {
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please Log in again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
