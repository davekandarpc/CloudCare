import React, { useEffect, useState } from 'react'
import FormButton from '../../components/FormButton';
import { useStyles } from './styles'
import Table from '../../components/Table';
import Header from '../../components/Header';
import { Typography, Grid, TextField, MenuItem, Container, Box } from '@material-ui/core'
import { connect } from 'react-redux';
import { saveManageUser } from '../../ducks/ManageUserDuck/action';
import { useHistory } from "react-router-dom";
import { TENANT_ID } from '../../config/TenantConfig';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { getRequest, postRequest } from '../../common/fetchRequest';
const accountTypeList = [
    {
        value: "SERVICE_PROVIDER",
        label: "SERVICE_PROVIDER"
    },
    {
        value: "PATIENT",
        label: "PATIENT"
    },
    {
        value: "ADMIN",
        label: "ADMIN"
    },
]
const salutationList = [
    {
        value: "Mr.",
        label: "Mr."
    },
    {
        value: "Mrs.",
        label: "Mrs."
    },
    {
        value: "Miss",
        label: "Miss"
    },
    {
        value: "Dr.",
        label: "Dr."
    },
    {
        value: "Ms.",
        label: "Ms."
    },
];
const ManageUserScreen = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        accountType: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        salutation: '',
        errorMsg: [],
        successMsg: []
    });
    const [listOfUsers, setListOfUsers] = useState([]);
    const [accountTypeError, setaccountTypeError] = useState('');
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [phoneNumberError, setphoneNumberError] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [salutationError, setsalutationError] = useState('');
    const [alertBarError, setalertBarError] = React.useState(false);
    const [successAlertBarError, setsuccessAlertBarError] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [loadingList, setLoadingList] = useState(true);


    useEffect(() => {
        getListOfUsers()
    }, []);

    const getListOfUsers = async () => {
        setLoadingList(true);
        let URL = `users?tenant=${TENANT_ID}`;
        let response = await getRequest(URL, true);
        setLoadingList(false);
        if (response.ok) {
            const data = await response.json();
            console.log('all users: ' + JSON.stringify(data))
            setListOfUsers(data);
        }
    }

    useEffect(() => {
        let UserTypeCheck = localStorage.getItem('userType')
        if (UserTypeCheck != 'ADMIN') {
            history.push({ pathname: './signIn', search: `?tenant=${TENANT_ID}` })
        }
    })
    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const validateForm = () => {
        let hasError = false
        var validRegex = /^[a-zA-Z,.'-]*$/;
        var emailValidRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        var homeNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (state.accountType === null || state.accountType === "") {
            setaccountTypeError('Account Type is required..');
            hasError = true
        } else {
            setaccountTypeError('')
        }
        if (state.salutation === null || state.salutation === "" || state.salutation.length <= 2 || !(validRegex.test(state.salutation))) {
            setsalutationError('Please enter valid salutation');
            hasError = true
        } else {
            setsalutationError('')
        }
        if (state.firstName === null || state.firstName === "") {
            setfirstNameError('First name is required');
            hasError = true
        }
        else if (state.firstName.length <= 2) {
            setfirstNameError('Name should be minimum 3 characters');
            hasError = true
        }
        else if (!(validRegex.test(state.firstName))) {
            setfirstNameError('Only characters allowed');
            hasError = true
        }
        else {
            setfirstNameError('')
        }
        // LAST NAME VALIDATION
        if (state.lastName === null || state.lastName === "") {
            setlastNameError('Last name is required');
            hasError = true
        }
        else if (state.lastName.length <= 2) {
            setlastNameError('Name should be minimum 3 characters');
            hasError = true
        }
        else if (!(validRegex.test(state.lastName))) {
            setlastNameError('Only text text allowed');
            hasError = true
        }
        else {
            setlastNameError('')
        }
        // MOBILE  VALIDATION

        if (state.phoneNumber === null || state.phoneNumber === "") {
            setphoneNumberError('Phone Number is required')
            hasError = true
        } else if (!(homeNo.test(state.phoneNumber))) {
            setphoneNumberError('Phone number must 10 digits')
            hasError = true
        } else {
            setphoneNumberError('')
        }
        // E-MAIL VALIDATION
        if (state.email === null || state.email === "") {
            setemailError('Email address is required');
            hasError = true
        } else if (!(emailValidRegex.test(state.email))) {
            setemailError('Email is not valid');
            hasError = true
        } else {
            setemailError('');
        }
        // PASSWORD VALIDATION
        if (state.password === null || state.password === "") {
            setpasswordError('Password is required');
            hasError = true
        } else if (!(passRegex.test(state.password))) {
            setpasswordError('Password should contain Upper and lower letters along with numbers and special characters.');
            hasError = true
        } else {
            setpasswordError('')
        }

        return hasError;
    }

    const onCreate = () => {
        let hasError = validateForm()
        if (!hasError) {
            createUser()
        }
    }

    const createUser = async () => {
        setCreatingUser(true);
        let body = JSON.stringify({
            email: state.email,
            userType: state.accountType,
            firstName: state.firstName,
            lastName: state.lastName,
            authPhoneNumber: state.phoneNumber,
            password: state.password,
            salutation: state.salutation
        })
        let URL = `admin/regUser?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, body, true);
        let data = await response.json();
        setCreatingUser(false);
        if (response.ok) {
            setsuccessAlertBarError(true)
            updateState('successMsg', 'You have successfully registered')
            updateState('accountType', '');
            updateState('firstName', '');
            updateState('lastName', '');
            updateState('email', '');
            updateState('accountType', '');
            updateState('password', '');
            updateState('salutation', '');
            getListOfUsers();
        } else {
            setalertBarError(true)
            updateState('errorMsg', data.exception)
            console.log('error' + JSON.stringify(data.exception))
        }
    }

    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setalertBarError(false);
        setsuccessAlertBarError(false);
    };

    const PhoneValidation = (phoneNumber) => {
        const value = phoneNumber.replace(/\D/g, "");
        updateState('phoneNumber', value);
    };

    return (
        <div>
            <Header showProfileIcon={true} />
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <Typography className={classes.titleText}>Create Account</Typography>
                    <Typography className={classes.subText}>Create an account to manually, Once created an email will be send to user  with a link to establish a password.</Typography>
                    <form className={classes.formView} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel}>Account Type</Typography>
                                <TextField
                                    id="account-type"
                                    select
                                    variant="outlined"
                                    onChange={(accountType) => updateState('accountType', accountType.target.value)}
                                    error={accountTypeError !== ''}
                                    helperText={accountTypeError}
                                    fullWidth
                                    value={state.accountType}
                                    size={"small"}
                                >
                                    {accountTypeList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel}>Salutation</Typography>
                                <TextField
                                    id="salutation"
                                    select
                                    variant="outlined"
                                    value={state.salutation}
                                    onChange={(salutation) => updateState('salutation', salutation.target.value)}
                                    error={salutationError !== ''}
                                    helperText={salutationError}
                                    fullWidth
                                    size={"small"}
                                >
                                    {salutationList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel}>First Name</Typography>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    value={state.firstName}
                                    onChange={(firstName) => updateState('firstName', firstName.target.value)}
                                    onBlur={() => updateState('firstName', state.firstName.trim())}
                                    error={firstNameError !== ''}
                                    helperText={firstNameError}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel}>Last Name</Typography>
                                <TextField
                                    autoComplete="lname"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    value={state.lastName}
                                    onChange={(lastName) => updateState('lastName', lastName.target.value)}
                                    onBlur={() => updateState('lastName', state.lastName.trim())}
                                    error={lastNameError !== ''}
                                    helperText={lastNameError}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel} >Phone Number</Typography>
                                <TextField
                                    autoComplete="phoneNumber"
                                    name="phoneNumber"
                                    variant="outlined"
                                    fullWidth
                                    id="phoneNumber"
                                    type="tel"
                                    value={state.phoneNumber}
                                    onChange={(phoneNumber) => PhoneValidation(phoneNumber.target.value)}
                                    error={phoneNumberError !== ''}
                                    helperText={phoneNumberError}
                                    inputProps={{ maxLength: 10 }}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel} >Email Address</Typography>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    type="email"
                                    value={state.email}
                                    onChange={(email) => updateState('email', email.target.value)}
                                    onBlur={() => updateState('email', state.email.trim())}
                                    error={emailError !== ''}
                                    helperText={emailError}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className={classes.textFiledLabel} >Password</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    value={state.password}
                                    onChange={(password) => updateState('password', password.target.value)}
                                    onBlur={() => updateState('password', state.password.trim())}
                                    error={passwordError !== ''}
                                    helperText={passwordError}
                                    size={"small"}
                                />
                            </Grid>
                        </Grid>
                        <Grid className={classes.button}>
                            <FormButton
                                title="Create"
                                onClick={onCreate}
                                loading={creatingUser}
                                buttonStyle={{ width: '12%', marginTop: 12 }}
                            />
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
                    </form>
                    <Grid style={{ paddingBottom: '5rem' }}>
                        <Typography className={classes.titleText}>Manage Users
                        </Typography>
                        <Table listOfUsers={listOfUsers} refreshUsersList={getListOfUsers} loadingList={loadingList} />
                    </Grid>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    MANAGE_USER: state.ManageUserDuck
});

export default connect(mapStateToProps, { saveManageUser })(ManageUserScreen);