import React, { useState } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormButton from '../../components/FormButton';
import {
	Checkbox,
	FormControlLabel
} from '@material-ui/core';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { saveRegister } from '../../ducks/RegisterDuck/action';
import { useHistory } from 'react-router-dom';
import { TENANT_ID } from '../../config/TenantConfig';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { Colors } from '../../styles'
import { getRequest } from '../../common/fetchRequest';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '650px',
		marginTop: theme.spacing(9),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		marginTop: 16,
		marginBottom: theme.spacing(10),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signUpButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '2rem',
	},
	signUpText: {
		padding: '0.5rem 2rem',
		...Colors.regularFont,
	},
	regButton: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1.5rem',
	},
	text: {
		textAlign: 'left',
		marginLeft: '0rem',
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
	},
	textReg: {
		...Colors.mediumFont,
		textAlign: 'center',
		color: Colors.FONT_COLOR,
		fontSize: 32
	},
}));

const salutationList = [
	{
		value: 'Mr.',
		label: 'Mr.',
	},
	{
		value: 'Mrs.',
		label: 'Mrs.',
	},
	{
		value: 'Miss',
		label: 'Miss',
	},
	{
		value: 'Dr.',
		label: 'Dr.',
	},
	{
		value: 'Ms.',
		label: 'Ms.',
	},
];

