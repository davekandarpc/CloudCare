import { makeStyles } from '@material-ui/core';
import { Colors } from '../../styles';
export const useStyles = makeStyles(() => ({
    mainContainer: {
        height: '100%'
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
        height: '100%'
    },
    rightPanel: {
        marginTop: 6,
        backgroundColor: '#ededed',
        // minHeight: '100vh',
        minHeight: '88vh',
        // maxHeight: 380,
        // overflowY: 'scroll',
        // overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '0.5rem',
            height: 10,
            background: '#f1f1f1',
            borderRadius: 0,
        },
        '&::-webkit-scrollbar-thumb': {
            width: '0.5rem',
            height: 10,
            background: '#cacaca',
            borderRadius: 2
        },
        paddingBottom: 16
    },
}))