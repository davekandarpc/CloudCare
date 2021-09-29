import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../styles';
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    subContainerPaper:{
        width: '100%',
        height: '85%',
        backgroundColor: '#f5f5f5',
    },
    subContainer: {
        width: '100%',
        height: 'auto',
    },
    text: {
        ...Colors.boldFont,
        textAlign: 'center',
        padding:'2rem',
    },
    subtitleText:{
        ...Colors.boldFont,
        margin:'1.5rem 0rem'
    },
    formView: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        height: '100%',
        marginBottom: theme.spacing(10),
        paddingBottom:'3rem'
    },
    formText: {
        textAlign: 'left',
        marginLeft: '0rem'
    },
    emergencyContact: {
        width: '100%',
        backgroundColor: 'gray'
    },
    signUpButton: {
        marginTop: '1.5rem',
        backgroundColor: '#007bff'
    },
    signUpText:{
        color: 'white',
    },
    Button: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '1.5rem'
    },
    cancelBtn: {
        marginTop: '1.5rem',
        display: 'flex',
        marginRight: '1rem'
    },
    cancelText:{
        color: '#007bff'
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
    AddDepandentBtn:{
        margin:'2rem'
    },
    CheckBoxView:{
        textAlign:'left'
    },
    radioGroup: {
        flexDirection: 'row'
    },
}))