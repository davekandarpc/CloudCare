import { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, Paper, MenuItem } from '@material-ui/core';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { connect } from 'react-redux';
import { saveDocAccountInfo } from '../../../ducks/DocAccountInfoDuck/action';
import { useHistory } from "react-router-dom";
import { TENANT_ID } from '../../../config/TenantConfig';
import Autocomplete from '@material-ui/lab/Autocomplete'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { postRequest } from '../../../common/fetchRequest';
import { canadapostApiKey } from '../../../config/settings';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
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

const genderList = [
    {
        value: "MALE",
        label: "MALE"
    },
    {
        value: "FEMALE",
        label: "FEMALE"
    },
    {
        value: "NON-BINARY",
        label: "NON-BINARY"
    },
];


const primaryList = [
    {
        value: "English",
        label: "English"
    },
    {
        value: "Hindi",
        label: "Hindi"
    },
    {
        value: "Tamil",
        label: "Tamil"
    },
];

const secondaryList = [
    {
        value: "English",
        label: "English"
    },
    {
        value: "Hindi",
        label: "Hindi"
    },
    {
        value: "Tamil",
        label: "Tamil"
    },
];

const otherLanguageList = [
    {
        value: "English",
        label: "English"
    },
    {
        value: "Hindi",
        label: "Hindi"
    },
    {
        value: "Tamil",
        label: "Tamil"
    },
]

