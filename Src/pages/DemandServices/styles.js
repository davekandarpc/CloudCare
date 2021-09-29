import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
	mainContainer: {
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	titleContainer: {
		marginTop: '3vh',
		textAlign: 'left',
	},
	text: {
		fontSize: 42,
		color: Colors.FONT_COLOR,
		...Colors.mediumFont,
		['@media (max-width: 768px)']: {
			fontSize: 18
		}
	},
	subText: {
		fontSize: 18,
		width: '40%',
		color: Colors.FONT_COLOR,
		...Colors.mediumFont,
		opacity: 0.9,
		...Colors.mediumFont,
		['@media (max-width: 768px)']: {
			fontSize: 14
		}
	},
	logoImg: {
		width: '100%',
		objectFit: 'contain',
		marginTop: '2vh',
		['@media (min-width: 1290px)']: {
			width: '90vw',
			position: 'absolute',
			bottom: 0,
			right: 0,
			zIndex: -1
		},
	},
	signupButton: {
		textAlign: 'left',
		marginTop: '5vh',
		marginBottom: 12
	},
	loader: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loaderProgressLine: {
		marginTop: '0.5rem',
		color: Colors.PRIMARY
	}
}));