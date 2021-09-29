import { makeStyles }  from '@material-ui/core/styles';
import {Colors} from '../../styles';
export const useStyles = makeStyles(() => ({
	mainContainer: {
		display: 'flex',
		justifyContent: 'left',
		width: '100%',
	},
	subContainer: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	titleText: {
		...Colors.boldFont,
		fontSize: '1.3rem',
		textAlign: 'left',
		marginTop: '1rem',
		marginBottom: '1rem',
		color: Colors.FONT_COLOR,
	},
	subText: {
		fontSize: '0.8rem',
		textAlign: 'left',
		color: Colors.FONT_COLOR,
		...Colors.regularFont
	},
	textFiledLabel: {
		textAlign: 'left',
		marginTop: '1.5rem',
		color: Colors.FONT_COLOR
	},
	formView: {
		width: '100%', // Fix IE 11 issue.
		height: '100%',
	},
	button: {
		textAlign: 'left',
	},
	radio1: {
		justifyContent: 'right',
		justifySelf: 'right',
		textAlign: 'right',
		alignSelf: 'right',
		alignItems: 'right',
	},
	radio2: {
		position: 'absolute',
		right: '6.5rem',
	},
	text: {
		textAlign: 'left',
		marginLeft: '0.5rem',
	},
}));