const RegisterScreen = ({ saveRegister, REG_USER_DATA }) => {
	const history = useHistory();
	const classes = useStyles();
	const updateState = (field, value) => {
		setState((previous) => ({ ...previous, [field]: value }));
	};
	const [state, setState] = useState({
		firstName: REG_USER_DATA?.firstName,
		lastName: REG_USER_DATA?.lastName,
		middleName: REG_USER_DATA?.middleName,
		salutation: REG_USER_DATA?.salutation,
		dob: REG_USER_DATA?.dob,
		phoneNumber: REG_USER_DATA?.phoneNumber,
		email: REG_USER_DATA?.email,
		password: REG_USER_DATA?.password,
		confirmPassword: REG_USER_DATA?.confirmPassword,
		errorMsg: [],
		userId: '',
		termsConditionChecked: REG_USER_DATA.termsConditionChecked
	});

	const [firstNameError, setfirstNameError] = useState('');
	const [lastNameError, setlastNameError] = useState('');
	const [salutationError, setsalutationError] = useState('');
	const [dobError, setdobError] = useState('');
	const [phoneNumberError, setphoneNumberError] = useState('');
	const [emailError, setemailError] = useState('');
	const [passwordError, setpasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const alertBarError = 'email already exists!';
	const [formError, setformError] = useState('')

	const validateConfirmPassword = (value) => {
		updateState('confirmPassword', value);
        if (state.password != value) {
            setConfirmPasswordError('Confirm Password must be same as password')
        } else {
            setConfirmPasswordError('');
        }
	}

	const RegisterValidation = () => {
		let hasError = false;
		var validRegex = /^[a-zA-Z,.'-]*$/;
		var emailValidRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
		let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var GivenDate = state.dob;
		var CurrentDate = new Date();
		GivenDate = new Date(GivenDate);

		// FIRST NAME VALIDATION
		if (state.firstName === null || state.firstName === '') {
			setfirstNameError('First name is required');
			hasError = true;
		} else if (state.firstName.length <= 2) {
			setfirstNameError('Name should be minimum 3 characters');
			hasError = true;
		} else if (!validRegex.test(state.firstName)) {
			setfirstNameError('Only characters allowed');
			hasError = true;
		} else {
			setfirstNameError('');
		}
		// LAST NAME VALIDATION
		if (state.lastName === null || state.lastName === '') {
			setlastNameError('Last name is required');
			hasError = true;
		} else if (state.lastName.length <= 2) {
			setlastNameError('Name should be minimum 3 characters');
			hasError = true;
		} else if (!validRegex.test(state.lastName)) {
			setlastNameError('Only text text allowed');
			hasError = true;
		} else {
			setlastNameError('');
		}
		// SALUTATION NAME VALIDATION
		if (
			state.salutation === null ||
			state.salutation === '' ||
			state.salutation.length <= 2 ||
			!validRegex.test(state.salutation)
		) {
			setsalutationError('Salutation is required');
			hasError = true;
		} else {
			setsalutationError('');
		}
		// DATE OF BIRTH VALIDATION
		if (state.dob === null || state.dob === '') {
			setdobError('Date of birth is required');
			hasError = true;
		} else if (GivenDate > CurrentDate) {
			setdobError('Select valid date');
			hasError = true;
		} else {
			setdobError('');
		}
		// PHONE NUMBER VALIDATION
		if (state.phoneNumber === null || state.phoneNumber === '') {
			setphoneNumberError('Phone Number is required');
			hasError = true;
		} else if (!phoneNo.test(state.phoneNumber)) {
			setphoneNumberError('Invalid Phone number');
			hasError = true;
		} else {
			setphoneNumberError('');
		}
		// E-MAIL VALIDATION
		if (state.email === null || state.email === '') {
			setemailError('Email address is required');
			hasError = true;
		} else if (!emailValidRegex.test(state.email)) {
			setemailError('Email is not valid');
			hasError = true;
		} else {
			setemailError('');
		}
		// PASSWORD VALIDATION
		var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
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

		if (!state.termsConditionChecked) {
			hasError = true;
			setformError('Please accept terms and conditions')
		} else {
			setformError('')
		}
		return hasError;
	};

	const ValidateRegisterClick = () => {
		let hasError = RegisterValidation();
		if (!hasError) {
			userEmailVerification()
		}
	};

	const userEmailVerification = async () => {
		setState((previous) => ({ ...previous, loading: true }));
		const requestOption = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', email: state.email },
		};
		let URL = `user/validation/email?tenant=${TENANT_ID}`;
		let response = await getRequest(URL, true, requestOption);
		let data = await response.text()
		setState((previous) => ({ ...previous, loading: false }));
		if (response.ok) {
			handleNext(data);
		} else {
			setemailError(alertBarError)
		}
	};
	const handleNext = (data) => {
		saveRegister(state);
		history.push({ pathname: '/acc', search: `?tenant=${TENANT_ID}` });
	};

	const PhoneValidation = (phoneNumber) => {
		const value = phoneNumber.replace(/\D/g, "");
		updateState('phoneNumber', value);
	};

	return (
		<div className={classes.divRoot}>
			<Header />
			<Container maxWidth="sm">
				<Typography className={classes.textReg}>
					Register Today
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>Salutation</Typography>
							<TextField
								id="salutation"
								select
								variant="outlined"
								fullWidth
								value={state.salutation}
								onChange={(salutation) => updateState('salutation', salutation.target.value)}
								error={salutationError !== ''}
								helperText={salutationError}
								size={'small'}
							>
								{salutationList.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>First name</Typography>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								value={state.firstName}
								onChange={(firstName) => updateState('firstName', firstName.target.value)}
								onBlur={() => {
									updateState('firstName', state.firstName.trim())
								}}
								error={firstNameError !== ''}
								helperText={firstNameError}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>Middle name</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="middleName"
								name="middleName"
								autoComplete="mname"
								value={state.middleName}
								onChange={(middleName) => updateState('middleName', middleName.target.value)}
								onBlur={() => updateState('middleName', state.middleName.trim())}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>Last name</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								name="lastName"
								autoComplete="lname"
								value={state.lastName}
								onChange={(lastName) => updateState('lastName', lastName.target.value)}
								onBlur={(lastName) => updateState('lastName', state.lastName.trim())}
								error={lastNameError !== ''}
								helperText={lastNameError}
								size={'small'}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>Date Of Birth</Typography>
							<TextField
								name="DateOfBirth"
								variant="outlined"
								required
								type="date"
								fullWidth
								id="dob"
								value={state.dob}
								onChange={(dob) => updateState('dob', dob.target.value)}
								error={dobError !== ''}
								helperText={dobError}
								InputProps={{ inputProps: { max: new Date().toISOString().split('T')[0] } }}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>Phone Number</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phoneNumber"
								name="Phone Number"
								inputProps={{ maxLength: 10 }}
								autoComplete="phoneNumber"
								value={state.phoneNumber}
								onChange={(phoneNumber) => PhoneValidation(phoneNumber.target.value)}
								onBlur={(phoneNumber) => updateState('phoneNumber', state.phoneNumber.trim())}
								error={phoneNumberError !== ''}
								helperText={phoneNumberError}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.text}>Email</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								name="email"
								autoComplete="email"
								value={state.email}
								onChange={(email) => updateState('email', email.target.value)}
								onBlur={(email) => updateState('email', state.email.trim())}
								error={emailError !== ''}
								helperText={emailError}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.text}>Password</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								type="password"
								autoComplete="password"
								value={state.password}
								onChange={(password) => updateState('password', password.target.value)}
								onBlur={(password) => updateState('password', state.password.trim())}
								error={passwordError !== ''}
								helperText={passwordError}
								size={'small'}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.text}>Confirm Password</Typography>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								type="password"
								value={state.confirmPassword}
								onChange={(confirmPassword) => validateConfirmPassword(confirmPassword.target.value)}
								onBlur={() => updateState('confirmPassword', state.confirmPassword.trim())}
								error={confirmPasswordError !== ''}
								helperText={confirmPasswordError}
								size={'small'}
							/>
						</Grid>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.termsConditionChecked}
									onChange={() => updateState('termsConditionChecked', !state.termsConditionChecked)}
									style={{ color: Colors.PRIMARY, marginLeft: '0.5rem' }}
									color="primary"
								/>
							}
							style={{ color: Colors.PRIMARY }}
							label="I Accpect the Terms and Conditions"
						/>
					</Grid>
					<Box className={classes.regButton}>
						<FormButton title="Next" onClick={ValidateRegisterClick} />
					</Box>
				</form>
				<Snackbar open={formError !== ''} onClose={() => setformError('')} autoHideDuration={3000} >
					<Alert severity="error">
						{formError}
					</Alert>
				</Snackbar>
			</Container>
			{/* <Footer /> */}
		</div>
	);
};

const mapStateToProps = (state) => ({
	REG_USER_DATA: state.RegisterDuck.regUser,
	ACCOUNT_INFO: state.PatientAccountInfoDuck,
});

export default connect(mapStateToProps, { saveRegister })(RegisterScreen);
