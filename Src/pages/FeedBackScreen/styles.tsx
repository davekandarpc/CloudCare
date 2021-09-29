import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../styles'
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        marginTop: '2.5rem',
        borderWidth: '2px solid',
    },
    nonBoldtextLarge: {
        fontSize: 26,
        marginTop: '2.5rem',
        color: Colors.FONT_COLOR,
        ...Colors.boldFont,
    },
    subText: {
        fontSize: 18,
        ...Colors.regularFont
    },
    qualityLabel: {
        fontSize: 18,
        marginTop: '2.5rem',
        ...Colors.regularFont
    },
    additionalCommentsText: {
        fontSize: 15,
        ...Colors.boldFont,
        marginTop: '2.5rem'
    },
    txtArea: {
    }

}))