import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../styles';
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    subContainerPaper:{
        width: '100%',
        height: '45%',
        backgroundColor: '#f5f5f5',
    },
    subContainer: {
        width: '100%',
        height: '40%',
    },
    text: {
        ...Colors.boldFont,
        textAlign: 'center',
        padding:'2rem',
        fontSize: '2.5rem'
    },
    containerView: {
        alignSelf: 'center'
    },
    formView: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '3rem',
        height: '100%',
        marginBottom: theme.spacing(10)
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
    signUpText: {
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
    cancelText: {
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
    ConditionTextBoxCss: {
        width: '80%'
    },
    TextBoxViewConditions: {
        width: '80%',
    },
    TextBoxViewConditionsView:{
        margin: '0.5rem 0rem',
    },
    QustionCheckBoxView: {
        margin: '2rem 0rem',
        alignItems: 'center',
    },
    formTextConditions: {
        textAlign: 'left',
        marginRight: '2rem',
    },
    CommentView:{
        paddingBottom:'3rem'
    },
    radioGroup: {
        flexDirection: 'row'
    },
}))