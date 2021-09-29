import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { saveMeetingAndAttendeeInfo } from "../../ducks/ChimeInfoDuck/action";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import FormButton from "../../components/FormButton";
import { TENANT_ID } from "../../config/TenantConfig";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useStyles } from "./styles";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";

const SeeADoctorPatient = () => {
  const classes = useStyles();
  const history = useHistory();
  var userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");

  const seeADoctorOrPatient = async () => {
    localStorage.removeItem("meetingJson");
    if (userType === 'SERVICE_PROVIDER') {
      history.push({ pathname: '/chatInQueue', search: `?tenant=${TENANT_ID}` });
    } else {
      history.push({ pathname: '/chatWelcome', search: `?tenant=${TENANT_ID}` });
    }
  };

  return (
    <div>
      <Header showProfileIcon={true} />
      <div className={classes.mainContainer}>
        <Paper elevation={0} className={classes.subContainer}>
          <Container>
            <Typography className={classes.welcomeText}>
              Welcome Dr.Smith,{" "}
            </Typography>
            <Typography className={classes.subText}>
              Lets gets Started
            </Typography>

            <Grid>
              <img alt='welcome' src={'/images/docWelcome.png'} className={classes.welcomeImage} />
            </Grid>
            <Box className={classes.button}>
              <FormButton
                title={
                  userType === "SERVICE_PROVIDER"
                    ? "See A Patient"
                    : "See A Doctor"
                }
                onClick={seeADoctorOrPatient}
                endIcon={<ArrowRightAlt style={{ fontSize: 35 }} />}
              />
            </Box>
          </Container>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  CHIME_INFO: state.ChimeInfoDuck,
  USER_DATA: state.SigInDuck,
});

export default connect(mapStateToProps, { saveMeetingAndAttendeeInfo })(
  SeeADoctorPatient
);
