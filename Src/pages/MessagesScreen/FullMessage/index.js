import { useStyles } from './styles'
import { Typography, Box } from '@material-ui/core'
import moment from 'moment';
import './index.css';
import ProfilePictureComponent from "../../../components/ProfilePictureComponent";

const Contact = (props) => {
    const classes = useStyles();
    return (
        <Box className={props.type === 'sent' ? classes.mainContainer : classes.mainContainer_reverse}>
            <Box key={props.message.messageID} className={classes.fullMessage}>
                <Box id={props.type === 'sent' ? "fullMessageBody" : "fullMessageBody_reverse"} className={props.type === 'sent' ? classes.fullMessageBody : classes.fullMessageBody_reverse}>
                    <Typography align='left' className={props.type === 'sent' ? classes.messageContent : classes.messageContent_reverse}>
                        {props.message.body}
                    </Typography>
                </Box>
                <Box className={props.type === 'sent' ? classes.timeGrid : classes.timeGrid_reverse}>
                    <Typography align='left' className={classes.dateTime}>
                        {
                            moment
                                .utc(props.message.messageCreatedDate)
                                .startOf('minutes')
                                .fromNow()
                        }
                    </Typography>
                    <div>
                        <ProfilePictureComponent
                            firstName={props.message.senderFirstName}
                            lastName={props.message.senderLastName}
                            size={24}
                            fontSize={8}
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default Contact;
