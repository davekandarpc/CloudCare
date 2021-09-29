import { makeStyles } from '@material-ui/core';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    updateBillingDataSection: {
        textAlign: 'left',
        marginTop: 16
    },
    updateTitle: {
        fontSize: 16,
        ...Colors.boldFont,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    subTitle: {
        fontSize: 14,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    fileDetails: {
        marginTop: 12,
        marginBottom: 12
    },
    fileDetailsRow: {
        display: 'flex',
        alignItems: 'center'
    },
    fileDetailsText: {
        fontSize: 12,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    fileDetailsValue: {
        marginLeft: 10
    }
}))