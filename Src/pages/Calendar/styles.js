import { makeStyles } from '@material-ui/core';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        flexDirection: 'column',
        height: '100%'
    },
    title: {
        fontSize: 20,
        ...Colors.boldFont,
        textAlign: 'left',
        marginBottom: 12,
        color: Colors.FONT_COLOR,
        ['@media (max-width: 420px)']:{
            fontSize: 22,
            ...Colors.boldFont,
            textAlign: 'left',
            marginBottom: 12,
            color: Colors.FONT_COLOR,
        }
    },
    changeToScheduleView: {
        display: 'flex',
        alignItems: 'center'
    },
    toggleButton: {
        width: 'fit-content',
        marginLeft: 16
    }
}))