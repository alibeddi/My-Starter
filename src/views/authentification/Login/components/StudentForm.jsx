import * as Yup from "yup";
import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../../../components/Button/Button";
import { login } from "../../../../data/slices/authSlice";
import { useFormik } from "formik";

export default function StudentForm() {
  const dispatch = useDispatch();
  const { error, state } = useSelector((state) => state.auth);
  const [errorMsg, setErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      emailOrPhoneNumber: Yup.string().required(
        "Email or phone number is required"
      ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        login({
          emailOrPhoneNumber: values.emailOrPhoneNumber,
          password: values.password,
        })
      ).then((res) => {
        if (res.payload) {
          setErrMsg("Login successful");
        } else if (res.error) {
          setErrMsg(res?.error?.message || "Your account is not verified");
        }
      });
    },
  });

  return (
    <div className="form_login_card">
      <Grid
        spacing={3}
        container
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid item xs={12}>
          <label htmlFor="emailOrPhoneNumber">
            Email or Phone Number<span>*</span>
          </label>
          <input
            className={
              formik.touched.emailOrPhoneNumber &&
              formik.errors.emailOrPhoneNumber &&
              "error_field"
            }
            placeholder="Enter your email or phone number"
            id="emailOrPhoneNumber"
            name="emailOrPhoneNumber"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.emailOrPhoneNumber}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.emailOrPhoneNumber &&
              formik.errors.emailOrPhoneNumber}
          </div>
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="password">
            Password<span>*</span>
          </label>
          <input
            className={
              formik.touched.password && formik.errors.password && "error_field"
            }
            placeholder="Enter your password"
            id="Password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.password && formik.errors.password}
          </div>
        </Grid>

        <Grid item xs={12} className="pwd_remember">
          <div className="s_left">
            {/* <input type="checkbox" /> */}
            <p></p>
          </div>
          <a href="/auth/forgot-password">Forgot password?</a>
        </Grid>
        {state === "error" && (
          <Grid item xs={12}>
            <div className="error_msg">{errorMsg}</div>
          </Grid>
        )}

        {state === "loading" && (
          <Box className="circlar_progress">
            <CircularProgress />
          </Box>
        )}
        <Grid item xs={12}>
          <Btn type="submit" onClick={formik.handleSubmit} text="Login" />
          <p
            style={{ textAlign: "center", color: "#707c9a" }}
            className="footer_card"
          >
            Don't have an account?
            <span style={{ textAlign: "center" }}>
              <a href="/auth/register"> Sign Up</a>
            </span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
