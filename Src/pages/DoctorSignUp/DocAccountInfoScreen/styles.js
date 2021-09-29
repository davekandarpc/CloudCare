import { makeStyles } from '@material-ui/core/styles'
import {Colors} from '../../../styles'

export const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	subContainerPaper: {
		width: '100%',
		height: '85%',
		backgroundColor: '#f5f5f5',
	},
	subContainer: {
		width: '100%',
		height: 'auto',
		backgroundColor: '#f5f5f5',
	},
	text: {
		...Colors.mediumFont,
		textAlign: 'center',
		padding: '2rem',
		fontSize: '2rem',
		color: Colors.FONT_COLOR,
	},
	formView: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
		height: '100%',
		marginBottom: theme.spacing(10),
	},
	formText: {
		textAlign: 'left',
		marginLeft: '0rem',
		color: Colors.FONT_COLOR,
		fontFamily: 'Roboto-Regular'
	},
	emergencyContact: {
		width: '100%',
		backgroundColor: 'gray',
	},
	signUpButton: {
		marginTop: '1.5rem',
		backgroundColor: Colors.PRIMARY,
	},
	signUpText: {
		color: Colors.WHITE,
	},
	Button: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: 12,
		marginBottom: 12
		// margin: '1.5rem',
		// border:'0.1rem solid'
	},
	cancelBtn: {
		display: 'flex',
		marginRight: '1rem',
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
	},
	cancelText: {
		color: Colors.PRIMARY,
	},
	root: {
		width: '100%',
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	lngText: {
		marginTop: '1rem',
		...Colors.mediumFont,
		color: Colors.FONT_COLOR
	},
}));