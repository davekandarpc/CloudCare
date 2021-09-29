import { makeStyles } from '@material-ui/core'
import {Colors} from '../../styles'
export const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '80%'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		// width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signUpButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '2rem',
	},
	signUpText: {
		padding: '0.5rem 2rem',
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1.5rem',
	},
	text: {
		textAlign: 'left',
		marginLeft: '0rem',
		color: Colors.FONT_COLOR,
		...Colors.regularFont
	},
	labelText: {
		...Colors.boldFont,
		textAlign: 'center',
		color: Colors.FONT_COLOR,
		fontSize: 24
	},
	resetPasswordText: {
		textAlign: 'right',
		marginRight: '0rem',
		color: Colors.PRIMARY,
		cursor: 'pointer',
		fontStyle: 'italic',
		...Colors.regularFont
	},
	placeholder: {
		height: 40,
	},
}));