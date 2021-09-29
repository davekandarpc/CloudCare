import React, { useState, useEffect } from 'react';
import { useStyles } from './styles';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button
} from '@material-ui/core';
import Header from '../../components/Header';
import FormButton from '../../components/FormButton';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from '../../config/uriConfig';
import { TENANT_ID } from '../../config/TenantConfig';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

const TwoFactorScreen = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState({
    twoFactorCode: 0,
    successMsg: '',
    errorMsg: ''
  });

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    let sysUserId = localStorage.getItem('sysUserId');
    setUserId(sysUserId);
  });

  const [emailError, setemailError] = useState('');
  const [alertBarError, setalertBarError] = useState(false);
  const [successAlertBar, setsuccessAlertBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [twoFactorCodeError, SetTwoFactorCodeError] = useState('');

  const updateState = (field, value) => {
    setState(previous => ({ ...previous, [field]: value }));
  };

  const verifyCode = async () => {
    if (state.twoFactorCode == '' || state.twoFactorCode == null) {
      setalertBarError(true);
      updateState('alertBarError', 'Please enter a valid verification code');
    } else {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('two-factor-code', '' + state.twoFactorCode);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      console.log(
        'URL......verifyCode()====>' +
        URL_PATH +
        `user/${userId}/twoFactorCode?tenant=` +
        TENANT_ID,
        requestOptions
      );
      fetch(
        URL_PATH + `user/${userId}/twoFactorCode?tenant=` + TENANT_ID,
        requestOptions
      )
        .then(async response => {
          console.log(response);
          setLoading(false);
          if (!response.ok) {
            console.log('verifyCode()......Error');
            setalertBarError(true);
            updateState(
              'errorMsg',
              'Two factor verification unsuccessful.Please check your verification code!'
            );
          } else {
            setalertBarError(false);
            console.log('verifyCode()......Success');
            updateState('successMsg', 'Email verified successfully');
            setsuccessAlertBar(true);
            setTimeout(() => {
              history.push({ pathname: '/signIn', search: `?tenant=${TENANT_ID}` });
            },1500)
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('There was an error!', error);
        });
    }
  };

  const resendVerificationCode = async () => {
    setResending(true);
    const requestOptions = {
      method: 'POST'
    };
    fetch(
      URL_PATH + `user/${userId}/resendTwoFactorCode?tenant=` + TENANT_ID,
      requestOptions
    )
      .then(async response => {
        setResending(false);
        if (!response.ok) {
          return;
        } else {
          updateState(
            'successMsg',
            'A Verification code is sent to your email address again'
          );
          setsuccessAlertBar(true);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsuccessAlertBar(false);
  };
  const { data } = useLocation();

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="sm">
        <div className={classes.mainContainer}>
          <Typography component="h3" variant="h3" className={classes.labelText}>
            {t('2factorPageTitle')}
          </Typography>
          <form className={classes.form} noValidate>
            <Typography className={classes.infoText}>
              {t('2factorPageDescription')}
            </Typography>
            <Grid>
              <Typography
                style={{
                  display: 'inline-block'
                }}>
                {data.email}
              </Typography>
              <FormButton
                  variant="outlined"
                  title={t('resendButtonText')}
                  onClick={() => {
                    resendVerificationCode();
                  }}
                  loading={resending}
                  buttonStyle={{ marginLeft: 30 }}
                />
            </Grid>

            <Grid style={{ marginTop: 12 }}>
              <Typography className={classes.text}>
                {t('enterCodeText')}
              </Typography>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  style={{ marginRight: 30, width: '60%' }}
                  variant="outlined"
                  required
                  id="custom-css-outlined-input"
                  onChange={code => {
                    updateState('twoFactorCode', code.target.value);
                  }}
                  error={emailError !== ''}
                  helperText={emailError}
                />
                <FormButton
                  style={{ display: 'inline-block' }}
                  title="Verify"
                  onClick={() => {
                    verifyCode();
                  }}
                  loading={loading}
                  buttonStyle={{ width: '20%' }}
                />
              </Box>
            </Grid>
            <Box style={{}}>
              <Snackbar
                open={successAlertBar}
                onClose={alertClose}
                autoHideDuration={3000}>
                <Alert severity="success">{state.successMsg}</Alert>
              </Snackbar>
              <Snackbar
                open={alertBarError}
                onClose={alertClose}
                autoHideDuration={3000}>
                <Alert severity="error">{state.errorMsg}</Alert>
              </Snackbar>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default TwoFactorScreen;
