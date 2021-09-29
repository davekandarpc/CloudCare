import { useState, useEffect } from 'react';
import { useStyles } from './styles';
import Header from '../../components/Header';
import ContactsListing from '../../components/Contacts/ContactsListing';
import ContactsDetails from '../../components/Contacts/ContactsDetails';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import UserSelection from '../../components/UserSelection';
import {clearSelectedContact} from '../../ducks/ContactsDuck/action'
const ContactsPage = ({clearSelectedContact}) => {
    const classes = useStyles();
    const [selectedUserType, setSelectedUserType] = useState('');
    useEffect(() => {
        return () => {
            clearSelectedContact();
        }
    },[])
    const onSelectUserType = (type) => {
        setSelectedUserType(type);
    }
    return (
        <div className={classes.mainContainer}>
            <Header />
            <Grid container className={classes.containerBox}>
                <Grid item xs={12} sm={4} className={classes.contactListingCol}>
                    <ContactsListing selectedUserType={selectedUserType} />
                    <UserSelection propsOnSelectUserType={onSelectUserType} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <ContactsDetails selectedUserType={selectedUserType} />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {clearSelectedContact})(ContactsPage);