import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import { saveMeetingAndAttendeeInfo } from "../../ducks/ChimeInfoDuck/action";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PhoneIcon from "@material-ui/icons/Phone";
import FormButton from "../../components/FormButton";
import Header from "../../components/Header";
import { TENANT_ID } from "../../config/TenantConfig";
import { Grid, Typography, Box } from "@material-ui/core";
import { getRequest } from '../../common/fetchRequest';
import { useStyles } from './styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const ChatWelcomeScreen = () => {
  const history = useHistory();
  const [queueSize, setQueSize] = useState("-");
  const classes = useStyles();

  useEffect(() => {
    getQueueSize();
    let interval = setInterval(() => { getQueueSize() }, 3000);
    return () => {
      clearInterval(interval);
    }
  });

  const getQueueSize = async () => {
    console.log('Getting queue size in welcome screen')
    let URL = `queue/patient/queueSize?tenant=${TENANT_ID}`;
    const response = await getRequest(URL, true)
    if (response.ok) {
      const data = await response.json();
      setQueSize(data);
    } else if (response.status === 401) {
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      localStorage.removeItem('user_Id');
      localStorage.removeItem('token');
      history.push({ pathname: '/signIn', search: `?tenant=${TENANT_ID}` });
    }
  };

  const startVideoChat = () => {
    history.push({ pathname: 'chatInQueue', search: `?tenant=${TENANT_ID}` })
  }

  const steps = ['Start', 'Queue', 'Chat'];
  const activeStep = 0;

  return (
    <div>
      <Header />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{ height: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography className={classes.pageContent}>
          Welcome to MyCloud virtual clinic. Consult a doctor by selecting a
          chat type below
        </Typography>
        <div className={classes.queueSizeBox}>
          <div className={classes.queueSizeLabel}>
            Queue size
          </div>
          <div className={classes.queueSizeValue}>
            {queueSize}
          </div>
        </div>

        <Box>
          <Typography className={classes.startCallText}>Start a call now. </Typography>
          <FormButton
            title="Video Chat"
            onClick={startVideoChat}
            startIcon={<VideoCallIcon style={{ fontSize: 35, color: '#fff' }} />}
          />
        </Box>
        <Typography className={classes.orText}>OR</Typography>
        <Box>
          <FormButton
            title="Voice Chat"
            startIcon={<PhoneIcon style={{ fontSize: 35, color: '#fff' }} />}
          />
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  CHIME_INFO: state.ChimeInfoDuck,
});

export default connect(mapStateToProps, { saveMeetingAndAttendeeInfo })(
  ChatWelcomeScreen
);
