import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import * as Chime from "amazon-chime-sdk-js";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Button from '@material-ui/core/Button';
import { _ } from "@ag-grid-community/core";
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import IconButton from '@material-ui/core/IconButton';
import BillingInfo from "../../components/BillingComponents/Add_RightPanel/BillingInfo";
import QuickCodeSearch from "../../components/BillingComponents/Add_LeftPanel/QuickCodeSearch";
import SpecialistBilling from "../../components/BillingComponents/Add_RightPanel/SpecialistBilling";
import { Box, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles';
import { TENANT_ID } from '../../config/TenantConfig';
import { dynamicConfig } from '../../config/dynamicConfig';
import FormButton from '../../components/FormButton'
import Tooltip from "@material-ui/core/Tooltip";
import { postRequest } from '../../common/fetchRequest';
import { meetingStarted } from '../../ducks/MeetingDuck/action';
import { connect } from 'react-redux';
function ChimeMeeting({ }) {
  const [meetingSession, setMeetingSession] = useState(null);
  const [muted, setMuted] = useState(false);
  const [isfullScreen, setIsfullScreen] = useState(false);
  const [video, setVideo] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [serviceProviderLeft, setServiceProviderLeft] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const videoElement = useRef();
  const audioElement = useRef();
  const videoElementRemote = useRef();
  const history = useHistory();
  const classes = useStyles();
  const userType = localStorage.getItem("userType");
  let meetingJson = null;
  const [selfName, setSelfName] = useState('')
  const [opponentName, setOpponentName] = useState('');
  const [youAreOnlyOneInMeeting, setYouAreOnlyOneInMeeting] = useState(false);

  const sendMeetingEvent = async (meetingEventType, eventOf) => {
    const URL = `meeting/eventNotification?tenant=${TENANT_ID}`;
    let currentTime = new Date().getTime();
    let body = {
      "meetingEventType": meetingEventType,
      "eventTime": currentTime,
      "patientId": null,
      "serviceProviderId": null
    }
    let index = eventOf === 'SERVICE_PROVIDER' ? 0 : 1;
    let temp = localStorage.getItem("meetingJson");
    temp = JSON.parse(temp)
    let id = temp.attendees[index].externalUserId.split('-')
    id = id[0];
    if (userType === 'SERVICE_PROVIDER') {
      body.serviceProviderId = id;
    } else {
      body.patientId = id;
    }
    body = JSON.stringify(body);
    const response = await postRequest(URL, body, true);
    console.log('meeting event sent for ' + meetingEventType + ': ' + response.status)
  }

  useEffect(async () => {
    const isBillingEnabled = dynamicConfig[TENANT_ID]?.header?.menu?.SERVICE_PROVIDER?.Billing;
    if (isBillingEnabled) {
      setShowBilling(true);
    }
    let attendee = null;
    let temp = localStorage.getItem("meetingJson");
    console.log('MEETING JSON: ' + temp)
    if (temp !== null) {
      meetingJson = JSON.parse(temp);
      if (userType === "SERVICE_PROVIDER") {
        attendee = 0;
        setSelfName(meetingJson?.attendees[1]?.externalUserId);
        setOpponentName(meetingJson?.attendees[0]?.externalUserId);
      } else {
        attendee = 1;
        setSelfName(meetingJson?.attendees[0]?.externalUserId);
        setOpponentName(meetingJson?.attendees[1]?.externalUserId);
      }
      joinVideoCall(meetingJson, attendee);

      window.onload = () => {
        // run in onload
        setTimeout(() => {
          // onload finished.
          // and execute some code here like stat performance.
          document.addEventListener('fullscreenchange', exitHandler, false);
          document.addEventListener('mozfullscreenchange', exitHandler, false);
          document.addEventListener('MSFullscreenChange', exitHandler, false);
          document.addEventListener('webkitfullscreenchange', exitHandler, false);
        }, 1000)
      }

     
    } else {
      history.push({
        pathname: dynamicConfig[TENANT_ID].flow.afterLogin[userType],
        search: `?tenant=${TENANT_ID}`
      });
    }
  }, []);

  var chimeMeetingSession = null;
  var videoDeviceList = null;
  var firstVideoDeviceId = null;
  var audioOutputDevices = null;
  var audioInputDevices = null;
  var logger = null;
  var deviceController = null;

  const attendeeJoinedOrLeft = async (meetingEventType, attendeeId) => {
    // Only from SP side we will handle attendee joined / left events.
    if (userType === 'SERVICE_PROVIDER') {
      let temp = localStorage.getItem("meetingJson");
      if (temp !== null) {
        temp = JSON.parse(temp)
        let ID = null;
        let INDEX = null;
        for (let i = 0; i < temp.attendees.length; i++) {
          if (temp.attendees[i].attendeeId === attendeeId) {
            ID = temp.attendees[i].externalUserId.split('-')[0];
            INDEX = i;
          }
        }
        console.log('INDEX: ' + INDEX)


        if (userType === 'SERVICE_PROVIDER' && meetingEventType === 'ATTENDEE_LEFT' && INDEX === 1) {
          // By this we are prmopting SP that patient has left the call
          // if he also want to end the call or not
          setYouAreOnlyOneInMeeting(true);
          handleEndCallClick();
        }

        // Sending event to backend using api call.
        const URL = `meeting/eventNotification?tenant=${TENANT_ID}`;
        let currentTime = new Date().getTime();
        let body = {
          "meetingEventType": meetingEventType,
          "eventTime": currentTime,
          "patientId": null,
          "serviceProviderId": null
        }

        if (INDEX === 0) {
          // SERVICE_PROVIDER JOINED/LEFT
          body.serviceProviderId = ID;
        } else {
          // PATIENT JOINED/LEFT
          body.patientId = ID;
        }
        // INDEX = 0 is for service provider.
        // INDEX = 1 is for patient.


        body = JSON.stringify(body);
        const response = await postRequest(URL, body, true);
        console.log('meeting event sent for ' + meetingEventType + ': ' + response.status + ' ' + INDEX)

        // This will check on the SP side if the patient was not joined yet and now he has joined.
        // That means this is a start of the meeting... Fire a meeting started event.
        // When SP and Patient both joins the call then only we consider the meeting as started.
        let isMeetingStarted = localStorage.getItem('isMeetingStarted');
        if (isMeetingStarted === null) {
          if (userType === 'SERVICE_PROVIDER' && meetingEventType === 'ATTENDEE_JOINDED' && INDEX === 1) {
            meetingStarted();
          }
        }

      }
    }
  }

  const meetingStarted = async () => {
    if (userType === 'SERVICE_PROVIDER') {
      const URL = `meeting/eventNotification?tenant=${TENANT_ID}`;
      let currentTime = new Date().getTime();
      let body = {
        "meetingEventType": 'MEETING_STARTED',
        "eventTime": currentTime,
        "patientId": null,
        "serviceProviderId": null
      }
      let temp = localStorage.getItem("meetingJson");
      if (temp !== null) {
        temp = JSON.parse(temp)
        body.serviceProviderId = temp.attendees[0].externalUserId.split('-')[0];;
        body.patientId = temp.attendees[1].externalUserId.split('-')[0];;
        body = JSON.stringify(body);
        const response = await postRequest(URL, body, true);
        const timeStamp = new Date().getTime();
        localStorage.setItem('meetingStartTime', timeStamp);
        if (response.ok) {
          localStorage.setItem('isMeetingStarted', 'true');
        }
        console.log('meeting event sent for ' + 'MEETING_STARTED : ' + response.status)
      }
    }
  }

  const sendMeetingEndedEvent = async () => {
    const URL = `meeting/eventNotification?tenant=${TENANT_ID}`;
    let currentTime = new Date().getTime();
    let body = {
      "meetingEventType": 'MEETING_ENDED',
      "eventTime": currentTime,
      "patientId": null,
      "serviceProviderId": null
    }
    let temp = localStorage.getItem("meetingJson");
    if (temp !== null) {
      temp = JSON.parse(temp)
      body.serviceProviderId = temp.attendees[0].externalUserId.split('-')[0];
      body.patientId = temp.attendees[1].externalUserId.split('-')[0];
      body = JSON.stringify(body);
      const response = await postRequest(URL, body, true);
      if (response.ok) {
        localStorage.removeItem('meetingJson');
        localStorage.removeItem('spTransactionId');
      }
      console.log('meeting event sent for ' + 'MEETING_ENDED : ' + response.status)
    }
  }

  const handleAttendeePresence = (presentAttendeeId, present) => {
    console.log('presentAttendeeId: ' + presentAttendeeId + ', present: ' + present + 'me @ ' + userType)
    let appointment_id = null;
    appointment_id = localStorage.getItem('selectedAppointmentId')
    if (appointment_id !== null) {
      // This will be fired for pre-booked appointments.
      if (!present) {
        if (userType === 'PATIENT') {
          setServiceProviderLeft(true);
        }
        attendeeJoinedOrLeft('ATTENDEE_LEFT', presentAttendeeId);
      } else {
        if (userType === 'PATIENT') {
          setServiceProviderLeft(false);
        }
        attendeeJoinedOrLeft('ATTENDEE_JOINDED', presentAttendeeId);
      }
    } else {
      // This will be fired for See A Patient/Doctor.
      if (!present) {
        setCallEnded(true);
      }
    }
  };

  const joinVideoCall = async (meetingJson, attendee) => {
    try {
      console.log("JOINED VIDEO CALL");
      logger = new Chime.ConsoleLogger("ChimeMeetingLogs", Chime.LogLevel.INFO);

      deviceController = new Chime.DefaultDeviceController(logger);

      const configuration = new Chime.MeetingSessionConfiguration(
        meetingJson.meeting,
        meetingJson.attendees[attendee]
      );
      chimeMeetingSession = new Chime.DefaultMeetingSession(
        configuration,
        logger,
        deviceController
      );
      let localTileId = null;
      const observer = {
        audioInputsChanged: (freshAudioOutputDeviceList) => {
          console.log("Audio inputs updated: ", freshAudioOutputDeviceList);
        },
        audioOutputsChanged: (freshAudioOutputDeviceList) => {
          console.log("Audio outputs updated: ", freshAudioOutputDeviceList);
        },
        audioVideoDidStart: () => {
          chimeMeetingSession.audioVideo.startLocalVideoTile();
        },
        videoTileDidUpdate: (tileState) => {
          // Ignore a tile without attendee ID, and a content share.
          if (!tileState.boundAttendeeId || tileState.isContent) {
            return;
          }
          // bind your local video and remote video into tiles
          if (tileState.localTile) {
            chimeMeetingSession.audioVideo.bindVideoElement(
              tileState.tileId,
              videoElement.current
            );
            localTileId = tileState.tileId;
          } else {
            chimeMeetingSession.audioVideo.bindVideoElement(
              tileState.tileId,
              videoElementRemote.current
            );
          }
        },
        audioVideoDidStop: (sessionStatus) => {
          const sessionStatusCode = sessionStatus.statusCode();
          if (sessionStatusCode === Chime.MeetingSessionStatusCode.Left) {
            // alert("You left the call");
          } else {
            // alert("Stopped with a session status code: ",sessionStatusCode);
          }
        }
      };

      deviceController.addDeviceChangeObserver(observer);

      chimeMeetingSession.audioVideo.addObserver(observer);

      chimeMeetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
        handleAttendeePresence
      );

      videoDeviceList =
        await chimeMeetingSession.audioVideo.listVideoInputDevices();
      firstVideoDeviceId = videoDeviceList[0].deviceId;
      console.log('videoDeviceList: ' + JSON.stringify(videoDeviceList))

      audioOutputDevices =
        await chimeMeetingSession.audioVideo.listAudioOutputDevices();
      audioInputDevices =
        await chimeMeetingSession.audioVideo.listAudioInputDevices();

      await chimeMeetingSession.audioVideo.chooseAudioInputDevice(
        audioInputDevices[0].deviceId
      );
      await chimeMeetingSession.audioVideo.chooseAudioOutputDevice(
        audioOutputDevices[0].deviceId
      );
      await chimeMeetingSession.audioVideo.chooseVideoInputDevice(
        firstVideoDeviceId
      );
      await chimeMeetingSession.audioVideo.bindAudioElement(audioElement.current);
      chimeMeetingSession.audioVideo.start();
      setMeetingSession(chimeMeetingSession);
    } catch (err) {
      console.error(err)
    }
  };

  const handleMute = async () => {
    if (muted) {
      meetingSession.audioVideo.realtimeUnmuteLocalAudio();
      setMuted(false);
      sendMeetingEvent('UNMUTED', userType);
    } else {
      meetingSession.audioVideo.realtimeMuteLocalAudio();
      setMuted(true);
      sendMeetingEvent('MUTED', userType);
    }
  };

  const handleVideoOnOff = async () => {
    if (video) {
      setVideo(false);
      meetingSession.audioVideo.stopLocalVideoTile();
      sendMeetingEvent('VIDEO_OFF', userType);
    } else {
      if (meetingSession === null) {
        await joinVideoCall().then(setVideo(true), sendMeetingEvent('VIDEO_ON', userType));
      } else {
        videoDeviceList =
          await meetingSession.audioVideo.listVideoInputDevices();
        firstVideoDeviceId = videoDeviceList[0].deviceId;
        await meetingSession.audioVideo.chooseVideoInputDevice(
          firstVideoDeviceId
        );
        setVideo(true);
        meetingSession.audioVideo.startLocalVideoTile();
        sendMeetingEvent('VIDEO_ON', userType)
      }
    }
  };

  const handleEndCallClick = () => {
    setOpen(true);
  }

  // For prompt when try to end the call.
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const onEndCall = async () => {
    meetingSession.audioVideo.stop();
    handleClose();
    setCallEnded(true);
    if (userType === 'SERVICE_PROVIDER') {
      saveMeetingDuration();
      sendMeetingEndedEvent();
      if (!showBilling) {
        goToFeedbackPage();
      }
    }
    // localStorage.removeItem("meetingJson");
  }

  useEffect(() => {
    let appointment_id = null;
    appointment_id = localStorage.getItem('selectedAppointmentId')

    if (callEnded) {
      if (appointment_id !== null) {
        if (userType === 'PATIENT') {
          // Came from calendar with pre-booked appointment
          // Here we will tell the patient that SP has left the call and will ask him to wait.
          setServiceProviderLeft(true);
          goToFeedbackPage();
        }
      } else {
        // Came from See A Patient / See A Doctor
        // So will not prompt anything to user and will end the call on both side.
        if (userType === 'SERVICE_PROVIDER') {
          meetingSession.audioVideo.stop();
          if (!showBilling) {
            goToFeedbackPage();
          } else {
            saveMeetingDuration();
          }
        } else {
          goToFeedbackPage();
        }
      }
    }
  }, [callEnded])

  const goToFeedbackPage = () => {
    history.push({ pathname: "/feedback", search: `?tenant=${TENANT_ID}` });
    meetingSession.audioVideo.stop();
  }

  const saveMeetingDuration = async () => {
    const startTime = localStorage.getItem('meetingStartTime');
    const endTime = new Date().getTime();

    var difference = endTime - startTime;

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60
    var secondsDifference = Math.floor(difference / 1000);

    const duration = minutesDifference + 'mins ' + secondsDifference + 'secs'
    const body = JSON.stringify({
      startTime: startTime,
      endTime: endTime
    })
    const userId = localStorage.getItem('userId');
    const URL = `serviceProvider/${userId}/meetingDuration?tenant=${TENANT_ID}`;
    await postRequest(URL, body, true);
    localStorage.removeItem('meetingStartTime');
  }

  const fullScreen = () => {
    var elem = document.getElementById("videoContainer");
    if (!isfullScreen) {
      setIsfullScreen(true);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  const exitHandler = () => {
    if (document.webkitIsFullScreen === false) {
      setIsfullScreen(false);
    } else if (document.mozFullScreen === false) {
      setIsfullScreen(false);
    } else if (document.msFullscreenElement === false) {
      setIsfullScreen(false);
    }
  }

  return (
    <div className="mainContainer">
      <Header />
      {
        !callEnded &&
        <div className="videoContainer" id="videoContainer">
          <div className="endCallButtonWrapper">
            <Button className="endCallButton" variant="contained" onClick={() => { setYouAreOnlyOneInMeeting(false); handleEndCallClick() }}>End Call</Button>
          </div>
          <div className="videoContainerHeader">
            <div style={{ color: '#fff' }}>
              {
                userType === 'PATIENT' && serviceProviderLeft ?
                  'Service Provider has left the call.'
                  :
                  ''
              }
            </div>
            <div className="controls">
              <IconButton onClick={fullScreen} size="small" aria-label="full screen" component="span" className="videoControl">
                {
                  !isfullScreen ?
                    <Tooltip title="Full Screen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 30 30">
                        <path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M26 11.177V5.5c0-.276-.224-.5-.5-.5h-5.677M16.9 14.1l8.4-8.4M5 19.823V25.5c0 .276.224.5.5.5h5.677M14.1 16.9l-8.4 8.4" />
                      </svg>
                    </Tooltip>
                    :
                    <Tooltip title="Exit Full Screen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 30 30">
                        <path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M16.9 7.924V13.6c0 .276.224.5.5.5h5.677M26 5l-8.4 8.4M14.1 23.076V17.4c0-.276-.224-.5-.5-.5H7.923M5 26l8.4-8.4" />
                      </svg>
                    </Tooltip>
                }
              </IconButton>
              <IconButton onClick={handleVideoOnOff} size="small" aria-label="pause" component="span" className="videoControl">
                {
                  video ?
                    <Tooltip title="Turn Off Video">
                      <VideocamIcon style={{ color: '#fff' }} />
                    </Tooltip>
                    :
                    <Tooltip title="Turn On Video">
                      <VideocamOffIcon style={{ color: '#fff' }} />
                    </Tooltip>
                }
              </IconButton>
              <IconButton onClick={handleMute} size="small" aria-label="Mute" component="span" className="videoControl">
                {
                  muted ?
                    <Tooltip title="Unmute">
                      <MicOffIcon style={{ color: '#fff' }} />
                    </Tooltip>
                    :
                    <Tooltip title="Mute">
                      <MicIcon style={{ color: '#fff' }} />
                    </Tooltip>
                }
              </IconButton>
            </div>
          </div>
          <div className="videoTilesContainer">
            <div className="over-img">
              <video
                id="video1"
                style={{ height: '100%', width: '100%' }}
                ref={videoElementRemote}
              />
              <div style={{ color: '#fff', position: 'absolute', top: 10, left: '40%' }}>
                {selfName !== '' ? selfName.split('-')[1] : ''}
              </div>
            </div>
            <div className="parent">
              <video
                id="video2"
                style={{ height: '100%', width: '100%' }}
                ref={videoElement}
              />
              <div style={{ color: '#fff', position: 'absolute', top: 10, left: '40%' }}>
                {opponentName !== '' ? opponentName.split('-')[1] : ''}
              </div>
            </div>
          </div>
          <audio ref={audioElement}></audio>
        </div>
      }
      {
        userType === 'SERVICE_PROVIDER' && callEnded && showBilling &&
        <div className={classes.callEnded}>
          Call ended, please complete the billing info.
        </div>
      }
      {
        userType === 'SERVICE_PROVIDER' && showBilling &&
        <>
          <Grid className='billingSection' container>
            <Grid item xs={12} sm={4} className='billingSectionColumn1'>
              <BillingInfo type='add' />
            </Grid>
            <Grid item xs={12} sm={4} className='billingSectionColumn2'>
              <QuickCodeSearch page='videoPage' />
            </Grid>
            <Grid item xs={12} sm={4} className='billingSectionColumn2'>
              <SpecialistBilling />
            </Grid>
          </Grid>
          <Box className={classes.exitButton}>
            <FormButton title="Exit" onClick={goToFeedbackPage} />
          </Box>
        </>
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={`popupHeaderBg_${TENANT_ID}`} />
        <DialogTitle id="draggable-dialog-title">
          <div className={'popupHeader'}>
            {
              youAreOnlyOneInMeeting ?
                "The other person has left the call, do you also want to end the call?"
                :
                'Are you sure you want to end the call?'
            }
          </div>
        </DialogTitle>
        <div className='cancelMeetingPromptButtons'>
          <FormButton
            buttonStyle={{ marginRight: 5 }}
            title={'No'}
            noBorder={true}
            onClick={handleClose}
            variant="outlined"
            color="primary" />
          <FormButton
            title={'Yes'}
            onClick={onEndCall}
            color="primary"
          />
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isMeetingStarted: state.MeetingDuck.isMeetingStarted
});

export default connect(mapStateToProps, { meetingStarted })(ChimeMeeting);

const useStyles = makeStyles({
  callEnded: {
    textAlign: 'left',
    background: 'rgba(0,128,255,0.2)',
    padding: 12,
    color: Colors.PRIMARY
  },
  exitButton: {
    textAlign: 'right',
    marginRight: 16,
    marginBottom: 16
  }
});
