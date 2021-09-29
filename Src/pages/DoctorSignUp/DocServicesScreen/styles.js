import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
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
        ...Colors.boldFont,
        textAlign: 'center',
        padding: '2rem',
        fontSize: '2.5rem'
    },
    subText: {
        ...Colors.boldFont,
        marginTop: '1.5rem'
    },
    formText: {
        textAlign: 'left',
        marginLeft: '0rem'
    },
    AddBtn: {
        marginTop: '1rem',
        justifyContent: 'flex-start',

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
        // margin: '1.5rem',
        // border:'0.1rem solid'
    },
    cancelBtn: {
        marginTop: '1.5rem',
        display: 'flex',
        marginRight: '1rem'
    },
    cancelText: {
        color: '#007bff'
    },
    servicesData:{
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        textAlign: 'left',
        margin: '0.5rem',
        alignItems: 'center',
        backgroundColor: '#dedfe1'
    },
    servicesName: {
        paddingLeft: '1rem',
        ...Colors.boldFont,
        fontSize: '1.2rem'
    },
    deleteIcon: {
        display: 'flex',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        alignItems: 'center'
    },
    nameText: {
        flexDirection: 'column',
        paddingLeft: '1rem'
    },
    dataIndex: {
        ...Colors.boldFont,
        fontSize: '1.2rem'
    },
    clinicName: {
        ...Colors.boldFont,
        fontSize: '1.2rem'
    },
    clinicSubText: {
        fontSize:'0.8rem',
        ...Colors.regularFont
    },
    AddDependentBtn: {
        margin: '2rem',
        justifyContent: 'flex-end',
    }

}))