import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useStyles } from './styles';
import Header from '../../components/Header';
import PatientView from './PatientView';
import SpView from './SpView';
import AdminView from './AdminView';
import { clearCalendarData } from '../../ducks/ScheduleDuck/action';

const Calendar = ({ clearCalendarData }) => {
    const classes = useStyles();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
        return () => {
            // This will clear selcted doctor/ selected patient and selected admin from reducer to avoid
            // issue with newly selected user and previous selected user.
            clearCalendarData();
        }
    })

    return (
        <div className={classes.mainContainer}>
            <Header />
            {
                userType === 'SERVICE_PROVIDER' ?
                    <SpView userType={userType} />
                    :
                    userType === 'PATIENT' ?
                        <PatientView userType={userType} />
                        :
                        userType === 'ADMIN' ?
                            <AdminView userType={userType} />
                            :
                            null

            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedContact: state.ContactsDuck.selectedContact
})
export default connect(mapStateToProps, {clearCalendarData})(Calendar);
