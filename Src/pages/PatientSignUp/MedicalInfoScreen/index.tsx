import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, IconButton, Paper, MenuItem, RadioGroup, Radio } from '@material-ui/core';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StepperView from '../../../components/StepperView';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { savePatientsMedicalInfo } from '../../../ducks/PatientMedicalInfoDuck/action';
import { connect } from 'react-redux';
const medications = [
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
const MedicalInfoScreen = ({ MEDICAL_INFO, ACCOUNT_INFO, savePatientsMedicalInfo }) => {
    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };
    const [state, setState] = useState({
        drugReaction: MEDICAL_INFO?.payload?.patientMedicalInfo?.drugReaction ? MEDICAL_INFO?.payload?.patientMedicalInfo?.drugReaction : null,
        comments: MEDICAL_INFO?.payload?.patientMedicalInfo?.comments ? MEDICAL_INFO?.payload?.patientMedicalInfo?.comments : '',
        medicalConditions: MEDICAL_INFO?.payload?.patientMedicalInfo?.medicalConditions ? MEDICAL_INFO?.payload?.patientMedicalInfo?.medicalConditions : [{ id: 0, value: '' }],
        medicines: MEDICAL_INFO?.payload?.patientMedicalInfo?.medicines ? MEDICAL_INFO?.payload?.patientMedicalInfo?.medicines : '',
        DrugallergiesQuestion: MEDICAL_INFO?.payload?.patientMedicalInfo?.DrugallergiesQuestion ? MEDICAL_INFO?.payload?.patientMedicalInfo?.DrugallergiesQuestion : '',
    });
    const [drugReactionError, setdrugReactionError] = useState('')
    const [commentsError, setcommentsError] = useState('');
    const [medicalConditionsError, setmedicalConditionsError] = useState([{ id: 0, value: '' }]);
    const [medicinesError, setmedicinesError] = useState('');
    const [DrugallergiesQuestionError, setDrugallergiesQuestionError] = useState('');

    const addTextBox = index => {
        if (index >= state.medicalConditions.length - 1) {
            updateState('medicalConditions', [
                ...state.medicalConditions,
                { id: index + 1, value: '' },
            ]);
        } else {
            updateState(
                'medicalConditions',
                state.medicalConditions.filter((item, i) => i != index),
            );
        }
    };

    useEffect(() => {
    }, [activeStep])

    const handleReset = () => {
        setActiveStep(0);
    };
    const ValidateClickButton = () => {
        let hasError = false
        var validRegex = /^[a-zA-Z,.'-]*$/;
        if (state.drugReaction === null || state.drugReaction === "" || state.drugReaction.length <= 2 || !(validRegex.test(state.drugReaction))) {
            setdrugReactionError('Please enter valid details');
            hasError = true
        } else {
            setdrugReactionError('')
        }
        if (state.medicines === null || state.medicines === "") {
            setmedicinesError('Medications is required');
            hasError = true
        } else {
            setmedicinesError('')
        }
        if (state.comments === null || state.comments === "") {
            setcommentsError('Comments are required');
            hasError = true
        } else {
            setcommentsError('')
        }
        return hasError;
    };
    const onNext = () => {
        let hasError = ValidateClickButton()
        if (!hasError) {
            savePatientsMedicalInfo(state);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            history.push({ pathname: '/Depandent' })
        }
    }
    return (
        <Router>
            <Header />
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <StepperView activeStep={activeStep} />
                    <Paper elevation={0} className={classes.subContainerPaper}>
                        <Container className={classes.containerView} >
                            <Typography component="h3" variant="h3" className={classes.text}>
                                2. MEDICAL INFO
                    </Typography>
                            <form className={classes.formView} noValidate>
                                <Grid container spacing={2}>
                                    <Grid container direction="row" >
                                        <Typography className={classes.formText}>
                                            Please list any current medical conditions / concerns:
                                </Typography>
                                        {
                                            state.medicalConditions &&
                                            state.medicalConditions.map((item, index) => {
                                                return (
                                                    <Grid className={classes.TextBoxViewConditionsView} item container direction='row' justify='space-between' >
                                                        <Box className={classes.TextBoxViewConditions}>
                                                            <TextField
                                                                fullWidth
                                                                autoComplete="fname"
                                                                name="firstName"
                                                                variant="outlined"
                                                                required
                                                                id="firstName"
                                                                value={state.drugReaction}
                                                                onChange={(drugReaction) => updateState('drugReaction', drugReaction.target.value)}
                                                                error={drugReactionError !== ''}
                                                                helperText={drugReactionError}
                                                            />
                                                        </Box>
                                                        <IconButton onClick={() => addTextBox(index)} aria-label="delete" size="medium" style={{ backgroundColor: '#007bff', borderRadius: '0rem', width: '4rem', height: '3.5rem' }}>
                                                            {
                                                                index >= state.medicalConditions.length - 1 ?
                                                                    <AddIcon fontSize="inherit" style={{ color: "white" }} /> : <RemoveIcon fontSize="inherit" style={{ color: "white" }}
                                                                    />
                                                            }
                                                        </IconButton>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        <Grid item container direction='row' className={classes.QustionCheckBoxView} >
                                            <Typography className={classes.formTextConditions}>
                                                Drug allergies or reactions in medications / foods / other agents :
                                        </Typography>
                                            <Box >
                                                <RadioGroup className={classes.radioGroup} aria-label="gender"
                                                    name="gender1"
                                                    value={state.DrugallergiesQuestion}
                                                    onChange={(DrugallergiesQuestion) => updateState('DrugallergiesQuestion', DrugallergiesQuestion.target.value)}
                                                >
                                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" style={{ marginLeft: '0.5rem' }} />
                                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                                                </RadioGroup>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} className={classes.QustionCheckBoxView} >
                                            <Box  >
                                                <Typography className={classes.formTextConditions}>
                                                    List of medications
                                        </Typography>
                                                <TextField
                                                    id="standard-select-currency-native"
                                                    select
                                                    fullWidth
                                                    variant="outlined"
                                                    value={state.medicines}
                                                    onChange={(medicines) => updateState('medicines', medicines.target.value)}
                                                    error={medicinesError !== ''}
                                                    helperText={medicinesError}
                                                >
                                                    {medications.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid item container direction='row' justify='space-between' className={classes.CommentView} >
                                            <Typography className={classes.formTextConditions}>
                                                Comments
                                        </Typography>
                                            <TextField
                                                fullWidth
                                                autoComplete="comments"
                                                name="comments"
                                                variant="outlined"
                                                required
                                                id="comments"
                                                multiline={true}
                                                rows={3}
                                                value={state.comments}
                                                onChange={(comments) => updateState('comments', comments.target.value)}
                                                error={commentsError !== ''}
                                                helperText={commentsError}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
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

        </Router>


    )
}

const mapStateToProps = (state) => (
    {
        MEDICAL_INFO: state.PatientMedicalInfoDuck.patientMedicalInfo,
        ACCOUNT_INFO: state.PatientAccountInfoDuck
    });

export default connect(mapStateToProps, { savePatientsMedicalInfo })(MedicalInfoScreen);
