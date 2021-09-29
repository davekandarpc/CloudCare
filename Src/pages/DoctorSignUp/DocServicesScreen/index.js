import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, Paper, MenuItem, GridList } from '@material-ui/core';
import FormButton from '../../../components/FormButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from '../../../components/Header';
import { connect } from 'react-redux';
import { saveDocServices } from '../../../ducks/DocServicesDuck/action';
import { useHistory } from "react-router-dom";
const servicesList = [
    {
        value: "Jho",
        label: "Jho"
    },
    {
        value: "Doe",
        label: "Doe"
    },
];

const typeList = [
    {
        value: "Clinic 1",
        label: "Clinic 1"
    },
    {
        value: "Clinic 2 ",
        label: "Clinic 2"
    },
];


const nameList = [
    {
        value: "clinic 392",
        label: "clinic 392"
    },
    {
        value: "clinic 421",
        label: "clinic 421"
    },
];

const DocServicesScreen = ({ DOC_SERVICES, saveDocServices, DOC_SCHEDULE, DOC_ACCOUNT_INFO}) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        offersServices: DOC_SERVICES?.docServicesData?.offersServices,
        hospitalName: DOC_SERVICES?.docServicesData?.hospitalName,
        patientName: DOC_SERVICES?.docServicesData?.patientName,
    });

    const [offersServicesError, setoffersServicesError] = useState('');
    const [hospitalNameError, sethospitalNameError] = useState('');
    const [patientNameError, setpatientNameError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    useEffect(() => {
        alert('doc-schedule-data' + JSON.stringify({ DOC_ACCOUNT_INFO, DOC_SCHEDULE}))
    }, []);

    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const DocServicesValidate = () => {
        let hasError = false
        if (state.offersServices === null || state.offersServices === "") {
            setoffersServicesError('Please select Offers Services')
            hasError = true
        } else {
            setoffersServicesError('')
        }
        if (state.hospitalName === null || state.hospitalName === "") {
            sethospitalNameError('Please select Hospital Name')
            hasError = true
        } else {
            sethospitalNameError('')
        }
        if (state.patientName === null || state.patientName === "") {
            setpatientNameError('Please select Patient Name')
            hasError = true
        } else {
            setpatientNameError('')
        }
        return hasError;
    }

    const ValidateClick = () => {

        let hasError = DocServicesValidate()
        if (!hasError) {
            let loginData = {
                offersServices: '',
                hospitalName: '',
                patientName: '',
            }
            handleNext()
        }
    }

    const handleNext = () => {
        alert(JSON.stringify(saveDocServices(state)))
        saveDocServices(state);

        history.push({ pathname: '/' })
    }

    return (
        <div className={classes.mainContainer}>
            <Header />
            <Paper elevation={0} className={classes.subContainerPaper}>
                <Container className={classes.subContainer}>
                    <Typography component="h3" variant="h3" className={classes.text}>
                        3. Services
                    </Typography>
                    <Typography className={classes.subText}>
                        OFFERED SERVICES
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={9} sm={4} className={classes.servicesData}>
                            <Typography className={classes.dataIndex}>1</Typography>
                            <Typography className={classes.servicesName}>{state.offersServices}</Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} className={classes.deleteIcon}>
                            <DeleteIcon fontSize="large" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="services"
                                select
                                variant="outlined"
                                value={state.offersServices}
                                onChange={(offersServices) => updateState('offersServices', offersServices.target.value)}
                                error={offersServicesError !== ''}
                                helperText={offersServicesError}
                                fullWidth
                                required>
                                {servicesList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button color='primary' style={{ color: "#007bff" }} className={classes.AddBtn} size="large" variant="outlined" >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography className={classes.subText}>
                        CLINIC AFFILIATION
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={9} sm={4} className={classes.servicesData}>
                            <Typography className={classes.dataIndex}>1</Typography>
                            <Grid className={classes.nameText}>
                                <Typography className={classes.clinicName}>{state.hospitalName}</Typography>
                                <Typography className={classes.clinicSubText}>{state.patientName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sm={4} className={classes.deleteIcon}>
                            <DeleteIcon fontSize="large" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                select
                                variant="outlined"
                                value={state.hospitalName}
                                onChange={(hospitalName) => updateState('hospitalName', hospitalName.target.value)}
                                error={hospitalNameError !== ''}
                                helperText={hospitalNameError}
                                fullWidth
                                required>
                                {typeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button color='primary' style={{ color: "#007bff" }} className={classes.AddBtn} size="large" variant="outlined" >
                                Add
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                select
                                variant="outlined"
                                value={state.patientName}
                                onChange={(patientName) => updateState('patientName', patientName.target.value)}
                                error={patientNameError !== ''}
                                helperText={patientNameError}
                                fullWidth
                                required>
                                {nameList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                </Container>
            </Paper>
            <Box className={classes.Button}>
                <Button className={classes.cancelBtn}>
                    <Typography className={classes.cancelText}>Cancel</Typography>
                </Button>
                <FormButton title="Done" onClick={ValidateClick} />
            </Box>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    DOC_ACCOUNT_INFO: state.DocAccountInfoDuck,
    DOC_SCHEDULE: state.DocScheduleDuck,
    DOC_SERVICES: state.DocServicesDuck.docServicesData
});

export default connect(mapStateToProps, { saveDocServices })(DocServicesScreen);
