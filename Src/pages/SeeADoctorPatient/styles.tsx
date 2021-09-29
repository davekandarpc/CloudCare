import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '../../styles'

export const useStyles = makeStyles((theme) => ({
	rootDiv: {
		height: '100%',
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
		// marginBottom: '2rem 0rem',
		padding: '1.6rem 1rem 1.6rem 1rem',
		border: '1px solid grey',
	},
	welcomeText: {
		...Colors.boldFont,
		textAlign: 'left',
		paddingLeft: '1rem',
		color: Colors.FONT_COLOR,
	},
	subText: {
		fontSize: '1rem',
		textAlign: 'left',
		paddingLeft: '1rem',
		color: Colors.FONT_COLOR,
		...Colors.regularFont
	},
	welcomeImage: {
		height: '180px',
		width: 'auto',
		marginTop: '2rem',
		marginBottom: '2rem',
	},
	signUpButton: {
		backgroundColor: '#007bff',
		color: '#fff',
	},
	signUpText: {
		color: 'white',
		...Colors.regularFont,
		padding: 'auto',
	},
	button: {
		justifyContent: 'center',
		marginTop: '1.5rem',
	},
}));