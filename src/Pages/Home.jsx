import React, { useEffect } from "react";
import { useAppContext } from "../Utility/utility";

const Home = () => {
  const { values, navigation } = useAppContext();

  useEffect(() => {
    if (!values.user) {
      navigation("/");
    }
  }, []);

  return (
    <>
      {values.user ? (
        <div>
          <h1>Welcome {values.user}</h1>
          <h2> Email is : {values.email} </h2>
        </div>
      ) : (
        <div>
          <h1>Invalid User</h1>
        </div>
      )}
    </>
  );
};

export default Home;
