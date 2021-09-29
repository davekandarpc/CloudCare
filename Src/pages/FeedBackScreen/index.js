import ReactDOM, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import { Typography, Box, MenuItem } from '@material-ui/core';
import {
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import { useStyles } from './styles';
import FormButton from '../../components/FormButton';
import StarRating from '../../components/StarRating';
import { TENANT_ID } from '../../config/TenantConfig';
import { dynamicConfig } from '../../config/dynamicConfig';
import { postRequest } from '../../common/fetchRequest';
import Header from '../../components/Header';

export const FeedBackScreen = () => {
  const classes = useStyles();
  const [duration, setDuration] = useState('-');
  const [ratings, setRatings] = useState(0)
  var authorizationToken = '';
  var userId = '';
  var userType = '';
  useEffect(() => {
    authorizationToken = localStorage.getItem('token');
    userId = localStorage.getItem('userId');
    userType = localStorage.getItem('userType');
    window.scrollTo(0, 0);
    addUserToHistoryQueue();
    // calculateDuration();
    // localStorage.removeItem("meetingJson");
  }, []);

  const calculateDuration = () => {
    const startTime = localStorage.getItem('meetingStartTime');
    if (startTime !== null) {
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
      setDuration(duration);
      if (userType === 'SERVICE_PROVIDER') {
        saveMeetingDuration(startTime, endTime);
      }
      localStorage.removeItem('meetingStartTime');
    } else {
      history.push({
        pathname: dynamicConfig[TENANT_ID].flow.afterLogin[userType],
        search: `?tenant=${TENANT_ID}`
      });
    }
  }

  const saveMeetingDuration = async (meetingStartTime, meetingEndTime) => {
    const body = JSON.stringify({
      startTime: meetingStartTime,
      endTime: meetingEndTime
    })
    const URL = `serviceProvider/${userId}/meetingDuration?tenant=${TENANT_ID}`;
    const response = await postRequest(URL, body, true);
    console.log('save meeting response: ' + response.status)
  }

  const history = useHistory();
  const [state, setState] = useState({
    status: 'DISCONNECTED',
    statusText: 'Disconnected',
    comments: ''
  });
  const statusList = [
    { id: 1, name: 'Disconnected', value: 'DISCONNECTED' },
    { id: 2, name: 'Connected', value: 'CONNECTED' }
  ];

  const updateState = (field, value) => {
    setState(previous => ({ ...previous, [field]: value }));
  };

  const addUserToHistoryQueue = async () => {
    var reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    reqHeaders.append('Authorization', 'Bearer ' + authorizationToken);
    let URL = ''
    switch (userType) {
      case 'PATIENT':
        URL = `queue/patient/history/` + userId + `?tenant=` + TENANT_ID;
        await postRequest(URL, null, true);
        console.log('SAVING PATIENT TO HISTORY QUEUE VIA REST');
        break;

      case 'SERVICE_PROVIDER':
        URL = `queue/serviceProvider/history/` + userId + `?tenant=` + TENANT_ID;
        await postRequest(URL, null, true);
        console.log('SAVING SERVICE PROVIDER TO HISTORY QUEUE VIA REST...');
        break;
    }
  };

  const saveFeedbackViaREST = async () => {
    let sysUserId = localStorage.getItem('userId');
    let URL = `userFeedback/` + sysUserId + `?tenant=` + TENANT_ID;
    let body = JSON.stringify({
      rating: ratings,
      description: state.comments,
      status: state.status
    })
    const response = await postRequest(URL, body, true);
    userType = localStorage.getItem('userType');
    if (response.ok) {
      history.push({ pathname: dynamicConfig[TENANT_ID].flow.afterLogin[userType], search: `?tenant=${TENANT_ID}` });
    }
  };

  const onSelectRating = (ratings) => {
    setRatings(ratings);
  }

  const onSelectStatus = (event) => {
    updateState('status', event.target.value);
    updateState('statusText', event.target.name);
  };

  return (
    <Box className={classes.mainContainer}>
      <Header />
      <Box>
        <Typography className={classes.nonBoldtextLarge}>
          Call Complete
        </Typography>
        {
          userType === 'SERVICE_PROVIDER' &&
          <Typography className={classes.subText}>Duration : {duration}</Typography>
        }
        <Box className={classes.titleContainer}>
          <Typography className={classes.normalText}>Status</Typography>
          <Select
            value={state.status}
            onChange={onSelectStatus}
            displayEmpty
          >
            {statusList.map((option) => (
              <MenuItem name={option.name} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box>
        <Typography className={classes.qualityLabel}>Quality</Typography>
        <StarRating onSelectRating={onSelectRating} />
      </Box>
      <Box>
        <Typography className={classes.additionalCommentsText}>
          Additional Comments
        </Typography>
        <div className="txtarea">
          <textarea
            rows="4"
            onChange={userComment => {
              updateState('comments', userComment.target.value);
            }}
          />
        </div>
      </Box>
      <FormButton
        onClick={saveFeedbackViaREST}
        title="Done"
        style={{ fontSize: 35 }}
      />
    </Box>
  );
};

export default FeedBackScreen;
