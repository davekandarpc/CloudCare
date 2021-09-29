import { useState } from 'react'
import { useStyles } from './styles'
import Header from '../../components/Header';
import { connect } from 'react-redux';
import NavMenus from '../../components/EMRComponents/NavMenus';
import Profile_LeftPanel from '../../components/EMRComponents/Profile_LeftPanel';
import Profile_RightPanel from '../../components/EMRComponents/Profile_RightPanel';
import Eforms_LeftPanel from '../../components/EMRComponents/Eforms_LeftPanel';
import Eforms_RightPanel from '../../components/EMRComponents/Eforms_RightPanel';
import SelectPatient from '../../components/EMRComponents/SelectPatient'
import Documents_LeftPanel from '../../components/EMRComponents/Documents_LeftPanel';
import Documents_RightPanel from '../../components/EMRComponents/Documents_RightPanel';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const EMRPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedNavMenu, setSelectedNavMenu] = useState(`${t('Profile')}`);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const accordionData = [
        { title: t('history') },
        { title: t('measurements') },
        { title: t('onGoingConcerns') },
        { title: t('reminders') }
    ]
    const onSelectNavMenu = (item) => {
        setSelectedNavMenu(item)
    }
    const onSelectPatient = (item) => {
        setSelectedPatient(item)
    }
    const onProfileMenuClick = (item) => {
        document.getElementById(item.title).scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const [selectedEFormFilter, setSelectedEFormFilter] = useState('Current eForms');
    const onSelectEFormFilter = (value) => {
        setSelectedEFormFilter(value)
    }
    return (
        <div className={classes.mainContainer}>
            <Header />
            <Grid container>
                <Grid item xs={12} sm={3} className={classes.leftPanel}>
                    <SelectPatient selectedPatient={selectedPatient} onSelectPatient={onSelectPatient} />
                    {
                        selectedNavMenu === t('Profile') &&
                        <Profile_LeftPanel
                            onClick={onProfileMenuClick}
                            accordionData={accordionData}
                            selectedPatient={selectedPatient}
                            onSelectPatient={onSelectPatient} />
                    }
                    {
                        selectedNavMenu === t('eForms') &&
                        <Eforms_LeftPanel
                            selectedFilter={selectedEFormFilter}
                            onSelectFilter={onSelectEFormFilter}
                        />
                    }
                    {
                        selectedNavMenu === t('Documents') && 
                        <Documents_LeftPanel />
                    }
                </Grid>
                <Grid item xs={12} sm={9} className={classes.rightPanel}>
                    <NavMenus selectedNavMenu={selectedNavMenu} onSelectNavMenu={onSelectNavMenu} />
                    {
                        selectedNavMenu === t('Profile') &&
                        <Profile_RightPanel accordionData={accordionData} />
                    }
                    {
                        selectedNavMenu === t('eForms') &&
                        <Eforms_RightPanel />
                    }
                    {
                        selectedNavMenu === t('Documents') &&
                        <Documents_RightPanel accordionData={accordionData}/>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(EMRPage);