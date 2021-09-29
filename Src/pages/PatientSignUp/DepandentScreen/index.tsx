import React, { useState,useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, Paper, MenuItem } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch,useHistory } from "react-router-dom";
import MedicalInfoScreen from '../MedicalInfoScreen';
import Footer from '../../../components/Footer';
import StepperView from '../../../components/StepperView';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { savePatientsDepandentInfo } from '../../../ducks/PatientDepandentInfoDuck/action'
import {connect} from 'react-redux';
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

const provinceList = [
    {
        value: "item 1",
        label: "item 1"
    },
    {
        value: "item 2",
        label: "item 2"
    },
    {
        value: "item 3",
        label: "item 3"
    },
    {
        value: "item 4",
        label: "item 4"
    },
];

const genderList = [
    {
        value: "Male",
        label: "Male"
    },
    {
        value: "Female",
        label: "Female"
    },
    {
        value: "Non-Binary",
        label: "Non-Binary"
    },
];
const DepandentScreen =  ({ DEPANDENT_DATA, savePatientsDepandentInfo }) => {
    const history = useHistory();
    useEffect(() => {
      console.log('user-data', + JSON.stringify(DEPANDENT_DATA))
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      useEffect(() => {
        // updateState('oldData' , ACCOUNT_INFO);
      }, [])
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const [currency, setCurrency] = React.useState('EUR');
    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };
    const [state, setState] = useState({
        firstName: DEPANDENT_DATA?.payload?.patientAccountInfo?.firstName ? DEPANDENT_DATA?.payload?.patientAccountInfo?.firstName: '',
        lastName: DEPANDENT_DATA?.payload?.patientAccountInfo?.lastName ? DEPANDENT_DATA?.payload?.patientAccountInfo?.lastName: '',
        initial: DEPANDENT_DATA?.payload?.patientAccountInfo?.initial ? DEPANDENT_DATA?.payload?.patientAccountInfo?.initial: '',
        salutation: DEPANDENT_DATA?.payload?.patientAccountInfo?.salutation ? DEPANDENT_DATA?.payload?.patientAccountInfo?.salutation: '',
        address: DEPANDENT_DATA?.payload?.patientAccountInfo?.address ? DEPANDENT_DATA?.payload?.patientAccountInfo?.address:'',
        healthCardNumber: DEPANDENT_DATA?.payload?.patientAccountInfo?.healthCardNumber ? DEPANDENT_DATA?.payload?.patientAccountInfo?.healthCardNumber:'',
        dateOfBirth: DEPANDENT_DATA?.payload?.patientAccountInfo?.dateOfBirth ? DEPANDENT_DATA?.payload?.patientAccountInfo?.dateOfBirth:'',
        city: DEPANDENT_DATA?.payload?.patientAccountInfo?.city ? DEPANDENT_DATA?.payload?.patientAccountInfo?.city:'',
        province: DEPANDENT_DATA?.payload?.patientAccountInfo?.province ? DEPANDENT_DATA?.payload?.patientAccountInfo?.province:'',
        gender: DEPANDENT_DATA?.payload?.patientAccountInfo?.gender ? DEPANDENT_DATA?.payload?.patientAccountInfo?.gender:'',
        homePhone: DEPANDENT_DATA?.payload?.patientAccountInfo?.homePhone ? DEPANDENT_DATA?.payload?.patientAccountInfo?.homePhone:'',
        mobilePhone: DEPANDENT_DATA?.payload?.patientAccountInfo?.mobilePhone ? DEPANDENT_DATA?.payload?.patientAccountInfo?.mobilePhone:'',
        otherPhone: DEPANDENT_DATA?.payload?.patientAccountInfo?.otherPhone ? DEPANDENT_DATA?.payload?.patientAccountInfo?.otherPhone:'',
        emergencyContactName: DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactName ? DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactName:'',
        emergencyContactRelation: DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactRelation ? DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactRelation:'',
        emergencyContactNumber: DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactNumber ? DEPANDENT_DATA?.payload?.patientAccountInfo?.emergencyContactNumber:'',
        dependants: DEPANDENT_DATA?.payload?.patientAccountInfo?.dependants ? DEPANDENT_DATA?.payload?.patientAccountInfo?.dependants:[]
    });
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [initialError, setinitialError] = useState('');
    const [salutationError, setsalutationError] = useState('');
    const [addressError, setaddressError] = useState('');
    const [healthCardNumberError, sethealthCardNumberError] = useState('');
    const [dateOfBirthError, setdateOfBirthError] = useState('');
    const [address3Error, setaddress3Error] = useState('');
    const [cityError, setcityError] = useState('');
    const [provinceError, setprovinceError] = useState('');
    const [genderError, setgenderError] = useState('');
    const [homePhoneError, sethomePhoneError] = useState('');
    const [mobilePhoneError, setmobilePhoneError] = useState('');
    const [otherPhoneError, setotherPhoneError] = useState('');
    const [emergencyContactNameError, setemergencyContactNameError] = useState('');
    const [emergencyContactNumberError, setemergencyContactNumberError] = useState('');
    const [emergencyContactRelationError, setemergencyContactRelationError] = useState('');
    const ValidateClickButton = () => {
        let hasError = false
        var validRegex = /^[a-zA-Z,.'-]*$/;
        var postalCodeNo = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        var homeNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var socialCardNum = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (state.firstName === null || state.firstName === "" || state.firstName.length <= 2 || !(validRegex.test(state.firstName))) {
            setfirstNameError('Please enter valid first name');
            hasError = true
        } else {
            setfirstNameError('')
        }
        if (state.lastName === null || state.lastName === "" || state.lastName.length <= 2 || !(validRegex.test(state.lastName))) {
            setlastNameError('Please enter valid last name');
            hasError = true
        } else {
            setlastNameError('')
        }
        if (state.initial === null || state.initial === "" || !(validRegex.test(state.initial))) {
            setinitialError('Please enter initial');
            hasError = true
        } else {
            setinitialError('')
        }
        if (state.salutation === null || state.salutation === "") {
            setsalutationError('Salutation is required.');
            hasError = true
        } else {
            setsalutationError('')
        }
        if (state.address === null || state.address === "") {
            setaddressError('Address is required..');
            hasError = true
        } else {
            setaddressError('')
        }
        if (state.healthCardNumber === null || state.healthCardNumber === "" || !(socialCardNum.test(state.healthCardNumber))) {
            sethealthCardNumberError('Health Card Number is required..');
            hasError = true
        } else {
            sethealthCardNumberError('')
        }
        if (state.dateOfBirth === null || state.dateOfBirth === "") {
            setdateOfBirthError('Date of birth is required..');
            hasError = true
        } else {
            setdateOfBirthError('')
        }
        if (state.city === null || state.city === "" || !(validRegex.test(state.city))) {
            setcityError('City is required..');
            hasError = true
        } else {
            setcityError('')
        }
        if (state.province === null || state.province === "") {
            setprovinceError('Province is required..');
            hasError = true
        } else {
            setprovinceError('')
        }
        if (state.gender === null || state.gender === "") {
            setgenderError('Gender is required..');
            hasError = true
        } else {
            setgenderError('')
        }
        if (state.homePhone === null || state.homePhone === "" || !(homeNo.test(state.homePhone))) {
            sethomePhoneError('Home phone is required..');
            hasError = true
        } else {
            sethomePhoneError('')
        }
        if (state.mobilePhone === null || state.mobilePhone === "" || !(homeNo.test(state.mobilePhone))) {
            setmobilePhoneError('Mobile phone is required..');
            hasError = true
        } else {
            setmobilePhoneError('')
        }
        if (state.otherPhone === null || state.otherPhone === "" || !(homeNo.test(state.otherPhone))) {
            setotherPhoneError('Other phone is required..');
            hasError = true
        } else {
            setotherPhoneError('')
        }
        if (state.emergencyContactName === null || state.emergencyContactName === "") {
            setemergencyContactNameError('Emergency contact name is required..');
            hasError = true
        } else {
            setemergencyContactNameError('')
        }
        if (state.emergencyContactNumber === null || state.emergencyContactNumber === "" || !(homeNo.test(state.emergencyContactNumber))) {
            setemergencyContactNumberError('Emergency contact number is required..');
            hasError = true
        } else {
            setemergencyContactNumberError('')
        }
        if (state.emergencyContactRelation === null || state.emergencyContactRelation === "") {
            setemergencyContactRelationError('Emergency contact Relation is required..');
            hasError = true
        } else {
            setemergencyContactRelationError('')
        }
        return hasError;
    };
    const onNext = () => {
        let hasError = ValidateClickButton()
        if (!hasError) {
            savePatientsDepandentInfo(state);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            history.push({pathname: '/Insurance'})
        }
    }

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <Router>
            <Header />
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <StepperView activeStep={activeStep} />
                    <Paper elevation={0} className={classes.subContainerPaper}>
                        <Container>
                            <Typography component="h3" variant="h3" className={classes.text}>
                                DEPANDENT INFO
                    </Typography>
                            <form className={classes.formView} noValidate>
                                <Typography component="h1" variant="h5" align="left" className={classes.subtitleText}>
                                    CREATE DEPANDENT
                    </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            First name
                                </Typography>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            value={state.firstName}
                                            onChange={(firstName) => updateState('firstName', firstName.target.value)}
                                            error={firstNameError !== ''}
                                            helperText={firstNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Last name
                                </Typography>
                                        <TextField
                                            autoComplete="lname"
                                            name="lastName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            value={state.lastName}
                                            onChange={(lastName) => updateState('lastName', lastName.target.value)}
                                            error={lastNameError !== ''}
                                            helperText={lastNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Inital
                                </Typography>
                                        <TextField
                                            autoComplete="inital"
                                            name="inital"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="intial"
                                            value={state.initial}
                                            onChange={(initial) => updateState('initial', initial.target.value)}
                                            error={initialError !== ''}
                                        helperText={initialError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Health card number
                                </Typography>
                                        <TextField
                                            autoComplete="salutation"
                                            name=" Health card number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="Healthcard"
                                            type='number'
                                            value={state.healthCardNumber}
                                            onChange={(healthCardNumber) => updateState('healthCardNumber', healthCardNumber.target.value)}
                                            error={healthCardNumberError !== ''}
                                            helperText={healthCardNumberError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Salutation
                                        </Typography>
                                        <TextField
                                            id="salutation"
                                            select
                                            variant="outlined"
                                            value={state.salutation}
                                            onChange={(salutation) => updateState('salutation', salutation.target.value)}
                                            fullWidth
                                            required
                                            error={salutationError !== ''}
                                            helperText={salutationError}
                                            >
                                            {salutationList.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Gender
                                </Typography>
                                <TextField
                                        id="gender"
                                        select
                                        variant="outlined"
                                        value={state.gender}
                                        onChange={(gender) => updateState('gender', gender.target.value)}
                                        fullWidth
                                        required
                                        error={genderError !== ''}
                                        helperText={genderError}
                                        >
                                        {genderList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Date of birth
                                </Typography>
                                        <TextField
                                            autoComplete="DOB"
                                            name="Date of birth"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="salutation"
                                            type='date'
                                            value={state.dateOfBirth}
                                            onChange={(dateOfBirth) => updateState('dateOfBirth', dateOfBirth.target.value)}
                                            error={dateOfBirthError !== ''}
                                            helperText={dateOfBirthError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            City
                                </Typography>
                                        <TextField
                                            autoComplete="city"
                                            name="city"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="city"
                                            value={state.city}
                                            onChange={(city) => updateState('city', city.target.value)}
                                            error={cityError !== ''}
                                            helperText={cityError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography className={classes.formText}>
                                            Address
                                </Typography>
                                        <TextField
                                            autoComplete="address"
                                            name="address"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="address"
                                            multiline={true}
                                            rows={3}
                                            value={state.address}
                                            onChange={(address) => updateState('address', address.target.value)}
                                            error={addressError !== ''}
                                        helperText={addressError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Province
                                </Typography>
                                <TextField
                                        id="province"
                                        select
                                        variant="outlined"
                                        value={state.province}
                                        onChange={(province) => updateState('province', province.target.value)}
                                        fullWidth
                                        required
                                        error={provinceError !== ''}
                                        helperText={provinceError}
                                        >
                                        {provinceList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Home Phone
                                </Typography>
                                        <TextField
                                            autoComplete="homePhone"
                                            name="homePhone"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="homePhone"
                                            type="number"
                                            value={state.homePhone}
                                            onChange={(homePhone) => updateState('homePhone', homePhone.target.value)}
                                            error={homePhoneError !== ''}
                                            helperText={homePhoneError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Mobile Phone
                                </Typography>
                                        <TextField
                                            autoComplete="mobilePhone"
                                            name="mobilePhone"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="mobilePhone"
                                            type="number"
                                            value={state.mobilePhone}
                                            onChange={(mobilePhone) => updateState('mobilePhone', mobilePhone.target.value)}
                                            error={mobilePhoneError !== ''}
                                            helperText={mobilePhoneError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Other Phone
                                </Typography>
                                        <TextField
                                            autoComplete="otherPhone"
                                            name="otherPhone"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="otherPhone"
                                            type="number"
                                            value={state.otherPhone}
                                            onChange={(otherPhone) => updateState('otherPhone', otherPhone.target.value)}
                                            error={otherPhoneError !== ''}
                                            helperText={otherPhoneError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Emergency Contact  Name
                                </Typography>
                                        <TextField
                                            autoComplete="name"
                                            name="name"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            value={state.emergencyContactName}
                                            onChange={(emergencyContactName) => updateState('emergencyContactName', emergencyContactName.target.value)}
                                            error={emergencyContactNameError !== ''}
                                            helperText={emergencyContactNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Emergency Contact Phone Number
                                </Typography>
                                        <TextField
                                            autoComplete="phoneNumber"
                                            name="phoneNumber"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="emPhoneNumber"
                                            type="number"
                                            value={state.emergencyContactNumber}
                                            onChange={(emergencyContactNumber) => updateState('emergencyContactNumber', emergencyContactNumber.target.value)}
                                            error={emergencyContactNumberError !== ''}
                                            helperText={emergencyContactNumberError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Emergency Contact Relationship
                                </Typography>
                                        <TextField
                                            autoComplete="relationship"
                                            name="relationship"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="relationship"
                                            value={state.emergencyContactRelation}
                                            onChange={(emergencyContactRelation) => updateState('emergencyContactRelation', emergencyContactRelation.target.value)}
                                            error={emergencyContactRelationError !== ''}
                                            helperText={emergencyContactRelationError}
                                        />
                                    </Grid>
                                </Grid>
                                <Button color='primary' style={{ color: "#007bff" }} className={classes.AddDependentBtn} size="large" variant="outlined" >
                                    Add Dependents
                                </Button>
                            </form>
                        </Container>
                    </Paper>
                    <Box className={classes.Button}>
                        <Button onClick={handleReset} className={classes.cancelBtn}>
                            <Typography className={classes.cancelText}>Cancel</Typography>
                        </Button>
                        <FormButton title="Next" onClick={onNext} />
                    </Box>
                </div>
            </div>
            <Switch>
                <Route exact path="/medical" component={MedicalInfoScreen} />
            </Switch>
        </Router>


    )
}

const mapStateToProps = (state) => (
    console.log('hellllllooo' +JSON.stringify(state)),
    {
    DEPANDENT_DATA: state.PatientDepandentInfoDuck,
    ACCOUNT_INFO: state.PatientAccountInfoDuck.patientAccountInfo
});

export default connect(mapStateToProps, {savePatientsDepandentInfo})(DepandentScreen);

