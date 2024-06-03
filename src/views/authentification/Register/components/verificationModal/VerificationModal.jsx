import React, { useState } from "react";
import { Dialog, CircularProgress, Box } from "@mui/material";
import Btn from "../../../../../components/Button";
import { Grid } from "@mui/material";
import email from "../../../assets/icons/email.svg";
import phone from "../../../assets/icons/phone.svg";
import { useNavigate } from "react-router";
import { register } from "../../../../../data/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/images/Icon Ostedhy.svg";
import close from "../../../assets/icons/Close_circle.svg";
import { closeModal } from "../../../../../data/slices/modals";

export default function VerificationModal({
  id,
  open,
  handleClose,
  data,
  ...rest
}) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [methode, setMethode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { error, state } = useSelector((state) => state.auth);

  const handleChange = async () => {
    if (data) {
      dispatch(register({ values: data, methode }))
        .then((res) => {
          if (res.payload) {
            dispatch(closeModal("verif-modal"));
            handleClose("verif-modal");

            methode === "email"
              ? navigate("auth/verification", {
                  state: { email: data?.email, methode: "email", data },
                })
              : methode === "phone"
              ? navigate("auth/verification", {
                  state: { phone: data?.phone, methode: "phone", data },
                })
              : setMethode("");
          } else {
            setErrorMsg(
              res.error.message === "Already user exists with phone or email"
                ? "User already exists with this phone or email"
                : res.error.message
            );
          }
        })
        .catch((err) => {});
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose(id);
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="modal_auth"
    >
      <div className="modal_auth_content">
        <div
          className="close_modal"
          onClick={() => {
            handleClose(id);
            setErrorMsg("");
          }}
        >
          <span></span>
          <img src={close} alt="" />
        </div>
        <div className="modal_logo">
          <img src={Logo} alt="" />
        </div>
        <div className="verif_header">
          <p>Select Verification Method</p>
          <span>
            Please choose one of the following methods to verify your account:
          </span>
        </div>
        <Grid container spacing={2.5} className="sub_card">
          <Grid item xs={12} sm={6}>
            <button onClick={() => setMethode("email")}>
              <img src={email} alt="Email" />
              Verify via Email
            </button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <button onClick={() => setMethode("phone")}>
              <img src={phone} alt="Phone" />
              Verify via Phone
            </button>
          </Grid>
        </Grid>
        {state === "error" && (
          <Grid item xs={12}>
            <h3 className="error_msg">{errorMsg}</h3>
          </Grid>
        )}
        {state === "loading" && (
          <Box className="circlar_progress">
            <CircularProgress />
          </Box>
        )}
        <Btn
          disabled={state === "loading" || methode === ""}
          onClick={() => handleChange()}
          text="Confirm"
        />
      </div>
    </Dialog>
  );
}
