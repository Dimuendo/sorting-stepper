import React, { createRef, useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import BarContainer from './BarContainer'
import {BubbleSort, BubblePositions} from '../Algorithms/BubbleSort';

const ARRAY_LENGTH = 10
const BAR_WIDTH = 50
const BAR_MARGIN = 2

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#008B8B',
    },
    btmAppBar: {
        top: 'auto',
        bottom: 0,
        alignItems: 'center',
    },
    btnContainer: {
        marginLeft: theme.spacing(3),
    },
    sortBtn: {
    },
    navTitleContainer: {
        marginLeft: 'auto'
    },
    iconButton: {
        marginRight: theme.spacing(1)
    },
    icon: {
        marginRight: theme.spacing(1)
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#263238',
        },
    }
})

const btnTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#03a9f4',
        },
        secondary: {
            main: '#FFFFFF',
        },
    },
});

function arrayGenerator(arrayLen) {
    const numArray = []
    for (let i = 0; i < arrayLen; i++) {
        const randNum = Math.floor(Math.random() * 50) + 1
        numArray.push({
            'index': i,
            'num': randNum,
        })
    }
    return numArray
}

function sortAnimation(swaps, currStep, refs, allPositions, prevBars) {
    if (currStep !== 0) {
        const prevSwap = swaps[currStep - 1]
        refs[prevSwap[0].index].current.style.backgroundColor = 'black'
        refs[prevSwap[1].index].current.style.backgroundColor = 'black'
    }

    const positions = allPositions.positions[currStep]
    const origPositions = allPositions.origPositions

    const swap = swaps[currStep]
    const bar1 = refs[swap[0].index].current
    const bar2 = refs[swap[1].index].current

    const bar1Pos = positions[swap[0].index]
    const bar2Pos = positions[swap[1].index]
    const bar1OrigPos = origPositions[swap[0].index]
    const bar2OrigPos = origPositions[swap[1].index]

    const translateX1Amt = bar2Pos - bar1OrigPos
    const translateX2Amt = bar1Pos - bar2OrigPos

    bar1.style.backgroundColor = 'red'
    bar2.style.backgroundColor = 'red'
    bar1.style.transform = `translateX(${translateX1Amt}px)`
    bar2.style.transform = `translateX(${translateX2Amt}px)`

    if (currStep === swaps.length - 1) {
        bar1.style.backgroundColor = 'black'
        bar2.style.backgroundColor = 'black'
    }
}

function createRefs() {
    const refs = {}
    for (let i = 0; i < ARRAY_LENGTH; i++) {
        refs[i] = createRef()
    }
    return refs
}

function resetBars(refs) {
    for (let i = 0; i < ARRAY_LENGTH; i++) {
        const ref = refs[i]
        const bar = ref.current
        bar.style.transform = 'none'
        bar.style.backgroundColor = 'black'
    }
}

function BasePage() {
    const classes = useStyles()
    const [numArray, setArray] = React.useState(arrayGenerator(ARRAY_LENGTH))
    const [paused, setPaused] = React.useState(true)
    const [currStep, setStep] = React.useState(0)
    const [sort, setSort] = React.useState('bubble')
    const [refs, setRefs] = React.useState(createRefs())
    
    useEffect(() => {
        let interval = null
        const swaps = BubbleSort(numArray)
        if (currStep >= swaps.length) setPaused(true)
        if (!paused) {
            interval = setInterval(() => {
                const allPositions = BubblePositions(refs, swaps, numArray.length, BAR_WIDTH, BAR_MARGIN)
                sortAnimation(swaps, currStep, refs, allPositions, [])
                setStep(currStep => currStep + 1)
            }, 300)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [paused, currStep, refs, numArray])

    return (
        <Box className={classes.root}>
            <ThemeProvider theme={theme}>

                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Sorting Stepper
                        </Typography>
                        <ThemeProvider theme={btnTheme}>
                            <ButtonGroup className={classes.btnContainer} variant='text' color='primary'>
                                <Button className={classes.asdf} color='secondary' 
                                    onClick={ () => {
                                        setArray(arrayGenerator(ARRAY_LENGTH))
                                        setPaused(true)
                                        setStep(0)
                                        setRefs(createRefs())
                                        resetBars(refs)
                                    }}>
                                    Generate Random Array
                                </Button>
                                <Button className={classes.sortBtn} color='secondary' 
                                    onClick={ () => {
                                        setSort('bubble')
                                        setPaused(false)
                                    }}>
                                    Bubble Sort
                                </Button>
                                <Button className={classes.sortBtn} color='secondary'>
                                    Selection Sort
                                </Button>
                                <Button className={classes.sortBtn} color='secondary'>
                                    Merge Sort
                                </Button>
                            </ButtonGroup>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
                <Toolbar />

                <BarContainer numArray={numArray} refs={refs} barWidth={BAR_WIDTH} barMargin={BAR_MARGIN}/>

                <AppBar position="fixed" className={classes.btmAppBar}>
                    <Toolbar>
                        <Box display='flex' justifyContent='center'>
                            <Button className={classes.sortBtn} color='secondary' 
                                onClick={ () => {setPaused(!paused)} }>
                                {paused ? <PlayArrowIcon/> : <PauseIcon/>}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Toolbar />

            </ThemeProvider>
        </Box>
    );
}

export default BasePage;
