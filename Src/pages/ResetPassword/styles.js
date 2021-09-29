import { makeStyles } from '@material-ui/core'
import { Colors } from '../../styles'
export const useStyles = makeStyles(() => ({
    mainContainer: {
        height: '100%'
    },
    content: {
        height: '80%',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    welcomeTitle: {
        ...Colors.boldFont,
		textAlign: 'center',
		color: Colors.FONT_COLOR,
		fontSize: 32
    },
    text: {
        textAlign: 'left',
		color: Colors.FONT_COLOR,
        marginTop: 16
    },
    button: {
		marginTop: 16
	}
}))