import React, { useState, useEffect, useRef } from "react";
import { useStyles } from "./styles";
import { Grid, TextField, Typography, Box } from "@material-ui/core";
import Header from "../../components/Header";
import FormButton from "../../components/FormButton";
import { postRequest } from "../../common/fetchRequest";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { TENANT_ID } from '../../config/TenantConfig';
const ResetPassword = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [params, setParams] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlertBarError, setsuccessAlertBarError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    const params = location.search;
    setParams(params);
  }, []);

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (password != value) {
      setConfirmPasswordError(t("confirmPasswordError"));
    } else {
      setConfirmPasswordError("");
    }
  };

  const onResetPassword = async () => {
    let hasError = false;
    // PASSWORD VALIDATION
    var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password === "") {
      setPasswordError(t("passwordError"));
      hasError = true;
    } else if (!passRegex.test(password)) {
      setPasswordError(t("passwordConstraintError"));
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t("confirmPasswordError"));
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!hasError) {
      setLoading(true);
      const url = `user/resetPassword${params}`;
      const body = JSON.stringify({
        password: password,
      });
      console.log("url: " + url);
      console.log("body: " + body);
      const response = await postRequest(url, body, true);
      if (response.ok) {
        setSuccessMsg(t("passwordChangedSuccessMessage"));
        setsuccessAlertBarError(true);
        history.push({ pathname: "/signIn", search: `?tenant=${TENANT_ID}` });
      }
    }
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsuccessAlertBarError(false);
  };

  return (
    <div className={classes.mainContainer}>
      <Header showProfileIcon={true} />
      <div className={classes.content}>
        <Typography
          component="h3"
          variant="h3"
          className={classes.welcomeTitle}
        >
          {t("resetPasswordText")}
        </Typography>
        <Grid container spacing={2} style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={4}>
            <Typography className={classes.text}>{t("newPassword")}</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={passwordError !== ""}
              helperText={passwordError}
              size={"small"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={4}>
            <Typography className={classes.text}>
              {t("confirmNewPassword")}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(event) => validateConfirmPassword(event.target.value)}
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError}
              size={"small"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ justifyContent: 'center' }}>
          <Grid item xs={4}>
            <Box className={classes.button}>
              <FormButton
                title={t("resetPasswordText")}
                onClick={onResetPassword}
                loading={loading}
              />
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={successAlertBarError}
          onClose={alertClose}
          autoHideDuration={3000}
        >
          <Alert severity="success">{successMsg}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default ResetPassword;

//http://35.182.83.180:8080/althealth/user/resetPassword?tenant=nawaloka&token=dsgdsgdsgs
