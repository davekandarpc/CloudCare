import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Colors } from '../../../styles';

export const StyledTableCell = withStyles((theme) => ({
    head: { theme: theme.typography.subtitle2, textAlign: 'center', backgroundColor: '#dedfe1' },
    body: { theme: theme.typography.body1, textAlign: 'center'},
    root: {
        border: 'outline',
    }
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'transparent',
            textAlign: 'center',
            ...Colors.boldFont,
        },
        '&:nth-of-type(even)': {
            backgroundColor: 'transparent',
            textAlign: 'center',
        },
    },
}))(TableRow);

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
        fontSize: '2.5rem',
        color: Colors.FONT_COLOR
    },
    subText: {
        ...Colors.boldFont,
        marginTop: '1.5rem',
        color: Colors.FONT_COLOR
    },
    servicesData: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        textAlign: 'left',
        margin: '0.5rem',
        alignItems: 'center',
        backgroundColor: '#dedfe1'
    },
    dataIndex: {
        ...Colors.boldFont,
        fontSize: '1.2rem'
    },
    nameText: {
        flexDirection: 'column',
        paddingLeft: '1rem'
    },
    name: {
        ...Colors.boldFont,
        fontSize: '1rem'
    },
    clinicSubText: {
        fontSize: '0.8rem',
        ...Colors.regularFont
    },
    deleteIcon: {
        display: 'flex',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        alignItems: 'center'
    },
    formText: {
        alignItems: 'center',
        marginTop: '1.5rem',
        marginLeft: '0.5rem'
    },
    radioGroup: {
        flexDirection: 'row'
    },
    radioText: {
        marginTop: '0.5rem',
    },
    AddDependentBtn: {
        marginTop: '1rem',
        marginBottom: '5rem',
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
    },
    cancelBtn: {
        marginTop: '1.5rem',
        display: 'flex',
        marginRight: '1rem'
    },
    cancelText: {
        color: '#007bff'
    },
    tableWrapper: {
        '&::-webkit-scrollbar': {
            width: '1rem',
            height: '1rem',
            background: '#f1f1f1',
            borderRadius: 0,
        },
        '&::-webkit-scrollbar-thumb': {
            width: '1rem',
            height: '1rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 4
        },
        background: 'transparent',
        // border: '1px solid',
        marginTop: '1rem',
        marginBottom: '2rem',
    },
    tableRowLine: {
        width: '100%',
        height: '1rem',
        backgroundColor: 'black'
    }

}))