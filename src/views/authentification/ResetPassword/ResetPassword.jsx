import React, { useState } from "react";
import AuthCard from "../components/AuthCard/AuthCard";
import { useFormik } from "formik";
import Btn from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { CircularProgress, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../data/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrMsg] = useState("");

  const { error, state } = useSelector((state) => state.auth);
  let { token } = useParams();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password should be at least 8 characters")
        .max(50, "Password should not exceed 50 characters")
        .matches(
          /[a-z]/,
          "Password should contain at least one lowercase letter"
        )
        .matches(
          /[A-Z]/,
          "Password should contain at least one uppercase letter"
        )
        .matches(/[0-9]/, "Password should contain at least one number")
        .required("New password is required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        resetPassword({ token, values: { password: values.newPassword } })
      ).then((res) => {
        if (res.error) {
          setErrMsg(res.error.message);
        } else if (res.payload) {
          setErrMsg("Password reset successful");
          navigate("/auth/login");
        }
      });
    },
  });
  return (
    <AuthCard title="Reset Password" isArrowLeft={false}>
      <div className="form_login_card">
        <Grid
          spacing={3}
          container
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12}>
            <label htmlFor="email">
              New Password<span>*</span>
            </label>
            <input
              className={
                formik.touched.newPassword &&
                formik.errors.newPassword &&
                "error_field"
              }
              placeholder="Enter new password"
              id="newPwd"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
            />
            <div className="error_msg">
              {formik.touched.newPassword && formik.errors.newPassword}
            </div>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="email">
              Confirm Password <span>*</span>
            </label>
            <input
              className={
                formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm &&
                "error_field"
              }
              placeholder="Confirm new password"
              id="cPwd"
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur}
            />
            <div className="error_msg">
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            </div>
          </Grid>
          {state === "error" && (
            <Grid item xs={12}>
              <h3 className="error_msg">{errorMsg}</h3>
            </Grid>
          )}
          {state === "succeeded" && (
            <Grid item xs={12}>
              <h3 className="success_msg">{errorMsg}</h3>{" "}
            </Grid>
          )}

          {state === "loading" && (
            <Box className="circlar_progress">
              <CircularProgress />
            </Box>
          )}
          <Grid item xs={12}>
            <Btn type="submit" text="Reset Password" />
          </Grid>
        </Grid>
      </div>
    </AuthCard>
  );
}
