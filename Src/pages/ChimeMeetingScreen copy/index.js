import React, { useRef, useState, useEffect } from "react";
import "./index.css";
//import axios from 'axios'
import styled from "styled-components";
import * as Chime from "amazon-chime-sdk-js";
import camcorderImgDisabled from "../../assets/images/video-disabled.png";
import CamcorderButton from "../../components/MeetingComponents/CamcorderButton";
import MuteButton from "../../components/MeetingComponents/MuteButton";
import MicIcon from '@material-ui/icons/Mic';
import micEnabledImagePath from "../../assets/images/microphone.png";
import micDisabledImagePath from "../../assets/images/microphone-muted.png";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { _ } from "@ag-grid-community/core";
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import CallEndIcon from "@material-ui/icons/CallEnd";
import { CallEnd } from "@material-ui/icons";
import BillingInfo from "../../components/BillingComponents/Add_RightPanel/BillingInfo";
import QuickCodeSearch from "../../components/BillingComponents/Add_LeftPanel/QuickCodeSearch";
import SpecialistBilling from "../../components/BillingComponents/Add_RightPanel/SpecialistBilling";
import { Typography, Box, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles';
import { TENANT_ID } from '../../config/TenantConfig';
import { postRequest } from '../../common/fetchRequest';
import FormButton from '../../components/FormButton'

function ChimeMeeting() {
  const [meetingResponse, setMeetingResponse] = useState();
  const [attendeeResponse, setAttendeeResponse] = useState();
  const [meetingSession, setMeetingSession] = useState();
  const [callCreated, setCallCreated] = useState(false);
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const videoElement = useRef();
  const audioElement = useRef();
  const videoElementRemote = useRef();

  const history = useHistory();
  const classes = useStyles();
  const imagesPath = {
    micOn: micEnabledImagePath,
    micOff: micDisabledImagePath,
  };

  const userType = localStorage.getItem("userType");
  useEffect(async () => {
    let attendee = null;
    if (userType === "SERVICE_PROVIDER") {
      attendee = 0;
    } else {
      attendee = 1;
    }
    let meetingJson = localStorage.getItem("meetingJson");
    meetingJson = JSON.parse(meetingJson);

    //check for meetingJson null or not. if null->message to user
    // setMeetingResponse(meetingJson.meeting);
    // setAttendeeResponse(meetingJson.attendees[attendee]);
    setCallCreated(true);

    joinVideoCall(meetingJson, attendee);
  }, []);

  const muteBtnState = {
    open: true,
  };

  const camcorderImageState = {
    open: true,
  };

  const getImageName = () => (this.muteBtnState.open ? "micOn" : "micOff");

  var chimeMeetingSession = null;
  var videoDeviceList = null;
  var firstVideoDeviceId = null;
  var audioOutputDevices = null;
  var audioInputDevices = null;
  var attendeeleft = false;

  var logger = null;

  var deviceController = null;

  const handleAttendeePresence = (presentAttendeeId, present) => {
    console.log(`Attendee ID: ${presentAttendeeId} Present: ${present}`);
    if (!present) {
      console.log("Call ended by one attendee");
      meetingSession.audioVideo.stop();
      history.push({ pathname: "/feedback" });
    }
  };

  const joinVideoCall = async (meetingJson, attendee) => {
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

    const observer = {
      audioInputsChanged: (freshAudioOutputDeviceList) => {
        console.log("Audio inputs updated: ", freshAudioOutputDeviceList);
      },
      audioOutputsChanged: (freshAudioOutputDeviceList) => {
        console.log("Audio outputs updated: ", freshAudioOutputDeviceList);
      },

      audioVideoDidStart: () => {
        chimeMeetingSession.audioVideo.startLocalVideoTile();
        let timeStamp = new Date().getTime();
        setMeetingStartTime(timeStamp);
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
        } else {
          chimeMeetingSession.audioVideo.bindVideoElement(
            // (tileState.videoElementCSSHeightPixels = 1500),
            tileState.tileId,
            videoElementRemote.current
          );
        }
      },
      audioVideoDidStop: (sessionStatus) => {
        const sessionStatusCode = sessionStatus.statusCode();
        console.log("sessionStatusCode====>" + sessionStatusCode);
        if (sessionStatusCode === Chime.MeetingSessionStatusCode.Left) {
          // alert("You left the call");
        } else {
          // alert(
          //   "Stopped with a session status code: ",
          //   sessionStatusCode
          // );
          onEndCall();
        }
      },
    };

    deviceController.addDeviceChangeObserver(observer);

    chimeMeetingSession.audioVideo.addObserver(observer);

    chimeMeetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      handleAttendeePresence
    );

    videoDeviceList =
      await chimeMeetingSession.audioVideo.listVideoInputDevices();
    firstVideoDeviceId = videoDeviceList[0].deviceId;

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
  };

  const handleMute = async () => {
    if (muted) {
      meetingSession.audioVideo.realtimeUnmuteLocalAudio();
      setMuted(false);
    } else {
      meetingSession.audioVideo.realtimeMuteLocalAudio();
      setMuted(true);
    }
  };

  const handleVideoOnOff = async () => {
    if (video) {
      setVideo(false);
      meetingSession.audioVideo.stopLocalVideoTile();
    } else {
      if (meetingSession === null) {
        await joinVideoCall().then(setVideo(true));
      } else {
        videoDeviceList =
          await meetingSession.audioVideo.listVideoInputDevices();
        firstVideoDeviceId = videoDeviceList[0].deviceId;
        await meetingSession.audioVideo.chooseVideoInputDevice(
          firstVideoDeviceId
        );
        setVideo(true);
        meetingSession.audioVideo.startLocalVideoTile();

        //  setMeetingSession(chimeMeetingSession);
      }
    }
  };

  const leaveMeeting = async () => {
    await meetingSession.audioVideo.stop();

    // await meetingSession.audioVideo.unbindAudioElement();
    // await meetingSession.audioVideo.unbindVideoElement();
    // await meetingSession.audioVideo.stopLocalVideoTile();
    // await meetingSession.audioVideo.chooseVideoInputDevice(null);

    // await meetingSession.audioVideo.stopVideoPreviewForVideoInput(
    //   previewVideoElement
    // );
  };

  // if (callCreated) {
  //   console.log("joining video call...");
  //   joinVideoCall();
  // }

  const clearMeetingSession = () => {
    // meetingSession.audioVideo.chooseVideoInputDevice(null);
    // meetingSession.audioVideo.stopLocalVideoTile();
    // meetingSession.audioVideo.stopVideoPreviewForVideoInput(videoElementRemote);
    meetingSession.audioVideo.stop();
    onEndCall();
  }

  const onEndCall = async () => {
    handleClose();
    setCallEnded(true);
    if (userType === 'SERVICE_PROVIDER') {
      saveMeetingDuration();
    } else {
      history.push({ pathname: "/feedback" });
    }
    // await meetingSession.audioVideo.stop();
    // await meetingSession.audioVideo.unbindAudioElement();
    // await meetingSession.audioVideo.unbindVideoElement();
    // await meetingSession.audioVideo.stopLocalVideoTile();
    // await meetingSession.audioVideo.chooseVideoInputDevice(null);
  }

  const saveMeetingDuration = async () => {
    const meetingEndTime = new Date().getTime();
    const sysUserId = await localStorage.getItem('userId');
    const body = JSON.stringify({
      startTime: meetingStartTime,
      endTime: meetingEndTime
    })
    const URL = `serviceProvider/${sysUserId}/meetingDuration?tenant=${TENANT_ID}`;
    const response = await postRequest(URL, body, true);
    if (response.ok) {
      // alert('Meeting duration saved - start time: ' + meetingStartTime + ' End time: ' + meetingEndTime);
    }
  }

  // For prompt when try to end the call.
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onExit = () => {
    history.push({ pathname: "/feedback" });
  }

  return (
    <div className="mainContainer">
      <Header />
      {
        !callEnded &&
        <div className="videoContainer">
          <Button variant="contained" className="endCallButton" onClick={handleClickOpen}>End Call</Button>
          <div className="videoContainerHeader">
            <div className="personName">Person Name</div>
            <div className="controls">
              <IconButton size="small" aria-label="upload picture" component="span" className="videoControl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 30 30">
                  <path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M26 11.177V5.5c0-.276-.224-.5-.5-.5h-5.677M16.9 14.1l8.4-8.4M5 19.823V25.5c0 .276.224.5.5.5h5.677M14.1 16.9l-8.4 8.4" />
                </svg>
              </IconButton>
              <IconButton size="small" aria-label="upload picture" component="span" className="videoControl">
                <PauseCircleOutlineIcon style={{ color: '#fff' }} />
              </IconButton>
              <IconButton onClick={handleMute} size="small" aria-label="upload picture" component="span" className="videoControl">
                <MicIcon style={{ color: '#fff' }} />
              </IconButton>
            </div>
          </div>
          <video
            id="video1"
            className="over-img"
            width="150px"
            ref={videoElementRemote}
          ></video>
          <video
            id="video2"
            className="parent"
            width="100%"
            ref={videoElement}
          ></video>
          <audio ref={audioElement}></audio>
          {/* <div className="container">
          <CamcorderButton onClick={handleVideoOnOff}></CamcorderButton>
          <MuteButton
            onClick={handleMute}
          ></MuteButton>
          <div hidden={!callCreated}>
            <HangOffButton
              onClick={() => {
                leaveMeeting()
                  .then(() => {
                    history.push({ pathname: "/feedback" });
                  })
                  .catch((e) => {
                    console.log("exception------->" + e);
                    history.push({ pathname: "/feedback" });
                  });
              }}
            ></HangOffButton>
          </div>
        </div> */}
        </div>
      }
      {
        userType === 'SERVICE_PROVIDER' && callEnded &&
        <div className={classes.callEnded}>
          Call ended, please complete the billing info.
        </div>
      }
      {
        userType === 'SERVICE_PROVIDER' &&
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
            <FormButton title="Exit" onClick={onExit} />
          </Box>
        </>
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You will be out of the call!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to end the call?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={clearMeetingSession} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChimeMeeting;

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
