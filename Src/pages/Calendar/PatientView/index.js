import { useState, useEffect } from 'react'
import { TENANT_ID } from "../../../config/TenantConfig";
import { Grid } from '@material-ui/core';
import CreateAppointment from '../../../components/CalendarComponents/CreateAppointment';
import ScheduleCalendar from '../../../components/CalendarComponents/ScheduleCalendar';
import { connect } from 'react-redux';
import { getRequest } from '../../../common/fetchRequest';
import { useTranslation } from 'react-i18next';
import { useStyles } from "../styles";

const PatientView = ({ userType, propsType }) => {
    const [appointments, setAppointments] = useState([]);
    const classes = useStyles();
    const { t } = useTranslation();
    useEffect(() => {
        getAppointments()
    }, [])
    useEffect(() => {
        if (propsType === 'DELETE_APPOINTMENT_SUCCESS' || propsType === 'CREATE_APPOINTMENT_SUCCESS') {
            getAppointments()
        }
    }, [propsType])
    const getAppointments = async () => {
        var userId = localStorage.getItem('user_Id');
        var userType = localStorage.getItem('userType');
        let URL = ''
        if (userType === 'SERVICE_PROVIDER') {
            URL = `appointment/serviceProvider/${userId}?tenant=${TENANT_ID}`
        } else {
            URL = `appointment/patient/${userId}?tenant=${TENANT_ID}`
        }
        let response = await getRequest(URL, true);
        if (response.ok) {
            const data = await response.json();
            let formattedAppointments = [];
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let date = data[i].actualStartTime.substring(0, 10);
                    let title = t('appointment');
                    if (data[i].appointmentStatus === 'CONSULTATION_COMPLETED') {
                        title = t('completed')
                    }
                    let eventObj = {
                        title: title,
                        date: date,
                        id: data[i].appointmentId,
                        serviceProviderId: data[i].serviceProviderId,
                        availabilitySlotIds: data[i].availabilitySlotIds,
                        "start": data[i].actualStartTime,
                        "end": data[i].actualEndTime,
                        extendedProps: data[i]
                    }
                    formattedAppointments.push(eventObj);
                }
            }
            setAppointments(formattedAppointments)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <div className={classes.title}>{t('calendarTitle')}</div>
                <ScheduleCalendar userType={userType} appointments={appointments} />
            </Grid>
            <Grid item xs={12} sm={4} style={{paddingTop: '7%'}}>
                <CreateAppointment userType={userType} />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    propsSelectedDoctor: state.ScheduleDuck.selectedDoctor,
    propsType: state.ScheduleDuck.type,
});

export default connect(mapStateToProps)(PatientView);