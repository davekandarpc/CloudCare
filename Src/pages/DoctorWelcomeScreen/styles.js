import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    rootDiv: {
        height: '100%'
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
    },
    subContainer: {
        justifyContent: 'center',
        padding: '1.6rem 1rem 1.6rem 1rem',
        border:'1px solid grey'
    },
    welcomeText: {
        fontSize: 'auto',
        ...Colors.boldFont,
        textAlign: 'left',
        paddingLeft: '1rem',
    },
    subText: {
        fontSize: '1rem',
        textAlign: 'left',
        paddingLeft: '1rem',
        ...Colors.regularFont
    },
    welcomeImage: {
        height: '180px',
        width: 'auto',
        marginTop: '2rem',
        marginBottom: '2rem'
    },
    signUpButton: {
        backgroundColor: '#007bff',
        color: '#fff'
    },
    signUpText: {
        color: 'white',
        ...Colors.regularFont,
        padding: 'auto'
    },
     button: {
        justifyContent: 'center',
        marginTop: '1.5rem'
    },
}))