import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
    btmAppBar: {
        top: 'auto',
        bottom: 0,
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
}));

function BotAppBar(props) {
    const classes = useStyles()

    return (
        <Box>
            <AppBar position="fixed" className={classes.btmAppBar}>
                <Toolbar>
                    <Grid 
                        container
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={1}>
                            <Box className={classes.sliderContainer}>
                                <Typography className={classes.sliderLabel} align='left' variant='body1' color='textPrimary'>
                                    Animation Speed
                                </Typography>
                                <Slider
                                    color='secondary'
                                    defaultValue={550}
                                    step={50}
                                    min={200}
                                    max={900}
                                    onChange={ (event, value) => {props.setAniSpeed(-(value - 550) + 550)}}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={1}>
                            <ButtonGroup className={classes.controls}>
                                <Button
                                    color='secondary' 
                                    onClick={ () => {
                                        if (props.currStep !== 0) {
                                            props.setSkipBackward(true)
                                            props.setPaused(false)
                                        }
                                    }}
                                    variant='text'
                                >
                                    <SkipPreviousIcon className={classes.icon}/>
                                </Button>
                                <Button
                                    color='secondary' 
                                    onClick={ () => {props.setPaused(!props.paused)} }
                                    variant='text'
                                >
                                    {props.paused ? <PlayArrowIcon className={classes.icon}/> : <PauseIcon className={classes.icon}/>}
                                </Button>
                                <Button
                                    color='secondary' 
                                    onClick={ () => {props.setSkipForward(true); props.setPaused(false)} }
                                    variant='text'
                                >
                                    <SkipNextIcon className={classes.icon}/>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default BotAppBar
