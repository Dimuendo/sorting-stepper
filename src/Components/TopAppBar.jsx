import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
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
    title: {
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        marginLeft: '10px',
    },
}));

function reset(props) {
    props.setArray(props.arrayGenerator(props.arrayLen))
    props.setPaused(true)
    props.setStep(0)
    props.setRefs(props.createRefs(props.arrayLen))
    props.resetBars(props.refs, props.arrayLen)
    props.setSkipBackward(false)
}

function TopAppBar(props) {
    const classes = useStyles()

    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid 
                        container
                        alignItems='center'
                        justify='space-between'
                    >
                        <Grid item>
                            <Box display='flex'>
                                <Typography variant="h5" className={classes.title} color='textPrimary'>
                                    Sorting Stepper
                                </Typography>
                                <Divider orientation="vertical" flexItem className={classes.divider} variant='fullWidth' />
                                <Button
                                    className={classes.generateBtn}
                                    color='secondary' 
                                    onClick={ () => {
                                        reset(props)
                                        // props.setArray(props.arrayGenerator(props.arrayLen))
                                        // props.setPaused(true)
                                        // props.setStep(0)
                                        // props.setRefs(props.createRefs(props.arrayLen))
                                        // props.resetBars(props.refs, props.arrayLen)
                                        // props.setSkipBackward(false)
                                    }}>
                                    Generate Array
                                </Button>
                            </Box>
                        </Grid>
                        <ButtonGroup className={classes.btnContainer} variant='text' color='secondary'>
                            <Button 
                                className={classes.sortBtn}
                                onClick={ () => {
                                    if (props.currStep !== 0) reset(props)
                                    props.setSort('bubble')
                                    props.setPaused(false)
                                }}
                            >
                                Bubble Sort
                            </Button>
                            <Button 
                                className={classes.sortBtn}
                                onClick={ () => {
                                    if (props.currStep !== 0) reset(props)
                                    props.setSort('selection')
                                    props.setPaused(false)
                                }}
                            >
                                Selection Sort
                            </Button>
                            {/* <Button 
                                className={classes.sortBtn} 
                            >
                                Quick Sort
                            </Button>
                            <Button 
                                className={classes.sortBtn} 
                            >
                                Merge Sort
                            </Button> */}
                        </ButtonGroup>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default TopAppBar
