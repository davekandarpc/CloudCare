import { makeStyles } from '@material-ui/core';
import { Colors } from '../../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        textAlign: '-webkit-right'
    },
    mainContainer_reverse: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
    },
    profilePicture: {
        height: 20,
        width: 20,
        borderRadius: '50%'
    },
    fullMessage: {
        width: 'fit-content',
        maxWidth: '80%',
        minWidth: 125
    },
    fullMessageBody: {
        cursor: 'pointer',
        padding: 5,
        background: 'rgba(0, 128, 255, 0.7)',
        marginRight: 20
    },
    fullMessageBody_reverse: {
        cursor: 'pointer',
        padding: 5,
        background: '#ededed',
        marginLeft: 20
    },
    messageContent: {
        fontSize: 12,
        color: '#fff',
        ...Colors.regularFont
    },
    messageContent_reverse: {
        fontSize: 12,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    timeGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 3
    },
    timeGrid_reverse: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        marginTop: 3
    },
    dateTime: {
        fontSize: 10,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    }
}))