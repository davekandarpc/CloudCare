import React, { useState, useEffect, useRef } from "react";
import { useStyles } from "./styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  GridList,
  GridListTileBar,
} from "@material-ui/core";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import "./index.css";
const MenuScreen = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Header showProfileIcon={true} />
      <div className={classes.content}>
        <Container class="wrapper">
          <div class="typewriter">
            <div className={classes.welcomeTitle}>
            {t("welcomeTitle")}
            </div>
          </div>
        </Container>
          <Typography className={classes.welcomeText}>
            {t("welcomeText")}
          </Typography>
      </div>
    </div>
  );
};
export default MenuScreen;
