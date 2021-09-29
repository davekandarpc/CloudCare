import { makeStyles } from '@material-ui/core'
import {Colors} from '../../styles'
export const useStyles = makeStyles(() => ({
    mainContainer: {
        display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '80%'
    },
    form: {
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1.2rem'
    },
    infoText: {
        marginTop: '0.5rem',
        marginBottom: '1.6rem',
        color: Colors.FONT_COLOR,
        fontSize: 14,
        ...Colors.regularFont
    },
    text: {
        textAlign: 'left',
        marginLeft: '0rem',
        color: Colors.FONT_COLOR
    },
    labelText: {
        ...Colors.boldFont,
		textAlign: 'center',
		color: Colors.FONT_COLOR,
		fontSize: 32
    },
    resetPasswordText: {
        textAlign: 'right',
        marginRight: '0rem',
        color: Colors.PRIMARY
    },
}))