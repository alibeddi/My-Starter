import React, { useState } from "react";
import { CircularProgress, Box, Grid } from "@mui/material";
import AuthCard from "../../../components/AuthCard";
import Btn from "../../../../../components/Button";
import ReactCodeInput from "react-verification-code-input";
import { useLocation } from "react-router";
import { confirm, confirmPhone } from "../../../../../data/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function VerificationCode() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [value, setValue] = useState(0);

  const submit = (value) => {
    if (state) {
      setValue(value);
    }
  };

  const { error, confirmState } = useSelector((state) => state.auth);
  const handleClick = () => {
    if (value.toString().length === 6) {
      if (state.methode === "email") {
        dispatch(
          confirm({
            confirmationEmailCode: value,
            methode: state.methode,
          })
        ).then((res) => {
          if (res.error) {
            setErrMsg(res.error.message);
          }
        });
      } else {
        dispatch(
          confirmPhone({
            confirmationPhoneCode: value,
            methode: state.methode,
          })
        ).then((res) => {
          if (res.error) {
            setErrMsg(res.error.message);
          }
        });
      }
    }
  };

  return (
    <div className="verif_card">
      <AuthCard
        title={`Verify your ${
          state?.methode === "email" ? "email address" : "phone number"
        }`}
        subtitle={`A verification code has been sent to your ${
          state?.methode === "email" ? "email address" : "phone number"
        }.`}
        email_number={state?.methode === "email" ? state?.email : state?.phone}
        isArrowLeft={true}
      >
        <div className="form_verif_email">
          <ReactCodeInput
            onChange={submit}
            type="text"
            values={value}
            fields={6}
            className="reactCodeInput"
          />
        </div>
        {confirmState === "error" && (
          <Grid item xs={12}>
            <div className="error_msg">{errMsg}</div>
          </Grid>
        )}
        {confirmState === "loading" && (
          <Box className="circlar_progress">
            <CircularProgress />
          </Box>
        )}
        <Btn onClick={handleClick} text="Confirm" />
        <p style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
          {state?.methode === "email" ? "Change email" : "Change phone number"}
        </p>
      </AuthCard>
    </div>
  );
}
