import React, {useState,useEffect} from 'react'
import { useStyles, StyledTableRow, StyledTableCell, } from './styles'
import { Container, Grid, Typography, Box, TextField, Button, Paper, MenuItem, 
    FormControlLabel, Radio, RadioGroup, Checkbox, TableContainer, Table, TableHead, 
    TableRow, TableCell, TableBody, FormHelperText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import { connect } from 'react-redux';
import { saveDocSchedule } from '../../../ducks/DocScheduleDuck/action';
import { useHistory } from "react-router-dom";

const accountTypeList = [
    {
        value: "physical",
        label: "physical"
    },
    {
        value: "video",
        label: "video"
    },
];

const otherList = [
    {
        value: "Clinic Care 442",
        label: "Clinic Care 442"
    },
    {
        value: "Clinic Care 392",
        label: "Clinic Care 392"
    },
];



function createData(sun: string, mon: string, tue: string, wed: string, thu: string, fri: string, sat: string) {
    return { sun, mon, tue, wed, thu, fri, sat };
}

const DocSchedule = ({ DOC_SCHEDULE, saveDocSchedule}) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        accountType: DOC_SCHEDULE?.docScheduleData?.accountType,
        other: DOC_SCHEDULE?.docScheduleData?.other,
        publicHolidays: DOC_SCHEDULE?.docScheduleData?.publicHolidays,
        startTime: DOC_SCHEDULE?.docScheduleData?.startTime,
        endTime: DOC_SCHEDULE?.docScheduleData?.endTime,
        total: DOC_SCHEDULE?.docScheduleData?.total,
        selectedChecked:DOC_SCHEDULE?.docScheduleData?.selectedChecked,
        //checkedItem: DOC_SCHEDULE?.payload?.docScheduleData?.checkedItem ? DOC_SCHEDULE?.payload?.docScheduleData?.checkedItem : '',
        checkedItem: [
            {
                key: 'Sun',
                value: 'Sun',
                selected: false
            },
            {
                key: 'Mon',
                value: 'Mon',
                selected: false
            },
            {
                key: 'Tue',
                value: 'Tue',
                selected: false
            },
            {
                key: 'Wed',
                value: 'Wed',
                selected: false
            },
            {
                key: 'Thu',
                value: 'Thu',
                selected: false
            },
            {
                key: 'Fri',
                value: 'Fri',
                selected: false
            },
            {
                key: 'Sat',
                value: 'Sat',
                selected: false
            },

        ],

    });

    const [accountTypeError, setaccountTypeError] = useState('');
    const [otherError, setotherError] = useState('');
    const [publicHolidaysError, setpublicHolidaysError] = useState('');
    const [checkedItemError, setcheckedItemError] = useState('');
    const [startTimeError, setstartTimeError] = useState('');
    const [endTimeError, setendTimeError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    useEffect(() => {
        //alert('doc-account-data' + JSON.stringify(DOC_ACCOUNT_INFO))
    }, [])

    const updateState = (field, value) => {
        setState(previous => ({ ...previous, [field]: value }));
    };

    const DocScheduleValidate = () => {
        let hasError = false
        if (state.accountType === null || state.accountType === "" ) {
            setaccountTypeError('AccountType is required')
            hasError = true
        } else {
            setaccountTypeError('')
        }
        if (state.other === null || state.other === "") {
            setotherError('Please select Other')
            hasError = true
        } else {
            setotherError('')
        }
        if (state.publicHolidays === null || state.publicHolidays === "") {
            setpublicHolidaysError('Please select Public Holidays')
            hasError = true
        } else {
            setpublicHolidaysError('')
        }
        if (state.checkedItem === null) {
            setcheckedItemError('Please minimum 1 day select')
            hasError = true
        } else {
            setcheckedItemError('')
        }
        if (state.startTime === null || state.startTime === "") {
            setstartTimeError('StartTime is required');
            hasError = true
        } else {
            setstartTimeError('')
        }
        if (state.endTime === null || state.endTime === "") {
            setendTimeError('EndTime is required');
            hasError = true
        } else {
            setendTimeError('')
        }
        return hasError;
    }

    const ValidateClick = () => {

        let hasError = DocScheduleValidate()
        if (!hasError) {
            let loginData = {
                accountType: '',
                other: '',
                publicHolidays: '',
                checkedItem: '',
                startTime: '',
                endTime: ''
            }
            handleNext()
        }
    }

    const handleNext = () => {
        alert(JSON.stringify(saveDocSchedule(state)))
        saveDocSchedule(state);
        history.push({ pathname: '/docServices' })
    }

    const checkedBoxData = (index) => {
        var newArray = state.checkedItem;
        newArray[index].selected = !newArray[index].selected;
        // alert(JSON.stringify(state.checkedItem))
    }

    return(
        <div className={classes.mainContainer}>
            <Header />
            {/* <StepperView activeStep={activeStep} /> */}
            <Paper elevation={0} className={classes.subContainerPaper}>
                <Container className={classes.subContainer}>
                    <Typography component="h3" variant="h3" className={classes.text}>
                        2. Schedule
                    </Typography>
                    <Typography className={classes.subText}>
                        MY SCHEDULE
                    </Typography>
                    <TableContainer className={classes.tableWrapper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Sun</StyledTableCell>
                                    <StyledTableCell>Mon</StyledTableCell>
                                    <StyledTableCell>Tue</StyledTableCell>
                                    <StyledTableCell>Wed</StyledTableCell>
                                    <StyledTableCell>Thu</StyledTableCell>
                                    <StyledTableCell>Fri</StyledTableCell>
                                    <StyledTableCell>Sat</StyledTableCell>
                                </TableRow> 
                            </TableHead>
                            <TableBody>
                                <TableCell>
                                    <StyledTableRow>Start</StyledTableRow>
                                </TableCell>
                                <StyledTableCell>{state.startTime}</StyledTableCell>
                                <StyledTableCell>{state.startTime}</StyledTableCell>
                                <StyledTableCell>{state.startTime}</StyledTableCell>
                                <StyledTableCell>3:00</StyledTableCell>
                                <StyledTableCell>8:00</StyledTableCell>
                                <StyledTableCell>10:20</StyledTableCell>
                                <StyledTableCell>4:30</StyledTableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell>
                                    <StyledTableRow>End</StyledTableRow>
                                </TableCell>
                                <StyledTableCell>{state.endTime}</StyledTableCell>
                                <StyledTableCell>{state.endTime}</StyledTableCell>
                                <StyledTableCell>{state.endTime}</StyledTableCell>
                                <StyledTableCell>5:15</StyledTableCell>
                                <StyledTableCell>10:00</StyledTableCell>
                                <StyledTableCell>11:30</StyledTableCell>
                                <StyledTableCell>6:00</StyledTableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell>
                                    <StyledTableRow>Total</StyledTableRow>
                                </TableCell>
                                <StyledTableCell>{state.total}</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={9} sm={4} className={classes.servicesData}>
                            <Typography className={classes.dataIndex}>1</Typography>
                            <Grid className={classes.nameText}>
                                <Typography className={classes.name}>Virtual-video Chat</Typography>
                                <Typography className={classes.clinicSubText}>Tur & Wed</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sm={4} className={classes.deleteIcon}>
                            <DeleteIcon fontSize="large" />
                        </Grid>
                    </Grid>
                    <Typography className={classes.subText}>
                        ADD TIME
                    </Typography>
                    <Grid container spacing={2}>
                        <Typography className={classes.formText}>
                            Account Type
                        </Typography>
                        <Grid item xs={12} sm={6}>  
                            <TextField
                                id="accountType"
                                select
                                variant="outlined"
                                value={state.accountType}
                                onChange={(accountType) => updateState('accountType', accountType.target.value)}
                                error={accountTypeError !== ''}
                                helperText={accountTypeError}
                                fullWidth
                                required>
                                {accountTypeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                           
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Typography className={classes.formText}>
                            Other
                        </Typography>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="other"
                                select
                                variant="outlined"
                                value={state.other}
                                onChange={(other) => updateState('other', other.target.value)}
                                error={otherError !== ''}
                                helperText={otherError}
                                fullWidth
                                required>
                                {otherList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '1rem' }} direction="row">
                        <Typography className={classes.radioText}>
                            Are you available on public holidays?
                        </Typography>
                        <RadioGroup className={classes.radioGroup} aria-label="gender" 
                            name="gender1"
                            value={state.publicHolidays} 
                            onChange={(publicHolidays) => updateState('publicHolidays', publicHolidays.target.value)}
                            >
                            <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" style={{ marginLeft: '0.5rem' }}/>
                            <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                        </RadioGroup>
                    </Grid>    
                    <Typography className={classes.radioText}>
                        Available Period
                    </Typography>
                    <Grid>
                        { state.checkedItem.map((res, index) => {
                            return(
                                <FormControlLabel 
                                    control={
                                        <Checkbox
                                            key={res.key}
                                            onChange={() => checkedBoxData(index)}
                                            color="primary"
                                        />
                                    }
                                    label={res.key}
                                />   
                            )
                        })
                        }
                    </Grid>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={6} sm={4}>
                            <Typography className={classes.formText}>
                                start
                            </Typography>
                            <TextField
                                autoComplete="startTime"
                                name="Start Time"
                                variant="outlined"
                                required
                                fullWidth
                                id="startTime"
                                type='time'
                                value={state.startTime}
                                onChange={(startTime) => updateState('startTime', startTime.target.value)}
                                error={startTimeError !== ''}
                                helperText={startTimeError}
                            />
                        </Grid>
                        
                        <Grid item xs={6} sm={4}>
                            <Typography className={classes.formText}>
                                End
                        </Typography>
                            <TextField
                                autoComplete="endTime"
                                name="End Time"
                                variant="outlined"
                                required
                                fullWidth
                                id="endTime"
                                type='time'
                                value={state.endTime}
                                onChange={(endTime) => updateState('endTime', endTime.target.value)}
                                error={endTimeError !== ''}
                                helperText={endTimeError}
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        color='primary' 
                        style={{ color: "#007bff" }}
                        className={classes.AddDependentBtn}
                        size="large"
                        variant="outlined"
                        onClick={ValidateClick} 
                        >
                        Add Availability 
                    </Button>
                 </Container>
            </Paper>
            <Box className={classes.Button}>
                <Button className={classes.cancelBtn}>
                    <Typography className={classes.cancelText}>Cancel</Typography>
                </Button>
                <FormButton title="Next" onClick={ValidateClick} />
            </Box>
        </div>            
    )
}
const mapStateToProps = (state, ownProps) => ({
    DOC_SCHEDULE: state.DocScheduleDuck.docScheduleData,
    
});

export default connect(mapStateToProps, { saveDocSchedule })(DocSchedule);