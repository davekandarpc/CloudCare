import Header from '../../components/Header';
import { useStyles } from './styles'
import { Container, Typography, Button, Paper } from '@material-ui/core'
import Footer from '../../components/Footer';
import { useHistory } from "react-router-dom";
const JoiningScreen = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleCancel = () => {
        history.goBack()
    }
    return (
        <div>
            <Header />
            <div className={classes.mainContainer}>
                <Paper elevation={0} className={classes.subContainer}>
                    <Container>
                        <Typography className={classes.text}>Wait for patients to join queue</Typography>
                        <Button variant="contained" onClick={handleCancel} className={classes.cancelButton} style={{ backgroundColor: '#293042' }}>
                            <Typography className={classes.cancelText}>Cancel</Typography>
                        </Button>
                    </Container>
                </Paper>
            </div>
            <Footer />
        </div>
    )
}

export default JoiningScreen;