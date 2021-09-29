import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '../../styles'
export const useStyles = makeStyles(() => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    subContainer: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#d3d6d9',
        justifyContent: 'center',
        padding: '2.5rem 0.2rem',
        marginTop: '2rem'
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.2rem',
        ...Colors.boldFont,
        textAlign: 'left',
        paddingTop: '10rem',
        paddingBottom: '9.5rem',
        paddingLeft: '5.5rem',
        paddingRight: '5.5rem',
        color: Colors.FONT_COLOR
    },
    cancelButton: {
        backgroundColor: '#243040',
        marginBottom: '3rem',
        marginTop: '2rem'
    },
    cancelText: {
        color: Colors.WHITE,
        ...Colors.regularFont,
        padding: '0.2rem 1.0rem'
    },
}))