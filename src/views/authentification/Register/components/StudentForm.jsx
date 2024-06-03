import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Autocomplete, TextField } from "@mui/material";
import Btn from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../../../data/slices/modals";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import {
  saveData,
  saveGov,
  saveClass,
} from "../../../../data/slices/registerData";
import useValidations from "../../validations/useValidationRegister";

export default function UserForm() {
  const isMounted = useIsMountedRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMounted.current) return;
  }, [dispatch]);

  const validations = useValidations();
  const cleanObject = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "" || obj[key].length == 0) {
        delete obj[key];
      }
    });
    return obj;
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      birth_date: "",
      password: "",
      classes: "",
      government_id: "",
      postal_code: "",
    },
    validationSchema: Yup.object().shape(validations),
    onSubmit: (values) => {
      dispatch(openModal("verif-modal", cleanObject(values)));
      dispatch();
      // saveData({
      //   ...values,
      //   government_id: selectedGov,
      //   classes: selectedClass,
      // })
    },
  });

  return (
    <div className="form_login_card">
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid item xs={12} sm={6}>
          <label htmlFor="first_name">
            First Name <span>*</span>
          </label>
          <input
            className={
              formik.touched.first_name &&
              formik.errors.first_name &&
              "error_field"
            }
            placeholder="Enter your first name"
            id="first_name"
            name="first_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.first_name && formik.errors.first_name}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="last_name">
            Last Name <span>*</span>
          </label>
          <input
            className={
              formik.touched.last_name &&
              formik.errors.last_name &&
              "error_field"
            }
            placeholder="Enter your last name"
            id="last_name"
            name="last_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.last_name && formik.errors.last_name}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            className={
              formik.touched.email && formik.errors.email && "error_field"
            }
            placeholder="Enter your email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.email && formik.errors.email}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            className={
              formik.touched.password && formik.errors.password && "error_field"
            }
            placeholder="Enter your password"
            id="password"
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
        <Grid item xs={12} sm={6}>
          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input
            className={
              formik.touched.phone && formik.errors.phone && "error_field"
            }
            placeholder="Enter your phone number"
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.phone && formik.errors.phone}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="birth_date">
            Birth Date <span>*</span>
          </label>
          <input
            className={
              formik.touched.birth_date &&
              formik.errors.birth_date &&
              "error_field"
            }
            id="birth_date"
            name="birth_date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.birth_date}
            onBlur={formik.handleBlur}
          />
          <div className="error_msg">
            {formik.touched.birth_date && formik.errors.birth_date}
          </div>
        </Grid>
        <Grid item xs={12} className="footer_card">
          <Btn
            type="submit"
            disable={
              !formik.dirty ||
              Object.keys(formik.errors).length > 0 ||
              formik.isSubmitting
            }
            aria-disabled={
              !formik.dirty ||
              Object.keys(formik.errors).length > 0 ||
              formik.isSubmitting
            }
            title="Confirm"
          />
        </Grid>
      </Grid>
    </div>
  );
}
