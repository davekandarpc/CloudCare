import { makeStyles, Theme } from '@material-ui/core'
import { Colors } from '../../../styles'
export const useStyles = makeStyles((theme: Theme) => ({
    pageTitle: {
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 26,
        textAlign: 'left'
    },
    label: {
        textAlign: 'left',
        color: Colors.FONT_COLOR
    },
    root: {
        minWidth: 275,
        background: 'rgba(0,128,255,0.03)',
        borderLeft: `5px solid ${Colors.PRIMARY}`
    },
    title: {
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 26,
        textAlign: 'left'
    },
    doctorName: {
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 18,
    },
    subTitle: {
        color: Colors.PRIMARY,
        fontSize: 13,
        ...Colors.boldFont,
    },
    menuSide: {
        background: '#f7f7f7'
    },
    profilePicture: {
        height: 100,
        width: 100,
        borderRadius: '50%'
    },
    shortDetails: {
        padding: '1rem'
    },
    activeMenuItem: {
        cursor: 'pointer',
        padding: '0.6rem',
        background: Colors.GRAY_MEDIUM,
        marginTop: 5
    },
    menuItem: {
        cursor: 'pointer',
        padding: '0.6rem',
        '&:hover': {
            background: Colors.GRAY_MEDIUM
        },
        marginTop: 5
    },
    menuText: {
        color: Colors.FONT_COLOR
    },
    logoutButton: {
        cursor: 'pointer',
        padding: '0.6rem',
        '&:hover': {
            background: 'RGBA(20, 25, 109,0.3)'
        },
        marginTop: 5
    },
    logoutButtonText: {
        color: Colors.THEME_DARK_COLOR,
        ...Colors.boldFont,
    },
    currentContactHeader: {
        background: '#ededed',
        border: '1px solid #e5ddd5',
        padding: 8,
        display: 'flex',
        alignItems: 'center'
    },
    chatHeaderName: {
        ...Colors.mediumFont,
        color: Colors.FONT_COLOR
    },
    chatHeaderSubText: {
        fontSize: 12,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    profilePictureContainer: {
        textAlign: 'left'
    },
    profilePicture: {
        height: 35,
        width: 35,
        borderRadius: '50%'
    },
    chatHeaderRightBox: {
        marginLeft: 10
    },
    input: {
        width: '92%'
    },
    maxLimitReachedText: {
        fontSize: 12,
        color: 'grey',
        margin: 12,
        ...Colors.regularFont
    },

    //Main View Left + Right side of chat
    mainContainer: {
        height: "75vh"
    },

    // Left side
    rightBorder: {
        height: '100%',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
    },
    contactList: {
        marginBottom: 12,
        marginTop: 12,
        width: '95%',
        flex: 1,
        overflowY: 'auto'

    },

    // Right side
    emptyForm: {
        border: '1px solid #e5ddd5',
        height: '100%'
    },
    form: {

        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    chatWindow: {
        // height: '70%',
        border: '1px solid #e5ddd5',
        flex: 1,
        overflow: 'auto',
        paddingTop: 12
    },
    composeWrapper: {
        width: '100%',
        marginTop: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    composeTextBox: {
        width: '100%',
        background: 'rgba(237,237,237,0.3)'
    },
    ButtonsContainer: {
        textAlign: 'right',
        width: 'auto',
        marginTop: 6
    },
    cancelText: {
        color: Colors.PRIMARY,
        fontSize: 14,
        ['@media (max-width: 320px)']: {
            fontSize: 12
        },
        textTransform: 'capitalize',
        ...Colors.regularFont
    },
    formTitle: {
        marginBottom: 12,
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 20
    },
}))