import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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

function forwardAnimation(currStep, swaps, refs, positions, origPositions) {
    if (currStep !== 0) {
        const prevSwap = swaps[currStep - 1]
        refs[prevSwap[0].index].current.style.backgroundColor = 'black'
        refs[prevSwap[1].index].current.style.backgroundColor = 'black'
    }

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

function backwardAnimation(swaps, currStep, refs, positions, origPositions) {
    const prevSwap = swaps[currStep - 1]
    const bar1 = refs[prevSwap[0].index].current
    const bar2 = refs[prevSwap[1].index].current

    const bar1Pos = positions[prevSwap[0].index]
    const bar2Pos = positions[prevSwap[1].index]
    const bar1OrigPos = origPositions[prevSwap[0].index]
    const bar2OrigPos = origPositions[prevSwap[1].index]

    const translateX1Amt = bar2Pos - bar1OrigPos
    const translateX2Amt = bar1Pos - bar2OrigPos

    bar1.style.backgroundColor = 'black'
    bar2.style.backgroundColor = 'black'
    bar1.style.transform = `translateX(${translateX1Amt}px)`
    bar2.style.transform = `translateX(${translateX2Amt}px)`
    
    if (currStep > 1) {
        const prevPrevSwap = swaps[currStep - 2]
        const bar1 = refs[prevPrevSwap[0].index].current
        const bar2 = refs[prevPrevSwap[1].index].current
        bar1.style.backgroundColor = theme.palette.secondary.dark
        bar2.style.backgroundColor = theme.palette.secondary.light
    }
}

function SortAnimation(swaps, currStep, refs, allPositions, skipBackward) {
    const positions = allPositions.positions[currStep]
    const origPositions = allPositions.origPositions

    if (skipBackward) {
        backwardAnimation(swaps, currStep, refs, positions, origPositions)
    } else {
        forwardAnimation(currStep, swaps, refs, positions, origPositions)
    }
}

export {
    SortAnimation
}