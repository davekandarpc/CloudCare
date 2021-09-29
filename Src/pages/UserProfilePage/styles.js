import { makeStyles } from '@material-ui/core'
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        paddingBottom: '1.6rem'
    },
    pageTitle: {
        ...Colors.mediumFont,
        color: Colors.FONT_COLOR,
        fontSize: 26,
        textAlign: 'left'
    },
    label: {
        textAlign: 'left',
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },

    root: {
        minWidth: 275,
        background: 'rgba(0,128,255,0.03)',
        borderLeft: `5px solid ${Colors.PRIMARY}`
    },
    title: {
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 22,
        marginBottom: 8
    },
    doctorName: {
        ...Colors.mediumFont,
        color: Colors.FONT_COLOR,
        fontSize: 18,
        marginTop: 8
    },
    subTitle: {
        color: Colors.FONT_COLOR,
        fontSize: 13,
        ...Colors.regularFont
    },
    editButton: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    form: {
        minWidth: 275,
        paddingLeft: 8,
        paddingRight: 8
    },
    formTitle: {
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        fontSize: 20
    },
    formButton: {
        textAlign: 'right',
        // marginTop: '1.6rem'
    },
    menuSide: {
        background: '#f7f7f7'
    },
    profilePicture: {
        height: 100,
        width: 100,
        borderRadius: '50%'
    },
    activeMenuItem: {
        cursor: 'pointer',
        padding: '0.6rem',
        background: Colors.GRAY_MEDIUM,
        marginTop: 5,
        textAlign: 'left'
    },
    menuItem: {
        cursor: 'pointer',
        padding: '0.6rem',
        '&:hover': {
            background: Colors.GRAY_MEDIUM
        },
        marginTop: 5,
        textAlign: 'left'
    },
    menuText: {
        color: Colors.FONT_COLOR,
        ...Colors.regularFont,
        fontSize: 16
    },
    logoutButton: {
        cursor: 'pointer',
        padding: '0.6rem',
        marginTop: 5,
        textAlign: 'left'
    },
    logoutButtonText: {
        color: Colors.PRIMARY,
        ...Colors.boldFont
    },
    comingSoon: {
        opacity: 0.3
    },
    shortDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        height: 85,
        width: 85,
        borderRadius: '50%',
        backgroundColor: Colors.FONT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        ['@media (max-width: 320px)']: {
            display: 'inline-block',
            height: 85,
            width: 85,
            borderRadius: '50%',
            backgroundColor: Colors.FONT_COLOR,
            alignItems: 'center'
        }
    },
    thumbnailText: {
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 22,
        ...Colors.mediumFont
    },
    Breadcrumb: {
        color: Colors.DESCRIPTION_COLOR
    },
    activeBreadcrumb: {
        color: Colors.PRIMARY
    }
}))