import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField } from '@material-ui/core';
import FormButton from '../../components/FormButton';
import { saveUserLogin } from '../../ducks/SignInDuck/action'
import { useHistory } from "react-router-dom";
import { TENANT_ID } from '../../config/TenantConfig';
import { dynamicConfig } from '../../config/dynamicConfig.js'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import Footer from '../../components/Footer';
import { postRequest } from '../../common/fetchRequest';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import { connect } from 'react-redux';

const SignInScreen = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
        userType: '',
        userId: '',
        token: '',
        errorMsg: '',
        loading: false,
        progress: 0,
        successMsg: []
    });

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [alertBarError, setalertBarError] = useState(false);
    const [successAlertBarError, setsuccessAlertBarError] = useState(false);

    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const validate = () => {
        let hasError = false
        var emailValidRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)[^\s+|s+$/g, ""]$/;
        if (state.email === null || state.email === "") {
            setemailError('Email address is required');
            hasError = true
        } else if (!(emailValidRegex.test(state.email))) {
            setemailError('Email is not valid');
            hasError = true
        } else {
            setemailError('');
        }
        if (state.password === null || state.password === "") {
            setpasswordError('Password is required');
            hasError = true
        } else {
            setpasswordError('')
        }
        return hasError;
    }
    const ValidateLoginClick = () => {
        let hasError = validate()
        if (!hasError) {
            CallLoginApi()
        }
    }
    const CallLoginApi = async () => {
        setLoading(true);
        const body = JSON.stringify({
            email: state.email,
            password: state.password
        })
        let URL = `login?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, body, true);
        setLoading(false);
        let data = await response.json();
        if (response.ok) {
            if (data.activeState === 1) {
                setsuccessAlertBarError(true)
                updateState('successMsg', 'You are logged in successfully')
                saveUserLoginData(data)
            } else {
                setalertBarError(true)
                updateState('errorMsg', 'Please verify the email first')
            }
        } else {
            if (response.status === 423) {
                updateState('errorMsg', t('maxLoginAttempt'))
            } else {
                updateState('errorMsg', data.exception)
            }
            setalertBarError(true)
        }
    }

    const saveUserLoginData = (data) => {
        localStorage.setItem('userType', data.userType)
        localStorage.setItem('userId', data.sysUserId + "")
        localStorage.setItem('user_Id', data.userId + "")
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)

        if (data.userType === 'SERVICE_PROVIDER') {
            history.push({
                pathname: dynamicConfig[TENANT_ID].flow.afterLogin[data.userType],
                search: `?tenant=${TENANT_ID}`
            })
        }
        else if (data.userType === 'ADMIN') {
            history.push({
                pathname: dynamicConfig[TENANT_ID].flow.afterLogin[data.userType],
                search: `?tenant=${TENANT_ID}`
            })
        }
        else {
            history.push({
                pathname: dynamicConfig[TENANT_ID].flow.afterLogin[data.userType],
                search: `?tenant=${TENANT_ID}`
            })
        }
    }

    const resetPassword = () => {
        history.push({ pathname: '/forgotPassword', search: `?tenant=${TENANT_ID}` })
    }

    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setalertBarError(false);
        setsuccessAlertBarError(false);
    };

    const ContectUsTextClick = () => history.push({ pathname: '/reg', search: `?tenant=${TENANT_ID}` });
    const SignUpTextClick = () => history.push({ pathname: '/signIn', search: `?tenant=${TENANT_ID}` });

    const onKeyPressHandler = e => {
        // e.preventDefault();
        if (e.key === 'Enter') {
            ValidateLoginClick();
        }
    };

    return (
        <div style={{ height: '100%' }}>
            <Header
                showContactLinks={true}
                ContectUsTextClick={() => ContectUsTextClick()}
                SignUpTextClick={() => SignUpTextClick()}
                HeaderTitle={t('signin_upperCase')}
                contactUsText={"Contact Us"}
                UserIcon='text' />
            {/* <Container component="main"> */}
            <div className={classes.mainContainer} >
                <Typography className={classes.labelText}>
                    {t('signInTitle')}
                </Typography>
                <form className={classes.form} noValidate onSubmit={() => alert('ll')}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className={classes.text}>
                                {t('emailUsernameLabel')}
                            </Typography>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="custom-css-outlined-input"
                                name="email"
                                autoComplete="email"
                                value={state.email}
                                onChange={(email) => updateState('email', email.target.value)}
                                onBlur={() => updateState('email', state.email.trim())}
                                error={emailError !== ''}
                                helperText={emailError}
                                size={'small'}
                                onKeyPress={onKeyPressHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.text}>
                                {t('passwordLabel')}
                            </Typography>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                value={state.password}
                                onChange={(password) => updateState('password', password.target.value)}
                                onBlur={() => updateState('password', state.password.trim())}
                                error={passwordError !== ''}
                                helperText={passwordError}
                                size={'small'}
                                onKeyPress={onKeyPressHandler}
                            />
                            <Typography className={classes.resetPasswordText} onClick={resetPassword}>
                                {t('resetPasswordText')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box style={{}}>
                        <Snackbar open={alertBarError} autoHideDuration={3000} onClose={alertClose}>
                            <Alert severity="error">
                                {state.errorMsg}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={successAlertBarError} onClose={alertClose} autoHideDuration={3000} >
                            <Alert severity="success">
                                {state.successMsg}
                            </Alert>
                        </Snackbar>
                    </Box>
                    <Box className={classes.button}>
                        <FormButton
                            title={t('loginLabel')}
                            onClick={ValidateLoginClick}
                            loading={loading}
                            buttonStyle={{ width: '30%' }}
                        />
                    </Box>
                    <Footer />
                </form>
            </div>

            {/* </Container> */}

        </div>
    )
}


const mapStateToProps = (state) => ({
    USER_DATA: state.SigInDuck.user
});

export default connect(mapStateToProps, { saveUserLogin })(SignInScreen);
