import React, { useEffect } from "react";
import { FormControl, Input, Card, Button } from "@chakra-ui/react";
import LoginContainer from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../redux/features/user/UserSlice";
import { useNavigate } from "react-router-dom";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: signInSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });
  const { message, isSuccess, isLoading, isError, logInUser } = useSelector(
    (state) => state?.auth
  );
  console.log(message);

  useEffect(() => {
    if (logInUser || isSuccess) {
      navigate("admin");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      navigate("");
    }
  }, [logInUser, isError, isSuccess, isLoading]);

  return (
    <div className={LoginContainer.container}>
      <Card className={LoginContainer.card_container}>
        <FormControl className={LoginContainer.form_container}>
          <h1>Only Admin</h1>
          {isLoading ? (
            "Loading..."
          ) : (
            <p className={LoginContainer.error}>{message && message}</p>
          )}

          <Input
            type="email"
            placeholder="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            name="email"
          />
          <div className={LoginContainer.text_danger}>
            {formik.touched.email && formik.errors.email}
          </div>
          <Input
            type="password"
            placeholder="Enter Your Admin Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            name="password"
          />
          <div className={LoginContainer.text_danger}>
            {formik.touched.password && formik.errors.password}
          </div>
          <Button onClick={formik.handleSubmit} className={LoginContainer.btn}>
            {isLoading ? "LOADING..." : "LOGIN"}
          </Button>
        </FormControl>
      </Card>
    </div>
  );
};

export default Login;