const DocAccountInfoScreen = ({ DOC_ACCOUNT, saveDocAccountInfo, MANAGE_USER }) => {
    const history = useHistory();
    const classes = useStyles();
    const [allDataFilled, setAllDataFilled] = useState(false);

    const [state, setState] = useState({
        initial: DOC_ACCOUNT?.docAccount?.initial,
        address: DOC_ACCOUNT?.docAccount?.address,
        city: DOC_ACCOUNT?.docAccount?.city,
        postalCode: DOC_ACCOUNT?.docAccount?.postalCode,
        province: DOC_ACCOUNT?.docAccount?.province,
        country: DOC_ACCOUNT?.docAccount?.country,
        gender: DOC_ACCOUNT?.docAccount?.gender,
        mobilePhone: DOC_ACCOUNT?.docAccount?.mobilePhone,
        homePhone: DOC_ACCOUNT?.docAccount?.homePhone,
        otherPhone: DOC_ACCOUNT?.docAccount?.otherPhone,
        primaryLanguage: DOC_ACCOUNT?.docAccount?.primaryLanguage,
        secondaryLanguage: DOC_ACCOUNT?.docAccount?.secondaryLanguage,
        otherLanguage: DOC_ACCOUNT?.docAccount?.otherLanguage,
        firstName: DOC_ACCOUNT?.docAccount?.firstName,
        lastName: DOC_ACCOUNT?.docAccount?.lastName,
        dob: DOC_ACCOUNT?.docAccount?.dateOfBirth,
        email: DOC_ACCOUNT?.docAccount?.email,
        salutation: DOC_ACCOUNT?.docAccount?.salutation,
        activeState: DOC_ACCOUNT?.docAccount?.activeState,
        userType: DOC_ACCOUNT?.docAccount?.userType,
        password: DOC_ACCOUNT?.docAccount?.password,
        confirmPassword: DOC_ACCOUNT?.docAccount?.confirmPassword,
        userId: '',
        successMsg: []
    });

    const [salutationError, setsalutationError] = useState('');
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [addressError, setaddressError] = useState('');
    const [cityError, setcityError] = useState('');
    const [postalCodeError, setpostalCodeError] = useState('');
    const [provinceError, setprovinceError] = useState('');
    const [countryError, setcountryError] = useState('');
    const [genderError, setgenderError] = useState('');
    const [homePhoneError, sethomePhoneError] = useState('');
    const [mobilePhoneError, setmobilePhoneError] = useState('');
    const [otherPhoneError, setotherPhoneError] = useState('');
    const [dobError, setdobError] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [confirmPasswordError, setconfirmPasswordError] = useState('');
    const [successAlertBarError, setsuccessAlertBarError] = useState(false);
    const [userID, setuserID] = useState('');
    const [loading, setLoading] = useState(false)
    const [alertBarError, setalertBarError] = useState('Email Already Exists.Please use a different email');

    useEffect(() => {
        setTimeout(() => {
            var strJavascript = `var fields = [{ element: "address", field: "Line1", mode: pca.fieldMode.SEARCH },{ element: "address", field: "Line1", mode: pca.fieldMode.POPULATE }, { element: "city", field: "City", mode: pca.fieldMode.POPULATE },{ element: "province", field: "ProvinceName", mode: pca.fieldMode.POPULATE },{ element: "postalCode", field: "PostalCode" },{ element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY },{ element: "multi-unit", field: "{AcMua}", mode: pca.fieldMode.POPULATE },{ element: "residential-business", field: "{AcRbdi}", mode: pca.fieldMode.POPULATE }], options = {key: "${canadapostApiKey}"},control = new pca.Address(fields, options);`
            eval(strJavascript);
            strJavascript = 'control.listen("populate", function (address) {document.getElementById("address").defaultValue = address.Line1;document.getElementById("address").value = address.Line1;}); control.listen("populate", function (city) {document.getElementById("city").defaultValue = city.City; document.getElementById("city").value = city.City;updateState("city", city.City) });control.listen("populate", function (province) { document.getElementById("province").defaultValue = province.ProvinceName;  document.getElementById("province").value = province.ProvinceName;});control.listen("populate", function (postalCode) {  document.getElementById("postalCode").defaultValue = postalCode.PostalCode; document.getElementById("postalCode").value = postalCode.PostalCode;}); control.listen("populate", function (country) {document.getElementById("country").defaultValue = country.CountryName;document.getElementById("country").value = country.CountryName; });'
            eval(strJavascript);
        }, 1000)
    }, []);

    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const validateConfirmPassword = value => {
        updateState('confirmPassword', value);
        if (state.password != value) {
            setconfirmPasswordError('Confirm Password must be same as password')
        } else {
            setconfirmPasswordError('');
        }
    };

    const DocAccountValidate = () => {
        var AddressVar = (document.getElementById('address')).value;
        var CityVar = (document.getElementById('city')).value;
        var PostalCodeVar = (document.getElementById('postalCode')).value;
        var CountryVar = (document.getElementById('country')).value;
        var ProvinceVar = (document.getElementById('province')).value;

        let hasError = false
        var validRegex = /^[a-zA-Z,.'-]*$/;
        var postalCodeNo = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        var emailValidRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var homeNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var GivenDate = state.dob;
        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);

        // SALUTATION VALIDATION
        if (state.salutation === '') {
            setsalutationError('Salutation is required');
            hasError = true
        } else {
            setsalutationError('')
        }

        // FIRST NAME VALIDATION
        if (state.firstName === null || state.firstName === "") {
            setfirstNameError('First name is required');
            hasError = true
        }
        else if (state.firstName.length <= 2) {
            setfirstNameError('Name should be minimum 3 characters');
            hasError = true
        }
        else if (!(validRegex.test(state.firstName))) {
            setfirstNameError('Only Alphabet text allowed');
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
            setlastNameError('Only  Alphabet text text allowed');
            hasError = true
        }
        else {
            setlastNameError('')
        }
        // ADDRESS VALIDATION VALIDATION
        if (AddressVar === null || AddressVar === "") {
            setaddressError('Address is required..');
            hasError = true
        } else {
            setaddressError('')
        }
        // CITY VALIDATION
        if (CityVar === null || CityVar === "") {
            setcityError('City is required..');
            hasError = true
        }

        else {
            setcityError('')
        }
        // PROVINCE VALIDATION
        if (ProvinceVar === null || ProvinceVar === "") {
            setprovinceError('Province is required..');
            hasError = true
        }
        else {
            setprovinceError('')
        }

        // POSTAL CODE VALIDATION
        if (PostalCodeVar === null || PostalCodeVar === "") {
            setpostalCodeError('Postal Code is required..');
            hasError = true
        }
        else {
            setpostalCodeError('')
        }
        // COUNTRY VALIDATION
        if (CountryVar === null || CountryVar === "") {
            setcountryError('Country is required..');
            hasError = true
        }
        else {
            setcountryError('')
        }
        // GENDER VALIDATION
        if (state.gender === null || state.gender === "") {
            setgenderError('Gender is required..');
            hasError = true
        }
        else if (!(validRegex.test(state.gender))) {
            setgenderError('Gender is required..');
            hasError = true
        }
        else {
            setgenderError('')
        }
        // HOME NUMBER VALIDATION
        {
            if (state.homePhone != '')
                if (state.homePhone === null || state.homePhone === "") {
                    sethomePhoneError('Phone Number is required')
                    hasError = true
                } else if (!(homeNo.test(state.homePhone))) {
                    sethomePhoneError('Invalid Phone number')
                    hasError = true
                } else {
                    sethomePhoneError('')
                }
        }

        // MOBILE  VALIDATION

        if (state.mobilePhone === null || state.mobilePhone === "") {
            setmobilePhoneError('Phone Number is required')
            hasError = true
        } else if (!(homeNo.test(state.mobilePhone))) {
            setmobilePhoneError('Invalid Phone number')
            hasError = true
        } else {
            setmobilePhoneError('')
        }

        //OTHER NUMBER VALIDATION

        {
            if (state.otherPhone != '') {
                if (state.otherPhone === null || state.otherPhone === "") {
                    setotherPhoneError('Other phone is required.');
                    hasError = true
                } else if (!(homeNo.test(state.otherPhone))) {
                    setotherPhoneError('Invalid Phone number')
                }
                else {
                    setotherPhoneError('');
                }
            }
            else {
                setotherPhoneError('')
            }
        }

        // DATE OF BIRTH VALIDATION
        if (state.dob === null || state.dob === "") {
            setdobError('Date of birth is required');
            hasError = true
        } else if (GivenDate > CurrentDate) {
            setdobError('Select valid date');
            hasError = true
        } else {
            setdobError('')
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
        if (state.password === null || state.password === '') {
            setpasswordError('Password is required');
            hasError = true;
        } else if (!passRegex.test(state.password)) {
            setpasswordError(
                'Password should contain Upper and lower letters along with numbers and special characters.'
            );
            hasError = true;
        } else {
            setpasswordError('');
        }
        if (state.confirmPassword === null || state.confirmPassword === '') {
            setconfirmPasswordError('Confirm Password is required');
            hasError = true;
        } else if (state.password != state.confirmPassword) {
            setconfirmPasswordError(
                'Confirm Password must be same as password'
            );
            hasError = true;
        } else {
            setconfirmPasswordError('');
        }

        return hasError;
    }

    const handleNext = () => {
        var addr = eval('document.getElementById("address").value');
        var cityField = eval('document.getElementById("city").value');
        var postalCodeField = eval('document.getElementById("postalCode").value');
        var countryField = eval('document.getElementById("country").value');
        var provinceField = eval('document.getElementById("province").value');
        updateState('address', addr)
        updateState('city', cityField)
        updateState('postalCode', postalCodeField)
        updateState('country', countryField)
        updateState('province', provinceField)

        setAllDataFilled(true);
        let hasError = DocAccountValidate()
        if (!hasError) {
            userRegisterData()
        }
    }

    const handleBack = () => {
        history.push({ pathname: '/', search: `?tenant=${TENANT_ID}` })
    };

    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setalertBarError(false);
        setsuccessAlertBarError(false);
    };

    const chnageAddress = (address) => {
        updateState('address', address)
    }
    const chnageCity = (city) => {
        updateState('city', city)
    }
    const chnagePostalCode = (postalCode) => {
        updateState('postalCode', postalCode)
    }
    const chnageProvince = (province) => {
        updateState('province', province)
    }
    const chnageCountry = (country) => {
        updateState('country', country)
    }
    const PhoneValidation = (mobilePhone) => {
        const value = mobilePhone.replace(/\D/g, "");
        updateState('mobilePhone', value)
    };
    const otherPhoneValidation = (otherPhone) => {
        const value = otherPhone.replace(/\D/g, "");
        updateState('otherPhone', value)
    };
    const HomePhoneValidation = (homePhone) => {
        const value = homePhone.replace(/\D/g, "");
        updateState('homePhone', value)
    };
    const handleAutocompleteChangeGender = ({ target }) => {
        updateState('gender', target.value)
    };
    const userRegisterData = async () => {
        setLoading(true);
        // const requestOption = {
        //     method: 'POST',
        //     RequestMode: "no-cors",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         userType: "SERVICE_PROVIDER",
        //         firstName: state.firstName,
        //         lastName: state.lastName,
        //         salutation: state.salutation,
        //         dateOfBirth: state.dob,
        //         authPhoneNumber: state.mobilePhone,
        //         email: state.email,
        //         password: state.password,
        //         confirmPassword: state.confirmPassword
        //     })
        // }
        let body = JSON.stringify({
            userType: "SERVICE_PROVIDER",
            firstName: state.firstName,
            lastName: state.lastName,
            salutation: state.salutation,
            dateOfBirth: state.dob,
            authPhoneNumber: state.mobilePhone,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
        })
        let URL = `user?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, body, true);
        setLoading(false);
        let data = await response.json();
        if (response.status === 200) {
            console.log('success data' + JSON.stringify(data))
            localStorage.setItem('sysUserId', data.sysUserId);
            saveDocAccountInfoData(data.sysUserId)
            updateState('successMsg', 'You are registered successfully')
        } else {
            setemailError(alertBarError)
            updateState('errorMsg', data.exception)
            console.log('error' + JSON.stringify(data.exception))
        }
    }

    const saveDocAccountInfoData = async (sysUserId) => {
        setLoading(true);
        var AddressSendVar = (document.getElementById('address')).value;
        var CitySendVar = (document.getElementById('city')).value;
        var PostalCodeSendVar = (document.getElementById('postalCode')).value;
        var CountrySendVar = (document.getElementById('country')).value;
        var ProvinceSendVar = (document.getElementById('province')).value;
        let ISO_countryCode = countries.getAlpha2Code(CountrySendVar, "en");
        var bodyData = {
            countryCode: ISO_countryCode,
            gender: state.gender,
            dateOfBirth: state.dob,
            email: state.email,
            addressLine1: AddressSendVar,
            addressLine2: '',
            city: CitySendVar,
            firstName: state.firstName,
            homePhone: state.homePhone,
            otherPhoneNum: state.otherPhone,
            lastName: state.lastName,
            mobilePhone: state.mobilePhone,
            primaryLang: state.primaryLanguage,
            secondaryLang: state.secondaryLanguage,
            otherLang: state.otherLanguage,
            salutation: state.salutation,
            providerType: 'DOCTOR',
            postalZipCode: PostalCodeSendVar,
            spRegProvince: ProvinceSendVar
        }

        let body = JSON.stringify(bodyData)
        let URL = "serviceProvider/" + sysUserId + `?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, body, true);
        if (response.ok) {
            setsuccessAlertBarError(true)
            updateState('successMsg', 'You are registered successfully')
            setTimeout(() => {
                history.push({
                    pathname: '/twoFactor',
                    data: { email: state.email },
                    search: `?tenant=${TENANT_ID}`
                });
            }, 1500)
        }
    }

    return (
        <div className={classes.mainContainer}>
            <Header />
            {/* <StepperView activeStep={activeStep} /> */}
            <Paper elevation={0} className={classes.subContainerPaper}>
                <Container className={classes.subContainer}>
                    <Typography className={classes.text}>
                        1. Account Info
                    </Typography>
                    <form className={classes.formView} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Salutation
                                </Typography>
                                <TextField
                                    id="salutation"
                                    select
                                    variant="outlined"
                                    value={state.salutation}
                                    onChange={(salutation) => updateState('salutation', salutation.target.value)}
                                    error={salutationError !== ''}
                                    helperText={salutationError}
                                    fullWidth
                                    size={'small'}
                                    required>
                                    {salutationList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                                    onBlur={() => updateState('firstName', state.firstName.trim())}
                                    error={firstNameError !== ''}
                                    helperText={firstNameError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                                    onBlur={() => updateState('lastName', state.lastName.trim())}
                                    error={lastNameError !== ''}
                                    helperText={lastNameError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Gender
                                </Typography>
                                <Autocomplete
                                    id="gender-auto"
                                    options={genderList}
                                    getOptionLabel={(option) => option.value}
                                    onSelect={(event) => {
                                        handleAutocompleteChangeGender(event);
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            id="gender"
                                            error={genderError !== ''}
                                            helperText={genderError}
                                            fullWidth
                                            required
                                            size={'small'}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Date Of Birth
                                </Typography>
                                <TextField
                                    autoComplete="dob"
                                    name="dob"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="otherPhone"
                                    type="date"
                                    value={state.dob}
                                    onChange={(dob) => updateState('dob', dob.target.value)}
                                    error={dobError !== ''}
                                    helperText={dobError}
                                    InputProps={{ inputProps: { max: new Date().toISOString().split('T')[0] } }}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Email
                                </Typography>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    value={state.email}
                                    onChange={(email) => updateState('email', email.target.value)}
                                    onBlur={() => updateState('email', state.email.trim())}
                                    error={emailError !== ''}
                                    helperText={emailError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Password
                                </Typography>
                                <TextField
                                    autoComplete="password"
                                    name="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    type="password"
                                    value={state.password}
                                    onChange={(password) => updateState('password', password.target.value)}
                                    onBlur={() => updateState('password', state.password.trim())}
                                    error={passwordError !== ''}
                                    size={'small'}
                                    helperText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Confrim Password
                                </Typography>
                                <TextField
                                    autoComplete="confirmPassword"
                                    name="confirmPassword"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    type="password"
                                    value={state.confirmPassword}
                                    onChange={(confirmPassword) => validateConfirmPassword(confirmPassword.target.value)}
                                    onBlur={() => updateState('confirmPassword', state.confirmPassword.trim())}
                                    error={confirmPasswordError !== ''}
                                    helperText={confirmPasswordError}
                                    size={'small'}
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
                                    //value={state.address}
                                    onChange={(address) => chnageAddress(address.target.value)}
                                    onBlur={() => updateState('address', state.address.trim())}
                                    error={addressError !== ''}
                                    helperText={addressError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    City
                                </Typography>
                                <TextField
                                    autoComplete="city"
                                    name="city"
                                    variant="outlined"
                                    required
                                    type="text"
                                    fullWidth
                                    id="city"
                                    //value={state.city}
                                    onChange={(city) => chnageCity(city.target.value)}
                                    onBlur={() => updateState('city', state.city.trim())}
                                    error={cityError !== ''}
                                    helperText={cityError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Postal Code
                                </Typography>
                                <TextField
                                    autoComplete="postalCode"
                                    name="postalCode"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="postalCode"
                                    //value={state.postalCode}
                                    onChange={(postalCode) => chnagePostalCode(postalCode.target.value)}
                                    onBlur={() => updateState('postalCode', state.postalCode.trim())}
                                    error={postalCodeError !== ''}
                                    helperText={postalCodeError}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Country
                                </Typography>
                                <TextField
                                    id="country"
                                    //select
                                    variant="outlined"
                                    //value={state.country}
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    onChange={(country) => chnageCountry(country.target.value)}
                                    onBlur={() => updateState('country', state.country.trim())}
                                    error={countryError !== ''}
                                    helperText={countryError}
                                    size={'small'}
                                >
                                    {/* {countryList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Province
                                </Typography>
                                <TextField
                                    id="province"
                                    //select
                                    variant="outlined"
                                    //value={state.province}
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    onChange={(province) => chnageProvince(province.target.value)}
                                    onBlur={() => updateState('province', state.province.trim())}
                                    error={provinceError !== ''}
                                    helperText={provinceError}
                                    size={'small'}
                                >
                                    {/* {provinceList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={4}>
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
                                    type="tel"
                                    value={state.mobilePhone}
                                    onChange={(mobilePhone) => PhoneValidation(mobilePhone.target.value)}
                                    error={mobilePhoneError !== ''}
                                    helperText={mobilePhoneError}
                                    inputProps={{ maxLength: 10 }}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                                    type="tel"
                                    value={state.homePhone}
                                    onChange={(homePhone) => HomePhoneValidation(homePhone.target.value)}
                                    error={homePhoneError !== ''}
                                    helperText={homePhoneError}
                                    inputProps={{ maxLength: 10 }}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                                    type="tel"
                                    value={state.otherPhone}
                                    onChange={(otherPhone) => otherPhoneValidation(otherPhone.target.value)}
                                    error={otherPhoneError !== ''}
                                    helperText={otherPhoneError}
                                    inputProps={{ maxLength: 10 }}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography className={classes.lngText}>SPOKEN LANGUAGE($)</Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Primary
                                </Typography>
                                <TextField
                                    id="primary"
                                    select
                                    variant="outlined"
                                    value={state.primaryLanguage}
                                    onChange={(primaryLanguage) => updateState('primaryLanguage', primaryLanguage.target.value)}
                                    onBlur={() => updateState('primaryLanguage', state.primaryLanguage.trim())}
                                    fullWidth
                                    size={'small'}
                                    required>
                                    {primaryList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Secondary
                                </Typography>
                                <TextField
                                    id="secondary"
                                    select
                                    variant="outlined"
                                    value={state.secondaryLanguage}
                                    onChange={(secondaryLanguage) => updateState('secondaryLanguage', secondaryLanguage.target.value)}
                                    onBlur={() => updateState('secondaryLanguage', state.secondaryLanguage.trim())}
                                    fullWidth
                                    size={'small'}
                                    required>
                                    {secondaryList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography className={classes.formText}>
                                    Other
                                </Typography>
                                <TextField
                                    id="otherLanguage"
                                    select
                                    variant="outlined"
                                    value={state.otherLanguage}
                                    onChange={(otherLanguage) => updateState('otherLanguage', otherLanguage.target.value)}
                                    onBlur={() => updateState('otherLanguage', state.otherLanguage.trim())}
                                    fullWidth
                                    size={'small'}
                                    required>
                                    {otherLanguageList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Paper>
            <Box className={classes.Button}>
                <FormButton
                    title="Back"
                    onClick={handleBack}
                    buttonStyle={{ width: '12%', marginRight: 12 }}
                    variant="outlined"
                />
                <Box style={{}}>
                    <Snackbar open={successAlertBarError} onClose={alertClose} autoHideDuration={3000} >
                        <Alert severity="success">
                            {state.successMsg}
                        </Alert>
                    </Snackbar>
                </Box>
                <FormButton
                    title="Next"
                    onClick={handleNext}
                    loading={loading}
                    buttonStyle={{ width: '12%' }}
                />

            </Box>
        </div>
    )
}
const mapStateToProps = (state) => ({
    MANAGE_USER: state.ManageUserDuck,
    DOC_ACCOUNT: state.DocAccountInfoDuck
});

export default connect(mapStateToProps, { saveDocAccountInfo })(DocAccountInfoScreen);
