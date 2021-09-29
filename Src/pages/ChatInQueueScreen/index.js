import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { useStyles } from './styles';
import { Container, Typography, Button, Paper, Box, } from '@material-ui/core';
import Footer from '../../components/Footer';
import FormButton from '../../components/FormButton';
import { URL_PATH } from '../../config/uriConfig';
import { TENANT_ID } from '../../config/TenantConfig';
import { dynamicConfig } from '../../config/dynamicConfig';
import { useHistory } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { postRequest, getRequest, deleteRequest } from '../../common/fetchRequest';
import CancelIcon from '@material-ui/icons/Cancel';
import { Colors } from '../../styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const ChatInQueueScreen = () => {
  const classes = useStyles();
  const [queueSize, setQueSize] = useState('-');
  const [connected, setConnected] = useState(false);
  const [patientAddedToQueue, setPatientAddedToQueue] = useState(false);
  const history = useHistory();
  let userType = localStorage.getItem('userType');
  const token = localStorage.getItem('token')
  const SOCKET_URL = `${URL_PATH}meeting/ws-message?token=${token}`;
  let clientRef = useRef(null);
  let meetingJson = '';

  useEffect(() => {
    // let interval = setInterval(() => {
    //   getQueueSize()
    // }, 3000);
    // return () => {
    //   clearInterval(interval);
    // }
  }, [])

  const addServiceProviderToQueue = async () => {
    let userId = await localStorage.getItem('userId');
    let URL = `queue/serviceProvider/${userId}?deviceType=browser&tenant=${TENANT_ID}`;
    let response = await postRequest(URL, null, true);
    if (response.ok) {
      const data = await response.text();
      console.log('Sp add queue resposne:  => ' + data);
    }
  };

  const addPatientToQueue = async () => {
    let userId = await localStorage.getItem('userId');
    let URL = `queue/patient/${userId}?deviceType=browser&tenant=${TENANT_ID}`;
    let response = await postRequest(URL, null, true);
    if (response.ok) {
      const data = await response.text();
      console.log('Patient add queue resposne:  => ' + data);
      setPatientAddedToQueue(true);
      getQueueSize();
    }
  };

  const getQueueSize = async () => {
    console.log('Getting queue size in waiting screen')
    let URL = `queue/patient/queueSize?tenant=${TENANT_ID}`
    let response = await getRequest(URL, true);
    if (response.ok) {
      const data = await response.json();
      setQueSize(data);
    }
  };

  const handleCancel = async () => {
    let appointment_id = null;
    appointment_id = localStorage.getItem('selectedAppointmentId');
    if (appointment_id === null) {
      let userId = await localStorage.getItem('userId');
      let URL = '';
      if (userType === 'SERVICE_PROVIDER') {
        URL = `queue/serviceProvider/${userId}?tenant=${TENANT_ID}`;
      } else {
        URL = `queue/patient/${userId}?tenant=${TENANT_ID}`;
      }
      let response = await deleteRequest(URL, true);
      if (response.ok) {
        // history.push({
        //   pathname: dynamicConfig[TENANT_ID].flow.afterLogin[userType],
        //   search: `?tenant=${TENANT_ID}`
        // });
        history.goBack();
      }
    } else {
      // history.push({
      //   pathname: dynamicConfig[TENANT_ID].flow.afterLogin[userType],
      //   search: `?tenant=${TENANT_ID}`
      // });
      history.goBack();
    }
  };

  const onDisconnected = async () => {
    console.log('Disconnected!')
    setConnected(false);
  }

  const onConnected = () => {
    localStorage.removeItem('meetingStartTime');
    console.log('Connected!!');
    setConnected(true);

    // let appointment_id = null;
    // appointment_id = localStorage.getItem('selectedAppointmentId')
    // if (appointment_id === null) {
    //   if (userType == 'SERVICE_PROVIDER') {
    //     addServiceProviderToQueue();
    //   }
    //   if (userType == 'PATIENT') {
    //     addPatientToQueue();
    //   }
    // } else {
    //   createMeetingJson(appointment_id);
    // }
  };

  useEffect(() => {
    if (connected) {
      let appointment_id = null;
      appointment_id = localStorage.getItem('selectedAppointmentId');
      if (appointment_id === null) {
        localStorage.removeItem('isMeetingStarted');
        if (userType == 'SERVICE_PROVIDER') {
          addServiceProviderToQueue();
        }
        if (userType == 'PATIENT') {
          addPatientToQueue();
        }
      } else {
        checkMeetingStatus(appointment_id);
      }
    }
  }, [connected])

  const checkMeetingStatus = async (appointment_id) => {
    const USERID = localStorage.getItem('userId')
    const URL = `meeting/status/appointment/${appointment_id}?tenant=${TENANT_ID}`;
    let response = await getRequest(URL, true);
    if (response.ok) {
      if (response === null) {
        createMeetingJson(appointment_id);
      } else {
        try {
          const data = await response.text();
          console.log('meeting status: ' + JSON.parse(data))
          if (JSON.parse(data) === 'MEETING_INITIATED' || JSON.parse(data) === 'CONSULTATION_COMPLETED') { // Meeting is completed.
            createMeetingJson(appointment_id);
          } else { // Meeting is not completed and you have the meeting JSON in localstorage.
            prepareMeetingData();
          }
        } catch (err) {
          createMeetingJson(appointment_id);
        }
      }
    }
  }

  const createMeetingJson = async (appointment_id) => {
    localStorage.removeItem('isMeetingStarted');
    let URL = ''
    if (userType === 'SERVICE_PROVIDER') {
      URL = `appointment/${appointment_id}/serviceProvider/connect?tenant=${TENANT_ID}&deviceType=browser`
    } else {
      URL = `appointment/${appointment_id}/patient/connect?tenant=${TENANT_ID}&deviceType=browser`
    }
    const createMeetingJsonRes = await postRequest(URL, null, true);
    console.log('createMeetingJson res: ' + createMeetingJsonRes.status)
  }

  const onMessageReceived = async (msg) => {
    console.log('ChatQueScreen onMessageReceived()...MESSAGE=>' + JSON.stringify(msg) + ' connected: ' + connected);
    let MESSAGE = msg.chimeMeetingResult;
    if (MESSAGE.attendees) {
      await localStorage.setItem('meetingJson', JSON.stringify(MESSAGE));
      await localStorage.setItem('spTransactionId', JSON.stringify(msg.spTransactionId));
      prepareMeetingData();
    }
  };

  const prepareMeetingData = () => {
    if (userType == 'SERVICE_PROVIDER') {
      history.push({ pathname: '/chimeMeeting', search: `?tenant=${TENANT_ID}` });
    } else if (userType == 'PATIENT') {
      history.push({ pathname: '/chimeMeeting', search: `?tenant=${TENANT_ID}` });
    }
  };

  const steps = ['Start', 'Queue', 'Chat'];
  const activeStep = 1;

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/user/queue/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        ref={client => {
          clientRef = client;
        }}
      />
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
        {userType == 'SERVICE_PROVIDER' ? (
          <Typography className={classes.pageContent}>
            {
              localStorage.getItem('selectedAppointmentId') === null ?
                'Please wait for patients to join the queue'
                :
                'Please wait for the patient to join the call'
            }
          </Typography>
        ) : (
          <Typography className={classes.pageContent}>
            {' '}
            {
              localStorage.getItem('selectedAppointmentId') === null ?
                'Please wait for the doctor to join the queue'
                :
                'Please wait for the doctor to join the call'
            }
          </Typography>
        )}
        {
          userType !== 'SERVICE_PROVIDER' && localStorage.getItem('selectedAppointmentId') === null &&
          <div className={classes.queueSizeBox}>
            <>
              <Typography className={classes.queueSizeLabel}>Your position</Typography>
              {queueSize !== '' ? (
                <Typography className={classes.queueSizeValue}>{queueSize}</Typography>
              ) : (
                <Typography></Typography>
              )}
            </>
          </div>
        }
        <FormButton
          onClick={handleCancel}
          className={classes.cancelButton}
          title='Cancel'
          buttonStyle={{ backgroundColor: Colors.FONT_COLOR, marginTop: 36 }}
          startIcon={<CancelIcon style={{ fontSize: 35, color: '#fff' }} />}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ChatInQueueScreen;
