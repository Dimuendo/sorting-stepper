import React, { createRef, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import useStyles from './Styles'
import theme from './Themes'
import TopAppBar from './TopAppBar'
import BarContainer from './BarContainer'
import {BubbleSort, BubblePositions} from '../Algorithms/BubbleSort';
import BotAppBar from './BotAppBar';

const ARRAY_LENGTH = 10
const BAR_WIDTH = 50
const BAR_MARGIN = 2

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

function sortAnimation(swaps, currStep, refs, allPositions) {
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

    bar1.style.backgroundColor = theme.palette.secondary.dark
    bar2.style.backgroundColor = theme.palette.secondary.light
    bar1.style.transform = `translateX(${translateX1Amt}px)`
    bar2.style.transform = `translateX(${translateX2Amt}px)`

    if (currStep === swaps.length - 1) {
        bar1.style.backgroundColor = 'black'
        bar2.style.backgroundColor = 'black'
    }
}

function BasePage() {
    const classes = useStyles()
    const [numArray, setArray] = React.useState(arrayGenerator(ARRAY_LENGTH))
    const [paused, setPaused] = React.useState(true)
    const [currStep, setStep] = React.useState(0)
    const [sort, setSort] = React.useState('bubble')
    const [skipForward, setSkipForward] = React.useState(false)
    const [refs, setRefs] = React.useState(createRefs())
    const [aniSpeed, setAniSpeed] = React.useState(550)
    
    useEffect(() => {
        let interval = null
        const swaps = BubbleSort(numArray)
        if (currStep >= swaps.length) setPaused(true)
        if (!paused) {
            interval = setInterval(() => {
                const allPositions = BubblePositions(refs, swaps, numArray.length, BAR_WIDTH, BAR_MARGIN)
                sortAnimation(swaps, currStep, refs, allPositions)
                setStep(currStep => currStep + 1)
                if (skipForward) {
                    setPaused(true)
                    setSkipForward(false)
                }
            }, aniSpeed)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [paused, currStep, refs, numArray, aniSpeed, skipForward])

    return (
        <Box className={classes.root}>
            <ThemeProvider theme={theme}>
                <TopAppBar
                    arrayLength={ARRAY_LENGTH}
                    arrayGenerator={arrayGenerator}
                    setArray={setArray}
                    setPaused={setPaused}
                    setStep={setStep}
                    setRefs={setRefs}
                    createRefs={createRefs}
                    refs={refs}
                    resetBars={resetBars}
                    setSort={setSort}
                />

                <BarContainer numArray={numArray} refs={refs} barWidth={BAR_WIDTH} barMargin={BAR_MARGIN}/>

                <BotAppBar 
                    setPaused={setPaused}
                    setAniSpeed={setAniSpeed}
                    setSkipForward={setSkipForward}
                    paused={paused}
                />
            </ThemeProvider>
        </Box>
    );
}

export default BasePage;
