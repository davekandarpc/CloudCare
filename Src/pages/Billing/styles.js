import { makeStyles } from '@material-ui/core';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        height: '100%',
        marginBottom: 12
    },
    title: {
        fontSize: 20,
        ...Colors.boldFont,
        textAlign: 'left',
        color: Colors.FONT_COLOR
    },
    subTitle: {
        fontSize: 16,
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 12,
        color: Colors.FONT_COLOR,
        ...Colors.regularFont
    },
    pageNavMenus: {
        display: 'flex',
        justifyContent: 'center'
    },
    navMenuItem: {
        color: Colors.FONT_COLOR,
        padding: 8,
        cursor: 'pointer',
        marginRight: 12
    },
    activeNavMenuItem: {
        color: '#fff',
        backgroundColor: Colors.FONT_COLOR,
        padding: 8,
        cursor: 'pointer',
        marginRight: 12
    },
    leftPanel: {
        paddingTop: 6,
        paddingRight: 10
    },
    rightPanel: {
        marginTop: 6,
        backgroundColor: '#fff',
        minHeight: '100vh',
        height: '100%',
        borderLeft: '1px solid gray'
    },
}))