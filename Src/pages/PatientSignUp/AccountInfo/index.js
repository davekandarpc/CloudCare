import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, Paper, MenuItem, SnackbarContent } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { connect } from 'react-redux';
import { savePatientsAccountInfo, clearPatientAccounInto } from '../../../ducks/PatientAccountInfoDuck/action';
import { clearRegisterData } from '../../../ducks/RegisterDuck/action';
import { TENANT_ID } from '../../../config/TenantConfig';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { useHistory } from "react-router-dom";
import { getRequest, postRequest } from '../../../common/fetchRequest';
import { canadapostApiKey } from '../../../config/settings';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
const RelationStatus = [
    {
        value: "Father",
        label: "Father"
    },
    {
        value: "Mother",
        label: "Mother"
    },
    {
        value: "Spouse",
        label: "Spouse"
    },
    {
        value: "Sibling",
        label: "Sibling"
    },
    {
        value: "Friend",
        label: "Friend"
    },
    {
        value: "Other",
        label: "Other"
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
        value: "Non-Binary",
        label: "Non-Binary"
    },
];
const AccountInfoScreen = ({ ACCOUNT_INFO, REG_USER_DATA, savePatientsAccountInfo, clearRegisterData, clearPatientAccounInto }) => {

    const history = useHistory();
    const classes = useStyles();
    const [allDataFilled, setAllDataFilled] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const [state, setState] = useState({
        address: ACCOUNT_INFO?.address ? ACCOUNT_INFO?.address : '',
        city: ACCOUNT_INFO?.city ? ACCOUNT_INFO?.city : '',
        postalCode: ACCOUNT_INFO?.postalCode ? ACCOUNT_INFO?.postalCode : '',
        country: ACCOUNT_INFO?.country ? ACCOUNT_INFO?.country : '',
        province: ACCOUNT_INFO?.province ? ACCOUNT_INFO?.province : '',
        gender: ACCOUNT_INFO?.gender ? ACCOUNT_INFO?.gender : {
            value: "",
            label: ""
        },
        homePhone: ACCOUNT_INFO?.homePhone ? ACCOUNT_INFO?.homePhone : '',
        otherPhone: ACCOUNT_INFO?.otherPhone ? ACCOUNT_INFO?.otherPhone : '',
        emergencyContactName: ACCOUNT_INFO?.emergencyContactName ? ACCOUNT_INFO?.emergencyContactName : '',
        emergencyContactRelation: ACCOUNT_INFO?.emergencyContactRelation ? ACCOUNT_INFO?.emergencyContactRelation : '',
        emergencyContactNumber: ACCOUNT_INFO?.emergencyContactNumber ? ACCOUNT_INFO?.emergencyContactNumber : '',
        HealthCardNumber: ACCOUNT_INFO?.HealthCardNumber ? ACCOUNT_INFO?.HealthCardNumber : '',
        vesrionNum: ACCOUNT_INFO?.vesrionNum ? ACCOUNT_INFO?.vesrionNum : '',
        firstName: REG_USER_DATA?.firstName,
        lastName: REG_USER_DATA?.lastName,
        middleName: REG_USER_DATA?.middleName,
        dob: REG_USER_DATA?.dob,
        email: REG_USER_DATA?.email,
        password: REG_USER_DATA?.password,
        mobilePhone: REG_USER_DATA?.phoneNumber,
        salutation: REG_USER_DATA?.salutation,
        errorMsg: [],
        successMsg: []
    });

    const [addressError, setaddressError] = useState('');
    const [cityError, setcityError] = useState('');
    const [postalCodeError, setpostalCodeError] = useState('');
    const [countryError, setcountryError] = useState('');
    const [provinceError, setprovinceError] = useState('');
    const [genderError, setgenderError] = useState('');
    const [homePhoneError, sethomePhoneError] = useState('');
    const [otherPhoneError, setotherPhoneError] = useState('');
    const [emergencyContactNameError, setemergencyContactNameError] = useState('');
    const [emergencyContactNumberError, setemergencyContactNumberError] = useState('');
    const [emergencyContactRelationError, setemergencyContactRelationError] = useState('');
    const [HealthCardNumberError, setHealthCardNumberError] = useState('');
    const [vesrionNumError, setvesrionNumError] = useState('');
    const [dobError, setdobError] = useState('');
    const [alertBarError, setalertBarError] = useState(false);
    const [healthNoError, setHealthNoError] = useState('Invalid HealthCard No')
    const [successAlertBarError, setsuccessAlertBarError] = useState(false);

    useEffect(() => {
        var strJavascript = `var fields = [{ element: "address", field: "Line1", mode: pca.fieldMode.SEARCH },{ element: "address", field: "Line1", mode: pca.fieldMode.POPULATE }, { element: "city", field: "City", mode: pca.fieldMode.POPULATE },{ element: "province", field: "ProvinceName", mode: pca.fieldMode.POPULATE },{ element: "postalCode", field: "PostalCode" },{ element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY },{ element: "multi-unit", field: "{AcMua}", mode: pca.fieldMode.POPULATE },{ element: "residential-business", field: "{AcRbdi}", mode: pca.fieldMode.POPULATE }], options = {key: "${canadapostApiKey}"},control = new pca.Address(fields, options);`
        eval(strJavascript);
        strJavascript = 'control.listen("populate", function (address) {document.getElementById("address").defaultValue = address.Line1;document.getElementById("address").value = address.Line1;}); control.listen("populate", function (city) {document.getElementById("city").defaultValue = city.City; document.getElementById("city").value = city.City;updateState("city", city.City) });control.listen("populate", function (province) { document.getElementById("province").defaultValue = province.ProvinceName;  document.getElementById("province").value = province.ProvinceName;});control.listen("populate", function (postalCode) {  document.getElementById("postalCode").defaultValue = postalCode.PostalCode; document.getElementById("postalCode").value = postalCode.PostalCode;}); control.listen("populate", function (country) {document.getElementById("country").defaultValue = country.CountryName;document.getElementById("country").value = country.CountryName; });'
        eval(strJavascript);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const ValidateClickButton = () => {
        var AddressVar = (document.getElementById('address')).value;
        var CityVar = (document.getElementById('city')).value;
        var PostalCodeVar = (document.getElementById('postalCode')).value;
        var CountryVar = (document.getElementById('country')).value;
        var ProvinceVar = (document.getElementById('province')).value;
        // validation REGEX
        let hasError = false
        var validRegex = /^[a-zA-Z,.'-][^\s+|s+$/g, ""]*$/;
        var homeNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var healthNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{1})$/;
        var GivenDate = state.dob;
        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);

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
        } else {
            setcityError('')
        }
        // PROVINCE VALIDATION
        if (ProvinceVar === null || ProvinceVar === "") {
            setprovinceError('Province is required..');
            hasError = true
        } else {
            setprovinceError('')
        }
        // POSTAL CODE VALIDATION
        if (PostalCodeVar === null || PostalCodeVar === "") {
            setpostalCodeError('Postal Code is required..');
            hasError = true
        } else {
            setpostalCodeError('')
        }
        // COUNTRY VALIDATION
        if (CountryVar === null || CountryVar === "") {
            setcountryError('Country is required..');
            hasError = true
        } else if (!(validRegex.test(CountryVar))) {
            setprovinceError('Only text text allowed');
            hasError = true
        } else {
            setcountryError('')
        }
        // GENDER VALIDATION
        if (state.gender === null || state.gender === "") {
            setgenderError('Gender is required..');
            hasError = true
        } else if (!(validRegex.test(state.gender))) {
            setgenderError('Gender is required..');
            hasError = true
        } else {
            setgenderError('')
        }
        // HOME PHONE VALIDATION
        if (state.homePhone != '') {
            if (state.homePhone === null || state.homePhone === "") {
                hasError = true
            } else if (!(homeNo.test(state.homePhone))) {
                sethomePhoneError('Invalid Phone number')
                hasError = true
            } else {
                sethomePhoneError('')
            }
        } else {
            sethomePhoneError('')
        }
        // MOBILE  VALIDATION
        if (state.otherPhone != '') {
            if (state.otherPhone === null || state.otherPhone === "") {
                hasError = true
            } else if (!(homeNo.test(state.otherPhone))) {
                setotherPhoneError('Invalid Phone number')
            } else {
                setotherPhoneError('');
            }
        } else {
            setotherPhoneError('')
        }
        //EMERGENCY VALIDATION
        if (state.emergencyContactName) {
            if (state.emergencyContactName === null || state.emergencyContactName === "") {
                hasError = true
            } else if (state.emergencyContactName.length <= 2) {
                setemergencyContactNameError('Name should be minimum 3 characters')
            } else {
                setemergencyContactNameError('')
            }

            if (state.emergencyContactNumber) {
                if (!(homeNo.test(state.emergencyContactNumber))) {
                    setemergencyContactNumberError('Invalid emergency contact number')
                    hasError = true
                } else {
                    setemergencyContactNumberError('')
                }
            } else {
                setemergencyContactNumberError('Invalid emergency contact number')
            }

            if (state.emergencyContactRelation) {
                setemergencyContactRelationError('')
            } else {
                setemergencyContactRelationError('Please select relationship')
            }
        } else {
            setemergencyContactNameError('')
            setemergencyContactNumberError('')
            setemergencyContactRelationError('')
        }

        if (state.HealthCardNumber === null || state.HealthCardNumber === "") {
            setHealthCardNumberError('Health card number required');
            hasError = true
        }
        else if (!(healthNo.test(state.HealthCardNumber))) {
            setHealthCardNumberError('Invalid Health card number')
            hasError = true
        } else {
            setHealthCardNumberError('')
        } if (state.vesrionNum === null || state.vesrionNum === "") {
            setvesrionNumError('Health card number is required.');
            hasError = true
        } else {
            setvesrionNumError('')
        }
        return hasError;
    };

    const onNext = () => {
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

        let hasError = ValidateClickButton()
        if (!hasError) {
            validateHealthCardNumber()
        }
    }

    const handleBack = () => {
        history.push({ pathname: '/reg', search: `?tenant=${TENANT_ID}` })
    };

    const validateHealthCardNumber = async () => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('health-card', state.HealthCardNumber);
        var requestOption = {
            method: 'GET',
            headers: myHeaders
        };
        let URL = `validation/healthCard?tenant=${TENANT_ID}`;
        let response = await getRequest(URL, true, requestOption);
        setLoading(false);
        if (response.ok) {
            let result = await response.text();
            if (result === 'Valid health card') {
                userRegisterData()
            } else {
                setHealthCardNumberError(healthNoError)
            }
        }
    }

    const userRegisterData = async () => {
        setLoading(true);
        const requestOption = {
            method: 'POST',
            RequestMode: "no-cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userType: "PATIENT",
                firstName: state.firstName,
                lastName: state.lastName,
                middleName: REG_USER_DATA?.middleName,
                salutation: state.salutation,
                dateOfBirth: state.dob,
                authPhoneNumber: state.mobilePhone,
                email: state.email,
                password: REG_USER_DATA.password
            })
        }

        let URL = `user?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, null, true, requestOption);
        setLoading(false);
        let data = await response.json();
        if (response.status === 200) {
            console.log('success data' + JSON.stringify(data))
            localStorage.setItem('userType', JSON.stringify(data.userType))
            localStorage.setItem('sysUserId', data.sysUserId);
            savePatientsAccountData(data.sysUserId)
        } else {
            setalertBarError(true);
            updateState('errorMsg', data.exception)
            console.log('error' + JSON.stringify(data.exception))
        }
    }

    const savePatientsAccountData = async (userID) => {
        setLoading(true);
        var AddressSendVar = (document.getElementById('address')).value;
        var CitySendVar = (document.getElementById('city')).value;
        var PostalCodeSendVar = (document.getElementById('postalCode')).value;
        var CountrySendVar = (document.getElementById('country')).value;
        var ProvinceSendVar = (document.getElementById('province')).value;
        let ISO_countryCode = countries.getAlpha2Code(CountrySendVar, "en")
        let body = JSON.stringify({
            gender: state.gender,
            dateOfBirth: state.dob,
            email: state.email,
            addressLine1: AddressSendVar,
            addressLine2: CitySendVar,
            addressLine3: ISO_countryCode,
            firstName: state.firstName,
            lastName: state.lastName,
            middleName: REG_USER_DATA?.middleName,
            homePhoneNum: state.phoneNumber,
            cellPhoneNum: state.mobilePhone,
            otherPhoneNum: state.otherPhone,
            primaryLang: 'Eng',
            secondaryLang: 'Hin',
            salutation: state.salutation,
            providerType: "PATIENT",
            postalZipCode: PostalCodeSendVar,
            emergencyContactName: state.emergencyContactName,
            emergencyContactPhoneNum: state.emergencyContactNumber,
            emergencyContactRelation: state.emergencyContactRelation,
            addresses: [
                {
                    addressDetail: {
                        addressCode: "PRIMARY",
                        addressDetailId: 0,
                        addressLine1: AddressSendVar,
                        addressLine2: "Address 2",
                        addressLine3: "Address 3",
                        city: CitySendVar,
                        countryCode: ISO_countryCode,
                        stateProvinceId: 0,
                        stateProvinceDescription: ProvinceSendVar,
                        tenant: TENANT_ID,
                        zipCode: PostalCodeSendVar
                    },
                    addressType: "PRIMARY",
                    tenant: TENANT_ID
                }],
            guardian: {
                cellPhoneNumber: state.emergencyContactNumber,
                email: "string",
                firstName: state.emergencyContactName,
                tenant: "string"
            }
        })
        let URL = `patient/` + userID + `?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, body, false);
        setLoading(false);
        let data = await response.json();
        if (response.status === 200) {
            console.log('success' + JSON.stringify(response.status))
            savePatientHealthCard(data.patientId)
        } else {
            setalertBarError(true)
            updateState('errorMsg', data.error)
            console.log('error' + JSON.stringify(data.error))
        }
    }

    const savePatientHealthCard = async (patientId) => {
        setLoading(true);
        const body = JSON.stringify({
            firstName: state.firstName,
            lastName: state.lastName,
            healthCardIssuedBy: 'ON',
            privateInsuranceInfo: '',
            healthCardDto: {
                healthcardNumber: state.HealthCardNumber,
                versionNumber: state.vesrionNum
            }
        })
        const URL = `patient/publicHealthCard/` + patientId + `?tenant=${TENANT_ID}`;
        const response = await postRequest(URL, body, false);
        setLoading(false);
        const data = await response.json();
        if (response.status === 200) {
            console.log('success' + JSON.stringify(data))
            setsuccessAlertBarError(true)
            clearRegisterData();
            clearPatientAccounInto();
            updateState('successMsg', 'You are registered successfully')
            setTimeout(() => {
                history.push({
                    pathname: '/twoFactor',
                    data: { email: state.email },
                    search: `?tenant=${TENANT_ID}`
                });
            }, 1500)
        }
        else {
            setalertBarError(true)
            updateState('errorMsg', data.error)
            console.log('error' + JSON.stringify(data.error))
        }
    }

    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setalertBarError(false);
        setsuccessAlertBarError(false);
    };
    const changeAddress = (address) => {
        updateState('address', address)
    }
    const changeCity = (city) => {
        updateState('city', city)
    }
    const changePostalCode = (postalCode) => {
        updateState('postalCode', postalCode)
    }
    const changeProvince = (province) => {
        updateState('province', province)
    }
    const changeCountry = (country) => {
        updateState('country', country)
    }
    const PhoneValidation = (mobilePhone) => {
        const value = mobilePhone.replace(/\D/g, "");
        updateState('mobilePhone', value);
    };
    const otherPhoneValidation = (otherPhone) => {
        const value = otherPhone.replace(/\D/g, "");
        updateState('otherPhone', value);
    };
    const EmergencyPhoneValidation = (emergencyContactNumber) => {
        const value = emergencyContactNumber.replace(/\D/g, "");
        updateState('emergencyContactNumber', value);
    };
    const HomePhoneValidation = (homePhone) => {
        const value = homePhone.replace(/\D/g, "");
        updateState('homePhone', value);
    };

    const saveToReducer = () => {
        let formData = {
            address: state.address.trim(),
            city: state.city.trim(),
            postalCode: state.postalCode.trim(),
            country: state.country.trim(),
            province: state.province.trim(),
            homePhone: state.homePhone.trim(),
            otherPhone: state.otherPhone.trim(),
            emergencyContactName: state.emergencyContactName.trim(),
            emergencyContactRelation: state.emergencyContactRelation.trim(),
            emergencyContactNumber: state.emergencyContactNumber.trim(),
            HealthCardNumber: state.HealthCardNumber.trim(),
            gender: state.gender,
            vesrionNum: state.vesrionNum.trim(),
            firstName: state.firstName.trim(),
            lastName: state.lastName.trim(),
            dob: state.dob.trim(),
            email: state.email.trim(),
            mobilePhone: state.mobilePhone.trim(),
            salutation: state.salutation.trim(),
        }
        setState(formData)
        savePatientsAccountInfo(formData)
    }

    const onChangeHealthCard = (HealthCardNumber) => {
        const value = HealthCardNumber.replace(/\D/g, "");
        updateState('HealthCardNumber', value);
    }

    return (
        <Router>
            <Header />
            <div className={classes.mainContainer}>
                {/* <StepperView activeStep={activeStep} /> */}
                <Paper elevation={0} className={classes.subContainerPaper}>
                    <Container className={classes.subContainer}>
                        <Typography component="h3" variant="h3" className={classes.text}>
                            Account Info
                        </Typography>
                        <form className={classes.formView} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Salutation
                                    </Typography>
                                    <TextField
                                        value={state.salutation}
                                        inputProps={{ readOnly: true }}
                                        variant="outlined"
                                        id="salutation"
                                        fullWidth
                                        required
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        First name
                                    </Typography>
                                    <TextField
                                        inputProps={{ readOnly: true }}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        value={state.firstName}
                                        onChange={(firstName) => {
                                            updateState('firstName', firstName.target.value);
                                        }}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Last name
                                    </Typography>
                                    <TextField
                                        inputProps={{ readOnly: true }}
                                        autoComplete="lname"
                                        name="lastName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        value={state.lastName}
                                        onChange={(lastName) => {
                                            updateState('lastName', lastName.target.value);
                                        }}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Email
                                    </Typography>
                                    <TextField
                                        inputProps={{ readOnly: true }}
                                        autoComplete="email"
                                        name="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        value={state.email}
                                        onChange={(email) => {
                                            updateState('email', email.target.value)
                                        }}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Gender
                                    </Typography>
                                    <TextField
                                        id="gender"
                                        select
                                        variant="outlined"
                                        fullWidth
                                        value={state.gender}
                                        onChange={(gender) => {
                                            updateState('gender', gender.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        error={genderError !== ''}
                                        helperText={genderError}
                                        size={'small'}
                                    >
                                        {genderList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Date Of Birth
                                    </Typography>
                                    <TextField
                                        inputProps={{ readOnly: true }}
                                        name="DateOfBirth"
                                        variant="outlined"
                                        required
                                        type='date'
                                        fullWidth
                                        id="dob"
                                        value={state.dob}
                                        onChange={(dob) => {
                                            updateState('dob', dob.target.value);
                                        }}
                                        error={dobError !== ''}
                                        helperText={dobError}
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
                                        onBlur={() => saveToReducer(state)}
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
                                        fullWidth
                                        id="city"
                                        onChange={(city) => {
                                            changeCity(city.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
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
                                        onChange={(postalCode) => {
                                            changePostalCode(postalCode.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
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
                                        autoComplete="country"
                                        name="country"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="country"
                                        onChange={(country) => {
                                            changeCountry(country.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        error={countryError !== ''}
                                        helperText={countryError}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Province
                                    </Typography>
                                    <TextField
                                        id="province"
                                        variant="outlined"
                                        onChange={(province) => {
                                            changeProvince(province.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        fullWidth
                                        required
                                        error={provinceError !== ''}
                                        helperText={provinceError}
                                        size={'small'}
                                    >
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
                                        inputProps={{ readOnly: true }}
                                        inputProps={{ maxLength: 10 }}
                                        required
                                        fullWidth
                                        id="mobilePhone"
                                        type="tel"
                                        value={state.mobilePhone}
                                        onChange={(mobilePhone) => {
                                            PhoneValidation(mobilePhone.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
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
                                        onChange={(homePhone) => {
                                            HomePhoneValidation(homePhone.target.value);
                                        }}
                                        inputProps={{ maxLength: 10 }}
                                        onBlur={() => saveToReducer(state)}
                                        error={homePhoneError !== ''}
                                        helperText={homePhoneError}
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
                                        onChange={(otherPhone) => {
                                            otherPhoneValidation(otherPhone.target.value);
                                        }}
                                        inputProps={{ maxLength: 10 }}
                                        onBlur={() => saveToReducer(state)}
                                        error={otherPhoneError !== ''}
                                        helperText={otherPhoneError}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography className={classes.titleSubText}>EMERGENCY CONTACT</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Contact  Name
                                    </Typography>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        value={state.emergencyContactName}
                                        onChange={(emergencyContactName) => {
                                            updateState('emergencyContactName', emergencyContactName.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        error={emergencyContactNameError !== ''}
                                        helperText={emergencyContactNameError}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Contact Phone Number
                                    </Typography>
                                    <TextField
                                        autoComplete="phoneNumber"
                                        name="phoneNumber"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="emPhoneNumber"
                                        type="tel"
                                        value={state.emergencyContactNumber}
                                        onChange={(emergencyContactNumber) => {
                                            EmergencyPhoneValidation(emergencyContactNumber.target.value);
                                        }}
                                        inputProps={{ maxLength: 10 }}
                                        onBlur={() => saveToReducer(state)}
                                        error={emergencyContactNumberError !== ''}
                                        helperText={emergencyContactNumberError}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={classes.formText}>
                                        Contact Relationship
                                    </Typography>
                                    <TextField
                                        id="relationship"
                                        select
                                        variant="outlined"
                                        fullWidth
                                        value={state.emergencyContactRelation}
                                        onChange={(emergencyContactRelation) => {
                                            updateState('emergencyContactRelation', emergencyContactRelation.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        error={emergencyContactRelationError !== ''}
                                        helperText={emergencyContactRelationError}
                                        size={'small'}
                                    >
                                        {RelationStatus.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography className={classes.titleSubText}>HEALTH CARD</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography className={classes.formText}>
                                        Health card number
                                    </Typography>
                                    <TextField
                                        autoComplete="HealthCardNumber"
                                        name="HealthCardNumber"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="HealthCardNumber"
                                        inputProps={{ maxLength: 11 }}
                                        value={state.HealthCardNumber}
                                        onChange={(HealthCardNumber) => {
                                            onChangeHealthCard(HealthCardNumber.target.value)
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        error={HealthCardNumberError !== ''}
                                        helperText={HealthCardNumberError}
                                        size={'small'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography className={classes.formText}>
                                        Version number
                                    </Typography>
                                    <TextField
                                        autoComplete="vesrionNum"
                                        id="vesrionNum"
                                        variant="outlined"
                                        value={state.vesrionNum}
                                        onChange={(vesrionNum) => {
                                            updateState('vesrionNum', vesrionNum.target.value);
                                        }}
                                        onBlur={() => saveToReducer(state)}
                                        fullWidth
                                        required
                                        type="tel"
                                        error={vesrionNumError !== ''}
                                        helperText={vesrionNumError}
                                        inputProps={{ maxLength: 2 }}
                                        size={'small'}
                                    >
                                    </TextField>
                                </Grid>
                                <Box style={{}}>
                                    <Snackbar open={alertBarError} onClose={alertClose} autoHideDuration={3000} >
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
                            </Grid>

                        </form>
                    </Container>
                </Paper>
                <Box className={classes.Button}>
                    {/* <Button onClick={handleBack} className={classes.cancelBtn}>
                        <Typography className={classes.cancelText} >Back</Typography>
                    </Button> */}
                    <FormButton
                        title="Back"
                        onClick={handleBack}
                        buttonStyle={{ width: '12%', marginRight: 12 }}
                        variant="outlined"
                    />
                    <FormButton
                        loading={loading}
                        title="Next"
                        onClick={onNext}
                        buttonStyle={{ width: '12%' }}
                    />
                </Box>
            </div>
        </Router>


    )
}


const mapStateToProps = (state) => (
    {
        REG_USER_DATA: state.RegisterDuck.regUser,
        ACCOUNT_INFO: state.PatientAccountInfoDuck.patientAccountInfo
    });

export default connect(mapStateToProps, { savePatientsAccountInfo, clearPatientAccounInto, clearRegisterData })(AccountInfoScreen);

