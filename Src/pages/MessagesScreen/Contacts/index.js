import { useStyles } from './styles'
import { Typography, Box } from '@material-ui/core'
import moment from 'moment';
import { ProfilePictureComponent } from '../../../components/ProfilePictureComponent';
const Contact = (props) => {
    const classes = useStyles();
    return (
        <Box key={props.lastMessageContact.messageId} className={props.isSelected ? classes.activeMessageContact : classes.messageContact} onClick={() => props.selectContact(props.lastMessageContact)}>
            <div className={classes.profilePictureContainer}>
                {/* <img
                    className={classes.profilePicture}
                    alt='profile'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHS4YqFQ213jgyaYBsBY-rJYSus8M-XwxrNg&usqp=CAU"
                /> */}
                <div>
                    <ProfilePictureComponent
                        firstName={props.lastMessageContact.firstname}
                        lastName={props.lastMessageContact.lastname}
                        size={36}
                        fontSize={12}
                    />
                </div>
                {
                    props.readstatus == null &&
                    <div className={classes.unReadIndicator} />
                }
            </div>
            <Box justify="center" alignItems="center" className={classes.detailsContainer}>
                <Box className={classes.detailsFirstRow}>
                    <Typography className={classes.nameStyle}>
                        {props.lastMessageContact.firstname} {props.lastMessageContact.lastname}
                    </Typography>
                    <Typography className={classes.dateTime}>
                        {props.lastMessageContact.messageCreatedDate == null ? '' :
                            moment
                                .utc(props.lastMessageContact.messageCreatedDate)
                                .startOf('minutes')
                                .fromNow()
                        }
                    </Typography>
                </Box>
                <Box>
                    <Typography align='left' className={classes.lastMessase}>
                        {props.lastMessageContact.snippet}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Contact;
