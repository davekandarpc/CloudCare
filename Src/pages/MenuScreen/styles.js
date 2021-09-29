import { makeStyles } from '@material-ui/core'
import { Colors } from '../../styles'
export const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    content:{
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    welcomeTitle: {
        fontSize: 24,
        color: Colors.PRIMARY,
        ...Colors.boldFont
    },
    welcomeText: {
        fontSize: 16,
        color: Colors.FONT_COLOR,
        fontStyle: 'italic',
        ...Colors.regularFont
    }
}))