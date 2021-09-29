import { useState } from 'react'
import { useStyles } from './styles'
import Header from '../../components/Header';
import { connect } from 'react-redux';
import Add_RightPanel from '../../components/BillingComponents/Add_RightPanel';
import Add_LeftPanel from '../../components/BillingComponents/Add_LeftPanel';
import { Grid, Box, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Billing = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(null);
    const { t } = useTranslation();
    const onSelectDate = (selectedDay) => {
        setSelectedDate(selectedDay);
    }
    return (
        <div className={classes.mainContainer}>
            <Header />
            <Box>
                <div className={classes.title}>Billing</div>
                <div className={classes.subTitle}>Add billing information to appointments</div>
            </Box>
            <Grid container>
                <Grid item xs={12} sm={3} className={classes.leftPanel}>
                    <Add_LeftPanel propsOnSelectDate={onSelectDate} />
                </Grid>
                <Grid item xs={12} sm={9} className={classes.rightPanel}>
                    <Add_RightPanel selectedDate={selectedDate} />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Billing);