import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '../../styles';
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // maxWidth: '90%',
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
    cancelText: {
        color: 'white',
        fontSize: 'auto',
        padding: '0.2rem 1.0rem',
        ...Colors.regularFont
    },
    pageContent: {
        fontSize: 18,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    queueSizeBox: {
        backgroundColor: '#f3f3f3',
        padding: '16px 80px 16px 80px',
        marginTop: 24
    },
    queueSizeLabel: {
        fontSize: 22,
        lineHeight: 1,
        ...Colors.mediumFont,
        color: Colors.FONT_COLOR
    },
    queueSizeValue: {
        fontSize: 120,
        margin: 0,
        lineHeight: 1,
        ...Colors.lightFont,
        color: Colors.FONT_COLOR
    },
}))