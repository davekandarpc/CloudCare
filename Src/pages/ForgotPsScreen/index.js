import { useState } from "react";
import { useStyles } from "./styles";
import { Container, Grid, Typography, Box, TextField } from "@material-ui/core";
import Header from "../../components/Header";
import FormButton from "../../components/FormButton";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
import { saveForgotPassword } from "../../ducks/ForgotPasswordDuck/action";
import { TENANT_ID } from "../../config/TenantConfig";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { postRequest } from "../../common/fetchRequest";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const ForgotPsScreen = ({ USER_FORGOT_DATA, saveForgotPassword }) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [state, setState] = useState({
    email: USER_FORGOT_DATA?.userNewPs?.email,
    errorMsg: [],
    successMsg: [],
  });

  const [emailError, setemailError] = useState("");
  const [successAlertBarError, setsuccessAlertBarError] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateState = (field, value) => {
    setState((previous) => ({ ...previous, [field]: value }));
  };

  const validate = () => {
    let hasError = false;
    var emailValidRegex =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (
      state.email === null ||
      state.email === "" ||
      !emailValidRegex.test(state.email)
    ) {
      setemailError(t("emailError"));
      hasError = true;
    } else {
      setemailError("");
    }
    return hasError;
  };
  const ValidateLoginClick = () => {
    let hasError = validate();
    if (!hasError) {
      ForgotPasswordData();
    }
  };

  const ForgotPasswordData = async () => {
    setLoading(true);
    const requestOption = {
      method: "POST",
      RequestMode: "no-cors",
      headers: { "Content-Type": "application/json", email: state.email },
    };
    let URL = `user/forgotPassword?tenant=${TENANT_ID}`;
    let response = await postRequest(URL, null, true, requestOption);
    setLoading(false);
    let data = await response.text();
    if (response.ok) {
      setsuccessAlertBarError(true);
      updateState("successMsg", t("forgotPasswordSuccessMessage"));
      setTimeout(() => {
        handleNext(data);
      }, 1500);
    } else {
      let errorResponse = JSON.parse(data);
      setemailError(errorResponse.exception);
    }
  };

  const handleNext = (data) => {
    history.push({ pathname: "/signIn", search: `?tenant=${TENANT_ID}` });
  };
  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsuccessAlertBarError(false);
  };
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div className={classes.mainContainer}>
        <Typography className={classes.labelText}>
          {t("forgotPasswordLabel")}
        </Typography>
        <form className={classes.form} noValidate>
          <Typography className={classes.infoText}>
            {t("forgotPasswordContent")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.text}>
                {t("emailLabel")}
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="custom-css-outlined-input"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={(email) => updateState("email", email.target.value)}
                error={emailError !== ""}
                helperText={emailError}
                size={'small'}
              />
            </Grid>
          </Grid>
          <Box className={classes.button}>
            <FormButton
              title={t("resetPassword_upperCase")}
              onClick={ValidateLoginClick}
              loading={loading}
              buttonStyle={{ width: "40%" }}
            />
          </Box>
          <Box style={{}}>
            <Snackbar
              open={successAlertBarError}
              onClose={alertClose}
              autoHideDuration={4000}
            >
              <Alert severity="success">{state.successMsg}</Alert>
            </Snackbar>
          </Box>
          <Footer />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  USER_FORGOT_DATA: state.ForgotPasswordDuck,
});

export default connect(mapStateToProps, { saveForgotPassword })(ForgotPsScreen);
