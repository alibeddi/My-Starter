import React from "react";
import { Card, Grid } from "@mui/material";
import Logo from "../../assets/images/Icon Ostedhy.svg";
import leftArr from "../../assets/icons/leftArr.svg";
import { useNavigate } from "react-router-dom";

export default function AuthCardComponent(props) {
  const navigate = useNavigate();

  const { title, subtitle, email_number, background, isArrowLeft } = props;
  const navigateBack = () => {
    return navigate(-1);
  };
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className="back_card_section"
      spacing={0}
    >
      <Grid item xs={11} sm={9} md={7} lg={5} className="card_section">
        {isArrowLeft && (
          <img
            className="card_left_arrow"
            src={leftArr}
            alt=""
            onClick={() => navigateBack()}
          />
        )}

        <Card elevation={0} className="card_content">
          <div className="card_title">{title}</div>
          {subtitle && <div className="sub_title">{subtitle}</div>}
          {email_number && <div className="s-verif_item">{email_number}</div>}

          {props.children}
        </Card>
      </Grid>
    </Grid>
  );
}
