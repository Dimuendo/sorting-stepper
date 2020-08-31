import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: '#008B8B',
    },
    btmAppBar: {
        top: 'auto',
        bottom: 0,
    },
    btnContainer: {
        marginLeft: theme.spacing(3),
    },
    generateBtn: {
        color: 'white',
        marginLeft: '10px',
    },
    sortBtn: {
        color: 'white',
        // marginTop: '2px',
    },
    navTitleContainer: {
        marginLeft: 'auto'
    },
    iconButton: {
        marginRight: theme.spacing(1)
    },
    icon: {
        fontSize: 30,
    },
    sliderLabel: {
        marginTop: '10px',
    },
    controls: {
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
    },
    title: {
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        marginLeft: '10px',
    },
}));

export default useStyles