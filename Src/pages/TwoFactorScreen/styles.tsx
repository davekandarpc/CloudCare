import { makeStyles } from '@material-ui/core'
import {Colors} from '../../styles'
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        height: '100%',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1.2rem'
    },
    infoText: {
        marginTop: '1.2rem',
        marginBottom: '1.6rem',
        color: Colors.FONT_COLOR
    },
    text: {
        textAlign: 'left',
        marginLeft: '0rem',
        color: Colors.FONT_COLOR
    },
    labelText: {
        ...Colors.boldFont,
        textAlign: 'center',
        color: Colors.FONT_COLOR
    },
    resetPasswordText: {
        textAlign: 'right',
        marginRight: '0rem',
        color: Colors.PRIMARY
    },
}))