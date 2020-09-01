import React, { createRef, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Box from '@material-ui/core/Box';

import TopAppBar from './TopAppBar'
import BarContainer from './BarContainer'
import { BubbleSort, BubblePositions } from '../Algorithms/BubbleSort';
import { SelectionSort, SelectionPositions } from '../Algorithms/SelectionSort'
import { SortAnimation } from '../Algorithms/SortAnimation'
import BotAppBar from './BotAppBar';
import { useMediaQuery } from '@material-ui/core';

const BAR_MARGIN = 2

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: '#008B8B',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#e91e63',
        },
        text: {
            primary: '#ffffff',
        }
    }
})

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

function createRefs(arrayLen) {
    const refs = {}
    for (let i = 0; i < arrayLen; i++) {
        refs[i] = createRef()
    }
    return refs
}

function resetBars(refs, arrayLen) {
    for (let i = 0; i < arrayLen; i++) {
        const ref = refs[i]
        const bar = ref.current
        bar.style.transform = 'none'
        bar.style.backgroundColor = 'black'
    }
}

function getSwaps(sort, numArray) {
    let swaps = [];
    switch (sort) {
        case 'bubble':
            swaps = BubbleSort(numArray)
            break
        case 'selection':
            swaps = SelectionSort(numArray)
            break
        default:
            console.log('No sort specified')
    }
    return swaps
}

function initiateAnimation(refs, swaps, arrayLen, barWidth, BAR_MARGIN, skipBackward, sort, currStep) {
    let allPositions = null
    switch (sort) {
        case 'bubble':
            allPositions = BubblePositions(refs, swaps, arrayLen, barWidth, BAR_MARGIN)
            SortAnimation(swaps, currStep, refs, allPositions, skipBackward)
            break
        case 'selection':
            allPositions = SelectionPositions(refs, swaps, arrayLen, barWidth, BAR_MARGIN)
            SortAnimation(swaps, currStep, refs, allPositions, skipBackward)
            break
        default:
            console.log('No animation specified')
    }
}

function BasePage() {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:700px)');
    let arrayLen = 0
    let barWidth = 0
    if (matches) {
        arrayLen = 10
        barWidth = 50
    } else {
        arrayLen = 10
        barWidth = 25
    }

    // State
    const [numArray, setArray] = React.useState(arrayGenerator(arrayLen))
    const [paused, setPaused] = React.useState(true)
    const [currStep, setStep] = React.useState(0)
    const [sort, setSort] = React.useState('bubble')
    const [skipForward, setSkipForward] = React.useState(false)
    const [skipBackward, setSkipBackward] = React.useState(false)
    const [refs, setRefs] = React.useState(createRefs(arrayLen))
    const [aniSpeed, setAniSpeed] = React.useState(550)
    
    useEffect(() => {
        let interval = null
        const swaps = getSwaps(sort, numArray)
        if (currStep >= swaps.length && !skipBackward) {
            setPaused(true)
            setSkipForward(false)
        }
        if (!paused) {
            interval = setInterval(() => {
                initiateAnimation(refs, swaps, arrayLen, barWidth, BAR_MARGIN, skipBackward, sort, currStep)
                setStep(currStep => currStep + 1)
                if (skipForward) {
                    setPaused(true)
                    setSkipForward(false)
                } else if (skipBackward) {
                    setPaused(true)
                    setSkipBackward(false)
                    setStep(currStep => currStep - 2)
                }
            }, aniSpeed)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [paused, currStep, refs, numArray, aniSpeed, skipForward, skipBackward, sort, arrayLen, barWidth])

    return (
        <Box className={classes.root}>
            <ThemeProvider theme={theme}>
                <TopAppBar
                    arrayLen={arrayLen}
                    currStep={currStep}
                    arrayGenerator={arrayGenerator}
                    setArray={setArray}
                    setPaused={setPaused}
                    setStep={setStep}
                    setRefs={setRefs}
                    createRefs={createRefs}
                    refs={refs}
                    resetBars={resetBars}
                    setSort={setSort}
                    setSkipBackward={setSkipBackward}
                />

                <BarContainer numArray={numArray} refs={refs} barWidth={barWidth} barMargin={BAR_MARGIN}/>

                <BotAppBar 
                    setPaused={setPaused}
                    setAniSpeed={setAniSpeed}
                    setSkipBackward={setSkipBackward}
                    setSkipForward={setSkipForward}
                    setStep={setStep}
                    currStep={currStep}
                    paused={paused}
                />
            </ThemeProvider>
        </Box>
    );
}

export default BasePage;
