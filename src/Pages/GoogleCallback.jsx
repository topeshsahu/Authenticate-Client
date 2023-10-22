import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../Utility/utility";

const GoogleCallback = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const user = queryParams.get("user");
  const email = queryParams.get("email");
  const { navigation, values, setValues } = useAppContext();

  useEffect(() => {
    if (status && status == "success") {
      setValues({ ...values, user: user, email: email });
      navigation("/home");
    } else {
      navigation("/");
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Please Wait.... You are being redirected.</h3>
    </div>
  );
};

export default GoogleCallback;
