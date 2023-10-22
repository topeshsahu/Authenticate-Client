import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import google from "../gif/google.gif";
import { Formik } from "formik";
import axios from "axios";
import { getGoogleUrl, useAppContext } from "../Utility/utility";

const styles = {
  outerContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: "90vh",
    backgroundColor: "lightgrey",
    borderRadius: 8,
  },

  formContainer: { width: "80%", margin: "20px 0px" },
};
const Form = () => {
  const { navigation, values, setValues } = useAppContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, toggleShowPassword] = useState(false);
  const login = async (values, onSubmitProps) => {
    const { data: loggedInResponse = {} } = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login/login-by-site`, values)
      .then((response) => response)
      .catch(() => {
        setErrorMsg("User/Password is Invalid");
        onSubmitProps.resetForm();
      });
    if (loggedInResponse && loggedInResponse.user && loggedInResponse.email) {
      const { user, email } = loggedInResponse;
      setValues({ ...values, user, email });
      navigation("/home");
    }
  };

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <div style={{ ...styles.outerContainer }}>
          <div style={{ ...styles.innerContainer }}>
            <h2 style={{ margin: "0px" }}>Sign In</h2>
            <form onSubmit={handleSubmit} style={{ ...styles.formContainer }}>
              <TextField
                sx={{ width: "100%", m: "15px 0px" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                id="email"
                label="Email"
                variant="outlined"
              />

              <TextField
                sx={{ width: "100%", m: "15px 0px" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
              />

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={false}
                      onClick={() => toggleShowPassword(!showPassword)}
                    />
                  }
                  label="show password"
                />
              </FormGroup>
              {errorMsg ? (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errorMsg}
                </span>
              ) : (
                void 0
              )}
              <Button
                sx={{ width: "100%", m: "10px 0px", fontWeight: "bold" }}
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "grey",
                  position: "relative",
                  margin: "20px 0px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-13px",
                    left: "46%",
                    padding: "4px",
                    backgroundColor: "lightgrey",
                  }}
                >
                  OR
                </span>
              </div>

              <Button
                sx={{
                  border: "1px solid",
                  width: "10%",
                  height: "10%",
                }}
                href={getGoogleUrl()}
              >
                <img
                  src={google}
                  style={{ width: "45px", height: "45px" }}
                  alt="Login by google"
                />
              </Button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Form;
