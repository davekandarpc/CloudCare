import { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import FormButton from "../../components/FormButton";
import Header from "../../components/Header";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Footer from "../../components/Footer";
import { TENANT_ID } from "../../config/TenantConfig";
import { dynamicConfig } from "../../config/dynamicConfig.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTranslation } from "react-i18next";

export const DemandServices = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [authenticating, setAuthentiacting] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    goToLandingPage();
  }, []);

  const goToLandingPage = () => {
    if (localStorage.getItem("token") === null) {
      setAuthentiacting(false);
    } else {
      let userType = localStorage.getItem("userType");
      if (userType === "SERVICE_PROVIDER") {
        history.push({
          pathname: dynamicConfig[TENANT_ID]?.flow?.afterLogin[userType],
          search: `?tenant=${TENANT_ID}`
        });
      } else if (userType === "ADMIN") {
        history.push({
          pathname: dynamicConfig[TENANT_ID]?.flow?.afterLogin[userType],
          search: `?tenant=${TENANT_ID}`
        });
      } else {
        history.push({
          pathname: dynamicConfig[TENANT_ID]?.flow?.afterLogin[userType],
          search: `?tenant=${TENANT_ID}`
        });
      }
      setAuthentiacting(false);
    }
  };

  const history = useHistory();
  const ContectUsTextClick = () => history.push({
    pathname: "/reg",
    search: `?tenant=${TENANT_ID}`
  });
  const SignUpTextClick = () => history.push({
    pathname: "/signIn",
    search: `?tenant=${TENANT_ID}`
  });
  if (authenticating) {
    return (
      <div className={classes.loader}>
        <div>
          Please wait...
          <LinearProgress className={classes.loaderProgressLine} />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ overflow: "hidden" }}>
        <Header
          showContactLinks={true}
          ContectUsTextClick={() => ContectUsTextClick()}
          SignUpTextClick={() => SignUpTextClick()}
          HeaderTitle={t("signin_upperCase")}
          contactUsText={"Contact Us"}
          UserIcon="text"
        />
        <div
          style={{
            position: "relative",
            height: "80vh",
          }}
        >
          <Box className={classes.titleContainer}>
            <Typography className={classes.text}>
              {t("homePageMainTitle")}
            </Typography>
            <Typography className={classes.subText}>
              {t("homePageDescription")}
            </Typography>
            <div className={classes.signupButton}>
              <FormButton
                title={t("signUpNowText")}
                onClick={() => history.push({
                  pathname: "/reg",
                  search: `?tenant=${TENANT_ID}`
                })}
                endIcon={
                  <ArrowRightAlt style={{ fontSize: 35, color: "#fff" }} />
                }
              />
            </div>
            <div style={{ textAling: "left" }}>
              <FormButton
                title={t("signUpDoctor")}
                onClick={() => history.push({
                  pathname: "/docAccountInfo",
                  search: `?tenant=${TENANT_ID}`
                })}
                endIcon={
                  <ArrowRightAlt style={{ fontSize: 35, color: "#fff" }} />
                }
              />
            </div>
          </Box>
          <div
            style={{}}
          >
            <img
              alt="home"
              src={"/images/homeImg.png"}
              className={classes.logoImg}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default DemandServices;
