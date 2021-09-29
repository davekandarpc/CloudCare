import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
	mainContainer: {
		justifyContent: 'left',
		width: '100%',
		paddingBottom: 16
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
		color: Colors.FONT_COLOR
	},
	formView: {
		// width: '100%', // Fix IE 11 issue.
		// height: '100%',
	},
	button: {
		textAlign: 'left',
		// marginTop: 22
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
	rolesTableHeader: {
		display: 'flex',
		wordWrap: 'break-word'
	},
	roleHeader: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'left',
		border: '1px solid',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	permissionHeader: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '40%',
		maxWidth: '40%',
		textAlign: 'left',
		border: '1px solid',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	addPermissionHeader: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '30%',
		maxWidth: '30%',
		textAlign: 'left',
		border: '1px solid',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	actionHeader: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '10%',
		maxWidth: '10%',
		textAlign: 'center',
		border: '1px solid',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	rolesTableRow: {
		display: 'flex',
		wordWrap: 'break-word'
	},
	roleRow: {
		fontSize: 14,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'left',
		border: '0.5px solid grey',
		padding: 8,
		paddingTop: 11,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		wordWrap: 'break-word'
	},
	permissionRow: {
		fontSize: 14,
		width: '40%',
		maxWidth: '40%',
		textAlign: 'left',
		border: '0.5px solid grey',
		borderLeft: 'none',
		padding: 8,
		paddingTop: 11,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		wordWrap: 'break-word'
	},
	AddPermissionRow: {
		fontSize: 14,
		width: '30%',
		maxWidth: '30%',
		textAlign: 'left',
		border: '0.5px solid grey',
		borderLeft: 'none',
		padding: 8,
		paddingTop: 11,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		flexWrap: 'wrap',
		wordWrap: 'break-word'
	},
	actionRow: {
		fontSize: 14,
		minWidth: '10%',
		maxWidth: '10%',
		textAlign: 'center',
		border: '0.5px solid grey',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		wordWrap: 'break-word'
	},
	actionButton: {
		color: Colors.PRIMARY,
		cursor: 'pointer',
	},
	addNewRoleButton: {
		textAlign: 'left',
		marginTop: 12,
		marginBottom: 12
	},
	editPopupTitle: {
		...Colors.boldFont,
		fontSize: 16,
		textAlign: 'left',
		color: Colors.FONT_COLOR,
		marginBottom: 12
	},


	previligesHeader1: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'left',
		border: '1px solid',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	previligesHeader2: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '60%',
		maxWidth: '60%',
		textAlign: 'left',
		border: '1px solid',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},
	previligesHeader3: {
		fontSize: 16,
		...Colors.boldFont,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'center',
		border: '1px solid',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		wordWrap: 'break-word'
	},

	previligesRow1: {
		fontSize: 14,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'left',
		border: '0.5px solid grey',
		padding: 8,
		paddingTop: 11,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		wordWrap: 'break-word'
	},
	previligesRow2: {
		fontSize: 14,
		width: '60%',
		maxWidth: '60%',
		textAlign: 'left',
		border: '0.5px solid grey',
		borderLeft: 'none',
		padding: 8,
		paddingTop: 11,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		flexWrap: 'wrap',
		wordWrap: 'break-word'
	},
	previligesRow3: {
		fontSize: 14,
		minWidth: '20%',
		maxWidth: '20%',
		textAlign: 'center',
		border: '0.5px solid grey',
		borderLeft: 'none',
		padding: 8,
		color: Colors.FONT_COLOR,
		...Colors.regularFont,
		wordWrap: 'break-word'
	},
}));