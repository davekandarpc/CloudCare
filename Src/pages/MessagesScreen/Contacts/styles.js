import { makeStyles } from '@material-ui/core'
import { Colors } from '../../../styles'
export const useStyles = makeStyles(() => ({
    profilePictureContainer: {
        textAlign: 'left',
        position: 'relative'
    },
    profilePicture: {
        height: 45,
        width: 45,
        borderRadius: '50%'
    },
    unReadIndicator: {
        position: 'absolute',
        right: 2.5,
        top: 2.5,
        height: 10,
        width: 10,
        borderRadius: '50%',
        backgroundColor: Colors.PRIMARY,
    },
    activeMessageContact: {
        cursor: 'pointer',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        display: 'flex',
        '&:hover': {
            backgroundColor: Colors.GRAY_MEDIUM
        },
        backgroundColor: '#ededed'
    },
    messageContact: {
        cursor: 'pointer',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        display: 'flex',
        '&:hover': {
            backgroundColor: Colors.GRAY_MEDIUM
        }
    },
    detailsContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    detailsFirstRow: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    nameStyle: {
        fontSize: 14,
        color: Colors.FONT_COLOR,
        textAlign: 'left',
        width: '150px',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        ...Colors.regularFont
    },
    dateTime: {
        fontSize: 14,
        color: Colors.GRAY_DARK,
        textAlign: 'right',
        ...Colors.regularFont
    },
    lastMessase: {
        fontSize: 14,
        color: Colors.FONT_COLOR,
        ...Colors.boldFont
    }
}))