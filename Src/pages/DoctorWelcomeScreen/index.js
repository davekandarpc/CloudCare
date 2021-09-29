import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useStyles } from './styles'
import { Container, Grid, Typography, Paper, Box } from '@material-ui/core'
import FormButton from '../../components/FormButton'
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { TENANT_ID } from '../../config/TenantConfig';
const DoctorWelcome = () => {
    const classes = useStyles();
    const history = useHistory();
    const [userType, setUserType] = useState('');

    const seeADoctorOrPatient = () => {
        if (userType === 'SERVICE_PROVIDER') {
            history.push({ pathname: '/joining', search: `?tenant=${TENANT_ID}` })
        }
        else {
            history.push({ pathname: '/', search: `?tenant=${TENANT_ID}` })
        }
    }

    useEffect(() => {
        let UserType = localStorage.getItem('userType');
        if (UserType !== null) {
            setUserType(UserType);
            console.log('user', userType)
        }
    }, [])

    return (
        <div className={classes.rootDiv}>
            <Header />
            <div className={classes.mainContainer}>
                <Paper elevation={0} className={classes.subContainer}>
                    <Container>
                        <Typography className={classes.welcomeText}>Welcome Dr.Smith, </Typography>
                        <Typography className={classes.subText}>Lets gets Started</Typography>
                        <Grid>
                            <img alt='doctors' src={"/images/Doctors.png"} className={classes.welcomeImage} />
                        </Grid>
                        <Box className={classes.button}>
                            <FormButton
                                title={userType === 'SERVICE_PROVIDER' ? 'See A Patient' : 'See A Doctor'}
                                onClick={seeADoctorOrPatient}
                                endIcon={<ArrowRightAlt style={{ fontSize: 35 }} />} />
                        </Box>
                    </Container>
                </Paper>
            </div>
            <Footer />
        </div>
    )
}
const mapStateToProps = (state) => ({
    USER_DATA: state.SigInDuck
})

export default connect(mapStateToProps, {})(DoctorWelcome)