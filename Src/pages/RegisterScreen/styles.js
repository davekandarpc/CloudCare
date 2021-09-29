import { makeStyles } from '@material-ui/core/styles';
import {Colors} from '../../styles';
export const useStyles = makeStyles(() => ({
    divRoot: {
        height: '100%'
    },
    mainGrid: {
       paddingBottom: '8rem'
    },
    textReg: {
        fontSize: 46,
        ...Colors.mediumFont
    },
    signUpButton: {
        justifyContent: 'center',
        marginTop: '1rem',
        backgroundColor: Colors.PRIMARY,
    },
    signUpText: {
        padding: '0.5rem 2rem'
    },

    paper: {
        marginBottom:'5rem'
    },
    FirstNameView: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem'
    },
    MainContainer: {
        width: 'auto',
        marginTop: '1.5rem',
        justify: 'center'
    },
    CenterView: {
        textAlign: 'center',
        justifyContent: 'center',
        justifySelf: 'center'
    },
    text: {
        textAlign: 'left',
        marginLeft: '0.5rem'
    },

}))