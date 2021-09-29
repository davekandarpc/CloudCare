import { useStyles } from './styles';
import PageTitle from '../../components/PageTitle';
import Header from '../../components/Header';
import FormButton from '../../components/FormButton';
import DataGrid from '../../components/DataGrid';
import { Typography, Box } from '@material-ui/core'
const Claims = () => {
    const classes = useStyles();
    return (
        <Box>
            <Header />
            <PageTitle title='Claims Info' subTitle='View and update billing and diagnostic codes' />
            <DataGrid />
            <Box className={classes.updateBillingDataSection}>
                <Typography className={classes.updateTitle}>
                    Update Billing Data
                </Typography>
                <Typography className={classes.subTitle}>
                    refresh billing codes by uploading a new .xxx file
                </Typography>
                <Box className={classes.fileDetails}>
                    <Box className={classes.fileDetailsRow}>
                        <Typography className={classes.fileDetailsText}>
                            Filename:
                        </Typography>
                        <Typography className={classes.fileDetailsText + ' ' + classes.fileDetailsValue}>
                            14072021filename.xxx
                        </Typography>
                    </Box>
                    <Box className={classes.fileDetailsRow}>
                        <Typography className={classes.fileDetailsText}>
                            Last Upload:
                        </Typography>
                        <Typography className={classes.fileDetailsText + ' ' + classes.fileDetailsValue}>
                            14/07/2021
                        </Typography>
                    </Box>
                </Box>
                <FormButton title='Upload new billing code file' />
            </Box>
        </Box>
    )
}
export default Claims