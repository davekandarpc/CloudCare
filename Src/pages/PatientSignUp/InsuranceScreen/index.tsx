import React, { useState, useEffect } from 'react'
import { useStyles } from './styles';
import { Container, Grid, Typography, Box, TextField, Button, Paper, } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import MedicalInfoScreen from '../MedicalInfoScreen';
import StepperView from '../../../components/StepperView';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { postRequest } from '../../../common/fetchRequest';
import { savePatientsPaymentInfo } from '../../../ducks/PatientPaymentInfoDuck/action';
import { connect } from 'react-redux';
import { URL_PATH } from '../../../config/uriConfig';
import { accessSync } from 'node:fs';
const CompanyName = [
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
const InsuranceScreen = ({ PAYMENT_INFO, ACCOUNT_INFO, savePatientsPaymentInfo }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = React.useState(3);
    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
        console.log('Date 1123: ' + state.expiry);
    };
    const [state, setState] = useState({
        Country: PAYMENT_INFO?.payload?.patientAccountInfo?.Country ? PAYMENT_INFO?.payload?.patientAccountInfo?.Country : '',
        province: PAYMENT_INFO?.payload?.patientAccountInfo?.province ? PAYMENT_INFO?.payload?.patientAccountInfo?.province : '',
        paymentMethod: PAYMENT_INFO?.payload?.patientAccountInfo?.paymentMethod ? PAYMENT_INFO?.payload?.patientAccountInfo?.paymentMethod : '',
        cardNumber: PAYMENT_INFO?.payload?.patientAccountInfo?.cardNumber ? PAYMENT_INFO?.payload?.patientAccountInfo?.cardNumber : '',
        CompanyName: PAYMENT_INFO?.payload?.patientAccountInfo?.CompanyName ? PAYMENT_INFO?.payload?.patientAccountInfo?.firstName : '',
        expiry: PAYMENT_INFO?.payload?.patientAccountInfo?.expiry ? PAYMENT_INFO?.payload?.patientAccountInfo?.expiry : '',
        cvv: PAYMENT_INFO?.payload?.patientAccountInfo?.cvv ? PAYMENT_INFO?.payload?.patientAccountInfo?.cvv : '',
        cardHolderName: PAYMENT_INFO?.payload?.patientAccountInfo?.cardHolderName ? PAYMENT_INFO?.payload?.patientAccountInfo?.cardHolderName : '',
        socialSecurityNumber: PAYMENT_INFO?.payload?.patientAccountInfo?.socialSecurityNumber ? PAYMENT_INFO?.payload?.patientAccountInfo?.socialSecurityNumber : '',
        policyHolderName: PAYMENT_INFO?.payload?.patientAccountInfo?.policyHolderName ? PAYMENT_INFO?.payload?.patientAccountInfo?.policyHolderName : '',
        groupPolicyNumber: PAYMENT_INFO?.payload?.patientAccountInfo?.groupPolicyNumber ? PAYMENT_INFO?.payload?.patientAccountInfo?.groupPolicyNumber : '',
        HealthCardNumber: PAYMENT_INFO?.payload?.patientAccountInfo?.HealthCardNumber ? PAYMENT_INFO?.payload?.patientAccountInfo?.HealthCardNumber : '',
        vesrionNum: PAYMENT_INFO?.payload?.patientAccountInfo?.vesrionNum ? PAYMENT_INFO?.payload?.patientAccountInfo?.vesrionNum : ''
    });
    const [CountryError, setCountryError] = useState('');
    const [provinceError, setprovinceError] = useState('');
    const [paymentMethodError, setpaymentMethodError] = useState('');
    const [cardNumberError, setcardNumberError] = useState('');
    const [CompanyNameError, setCompanyNameError] = useState('');
    const [expiryError, setexpiryError] = useState('');
    const [cvvError, setcvvError] = useState('');
    const [cardHolderNameError, setcardHolderNameError] = useState('');
    const [socialSecurityNumberError, setsocialSecurityNumberError] = useState('');
    const [policyHolderNameError, setpolicyHolderNameError] = useState('');
    const [groupPolicyNumberError, setgroupPolicyNumberError] = useState('');
    const [HealthCardNumberError, setHealthCardNumberError] = useState('');
    const [vesrionNumError, setvesrionNumError] = useState('');

    const ValidateClickButton = () => {
        let hasError = false
        var validRegex = /^[a-zA-Z,.'-]*$/;
        var postalCodeNo = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        var homeNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var socialCardNum = /^(3[47][0-9]{13}|(6541|6556)[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})|63[7-9][0-9]{13}|(?:2131|1800|35\d{3})\d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))|(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}|(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}|(62[0-9]{14,17})|4[0-9]{12}(?:[0-9]{3})?|(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}))$/
        var policyNum = /^([0-9]){7}$/;
        var cvvNum = /^[0-9]{3,4}$/;
        if (state.Country === null || state.Country === "" || !(validRegex.test(state.Country))) {
            setCountryError('Country is required');
            hasError = true
        } else {
            setCountryError('')
        }
        if (state.province === null || state.province === "") {
            setprovinceError('Province is required..');
            hasError = true
        } else {
            setprovinceError('')
        }
        if (state.socialSecurityNumber === null || state.socialSecurityNumber === "" || !(socialCardNum.test(state.socialSecurityNumber))) {
            setsocialSecurityNumberError('Social Security Number is required..');
            hasError = true
        } else {
            setsocialSecurityNumberError('')
        }
        if (state.CompanyName === null || state.CompanyName === "") {
            setCompanyNameError('Company name is required..');
            hasError = true
        } else {
            setCompanyNameError('')
        }
        if (state.policyHolderName === null || state.policyHolderName === "") {
            setpolicyHolderNameError('Policy holder name is required..');
            hasError = true
        } else {
            setpolicyHolderNameError('')
        }
        if (state.groupPolicyNumber === null || state.groupPolicyNumber === "" || !(policyNum.test(state.groupPolicyNumber))) {
            setgroupPolicyNumberError('Group policy number is required..');
            hasError = true
        } else {
            setgroupPolicyNumberError('')
        }
        if (state.cardNumber === null || state.cardNumber === "" || !(policyNum.test(state.cardNumber))) {
            setcardNumberError('Credit card number is required..');
            hasError = true
        } else {
            setcardNumberError('')
        }
        if (state.expiry === null || state.expiry === "") {
            setexpiryError('Expiry is required..');
            hasError = true
        } else {
            setexpiryError('')
        }
        if (state.cvv === null || state.cvv === "" || !(cvvNum.test(state.cvv))) {
            setcvvError('CVV is required..');
            hasError = true
        } else {
            setcvvError('')
        }
        if (state.cardHolderName === null || state.cardHolderName === "") {
            setcardHolderNameError('Card holder name is required..');
            hasError = true
        } else {
            setcardHolderNameError('')
        }
        if (state.HealthCardNumber === null || state.HealthCardNumber === "") {
            setHealthCardNumberError('Health card number is required.');
            hasError = true
        } else {
            setHealthCardNumberError('')
        }
        if (state.vesrionNum === null || state.vesrionNum === "") {
            setvesrionNumError('Health card number is required.');
            hasError = true
        } else {
            setvesrionNumError('')
        }
        return hasError;
    };
    const onSubmit = async () => {
        let hasError = ValidateClickButton()
        if (!hasError) {
            savePatientsPaymentInfo(state);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            let FormData = { PAYMENT_INFO, ACCOUNT_INFO };
            console.log('FormData: ' + JSON.stringify(FormData))
            
            const response = await postRequest('login?tenant=tenant', JSON.stringify(FormData), true);
            if(response.ok) {
                alert('success' + FormData)
            }
            // history.push({ pathname: '/medical' })
        }
    }
    // const saveUserInfoREST = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             providerType: 'PATIENT_ACCOUNT_INFO_REDUSER',
    //             firstName: ACCOUNT_INFO?.patientAccountInfo?.firstName,
    //             lastName: ACCOUNT_INFO?.patientAccountInfo?.lastName
    //         })
    //     };
    //     console.log(
    //         JSON.stringify(requestOptions)
    //     );

    //     fetch(BACK_END_URL_CONTEXT_PATH + 'login?tenant=tenant', requestOptions)
    //         .then(async response => {
    //             const data = await response.json();
    //             alert('response' + JSON.stringify(response))

    //         })
    //         .catch(error => {
    //             console.error('There was an error!', + error)
    //         })
    // };


    return (
        <Router>
            <Header />
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <StepperView activeStep={activeStep} />
                    <Paper elevation={0} className={classes.subContainerPaper}>
                        <Container>
                            <Typography component="h3" variant="h3" className={classes.text}>
                                4. HEALTH CARD
                            </Typography>
                            <form className={classes.formView} noValidate>
                                <Grid container spacing={2}>
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
                                            value={state.HealthCardNumber}
                                            onChange={(HealthCardNumber) => updateState('HealthCardNumber', HealthCardNumber.target.value)}
                                            error={HealthCardNumberError !== ''}
                                            helperText={HealthCardNumberError}
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
                                            onChange={(vesrionNum) => updateState('vesrionNum', vesrionNum.target.value)}
                                            fullWidth
                                            required
                                            error={vesrionNumError !== ''}
                                            helperText={vesrionNumError}>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                {/* <Typography component="h1" variant="h5" align="left" className={classes.subtitleText}>
                                    PUBLIC INSURANCE
                                </Typography> 
                                 <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            COUNTRY
                                        </Typography>
                                        <TextField
                                            autoComplete="Country"
                                            name="Country"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="Country"
                                            value={state.Country}
                                            onChange={(evt) => updateState('Country', evt.target.value)}
                                            error={CountryError !== ''}
                                            helperText={CountryError}
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
                                            onChange={(evt) => updateState('province', evt.target.value)}
                                            fullWidth
                                            required
                                            error={provinceError !== ''}
                                            helperText={provinceError}>
                                            {provinceList.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Social security number
                                </Typography>
                                        <TextField
                                            autoComplete="city"
                                            name="city"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="city"
                                            value={state.socialSecurityNumber}
                                            onChange={(evt) => updateState('socialSecurityNumber', evt.target.value)}
                                            error={socialSecurityNumberError !== ''}
                                            helperText={socialSecurityNumberError}
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={12}>
                                        <Typography component="h1" variant="h5" align="left" className={classes.subtitleText}>
                                            PRIVATE INSURANCE
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography className={classes.formText}>
                                            Insurance company name
                                </Typography>
                                        <TextField
                                            id="province"
                                            select
                                            variant="outlined"
                                            value={state.CompanyName}
                                            onChange={(evt) => updateState('CompanyName', evt.target.value)}
                                            fullWidth
                                            required
                                            error={CompanyNameError !== ''}
                                            helperText={CompanyNameError}
                                        >
                                            {CompanyName.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Policy holder name
                                </Typography>
                                        <TextField
                                            autoComplete="policyHolderName"
                                            name="policyHolderName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="homePhone"
                                            value={state.policyHolderName}
                                            onChange={(evt) => updateState('policyHolderName', evt.target.value)}
                                            error={policyHolderNameError !== ''}
                                            helperText={policyHolderNameError}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Group policy number
                                </Typography>
                                        <TextField
                                            autoComplete="groupPolicyNumber"
                                            name="groupPolicyNumber"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="groupPolicyNumber"
                                            type="number"
                                            value={state.groupPolicyNumber}
                                            onChange={(evt) => updateState('groupPolicyNumber', evt.target.value)}
                                            error={groupPolicyNumberError !== ''}
                                            helperText={groupPolicyNumberError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography component="h1" variant="h5" align="left" className={classes.subtitleText}>
                                            Payment
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Box className={classes.CheckBoxView}>
                                            <RadioGroup className={classes.radioGroup} aria-label="gender"
                                                name="gender1"
                                                value={state.paymentMethod}
                                                onChange={(evt) => updateState('paymentMethod', evt.target.value)}
                                            >
                                                <FormControlLabel value="Credit Card" control={<Radio color="primary" />} label="Credit Card" />
                                                <FormControlLabel value="Paypal" control={<Radio color="primary" />} label="Paypal" />
                                            </RadioGroup>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Credit card number
                                </Typography>
                                        <TextField
                                            autoComplete="cardNumber"
                                            name="cardNumber"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="cardNumber"
                                            value={state.cardNumber}
                                            onChange={(evt) => updateState('cardNumber', evt.target.value)}
                                            error={cardNumberError !== ''}
                                            helperText={cardNumberError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Expiry
                                </Typography>
                                        <TextField
                                            autoComplete="expiry"
                                            name="expiry"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="expiry"
                                            type='date'
                                            value={state.expiry}
                                            onChange={(evt) => updateState('expiry', evt.target.value)}
                                            error={expiryError !== ''}
                                            helperText={expiryError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            CVV
                                </Typography>
                                        <TextField
                                            autoComplete="city"
                                            name="city"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="city"
                                            type="password"
                                            value={state.cvv}
                                            onChange={(evt) => updateState('cvv', evt.target.value)}
                                            error={cvvError !== ''}
                                            helperText={cvvError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.formText}>
                                            Card holder name
                                </Typography>
                                        <TextField
                                            autoComplete="city"
                                            name="city"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="city"
                                            value={state.cardHolderName}
                                            onChange={(evt) => updateState('cardHolderName', evt.target.value)}
                                            error={cardHolderNameError !== ''}
                                            helperText={cardHolderNameError}
                                        />
                                    </Grid> 
                                </Grid>*/}
                            </form>
                        </Container>
                    </Paper>
                    <Box className={classes.Button}>
                        <Button className={classes.cancelBtn}>
                            <Typography className={classes.cancelText}>Cancel</Typography>
                        </Button>
                        <FormButton title="Done" onClick={onSubmit} />
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
    console.warn(JSON.stringify(state)),
    {
        PAYMENT_INFO: state.PatientPaymentInfoDuck.patientPaymentInfo,
        ACCOUNT_INFO: state.PatientAccountInfoDuck.patientAccountInfo,
    });

export default connect(mapStateToProps, { savePatientsPaymentInfo })(InsuranceScreen);

