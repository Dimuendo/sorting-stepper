// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// function BubbleSwaps(refs, swaps, numArrayLen, currStep) {
//     console.log('Swapping')

//     let positions = {}
//     let origPositions = {}
//     for (let i = 0; i < numArrayLen; i++) {
//         positions[i] = refs[i].current.getBoundingClientRect().x
//         origPositions[i] = refs[i].current.getBoundingClientRect().x
//     }

//     const translations = []
//     for (let i = 0; i < swaps.length; i++) {
//         const swap = swaps[i]
//         const bar1 = refs[swap[0].index].current
//         const bar2 = refs[swap[1].index].current

//         const bar1Pos = positions[swap[0].index]
//         const bar2Pos = positions[swap[1].index]
//         const bar1OrigPos = origPositions[swap[0].index]
//         const bar2OrigPos = origPositions[swap[1].index]

//         const translateX1Amt = bar2Pos - bar1OrigPos
//         const translateX2Amt = bar1Pos - bar2OrigPos
//         // bar1.style.transform = `translateX(${translateX1Amt}px)`
//         // bar2.style.transform = `translateX(${translateX2Amt}px)`

//         // translations.push({
//         //     'bar1': {'index': swap[0].index, 'x': translateX1Amt },
//         //     'bar2': {'index': swap[1].index, 'x': translateX2Amt },
//         // })
//         translations.push({
//             'bar1': {'ref': bar1, 'translation': `translateX(${translateX1Amt}px)`},
//             'bar2': {'ref': bar2, 'translation': `translateX(${translateX2Amt}px)`},
//         })

//         positions[swap[0].index] = bar2Pos
//         positions[swap[1].index] = bar1Pos
//         // await sleep(550)
//     }
//     return translations
// }

function origBubblePositions(refs, numArrayLen, barWidth, barMargin) {
    let lowest = 10000
    for (let i = 0; i < numArrayLen; i++) {
        const position = refs[i].current.getBoundingClientRect().x
        if (position < lowest) {
            lowest = position
        }
    }

    let origPositions = {}
    for (let i = 0; i < numArrayLen; i++) {
        origPositions[i] = lowest + i * (barWidth + barMargin)
    }
    return origPositions
}

function BubblePositions(refs, swaps, numArrayLen, barWidth, barMargin) {
    const positionsArray = []
    const positions = origBubblePositions(refs, numArrayLen, barWidth, barMargin)
    const origPositions = origBubblePositions(refs, numArrayLen, barWidth, barMargin)
    positionsArray.push(origPositions)

    for (let i = 0; i < swaps.length; i++) {
        const swap = swaps[i]

        const bar1Pos = positions[swap[0].index]
        const bar2Pos = positions[swap[1].index]

        positions[swap[0].index] = bar2Pos
        positions[swap[1].index] = bar1Pos

        positionsArray.push(JSON.parse(JSON.stringify(positions)))
        // positionsArray.push(positions)
    }

    return {'origPositions': origPositions, 'positions': positionsArray}
}

function BubbleSort(numArray) {
    const numArrayCopy = JSON.parse(JSON.stringify(numArray))
    const len = numArrayCopy.length
    const swaps = []
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (numArrayCopy[j].num > numArrayCopy[j + 1].num) {
                swaps.push([numArrayCopy[j], numArrayCopy[j + 1]])
                const temp = numArrayCopy[j]
                numArrayCopy[j] = numArrayCopy[j + 1]
                numArrayCopy[j + 1] = temp
            }
        }
    }
    return swaps
    // return BubbleSwaps(refs, swaps, numArrayCopy.length)
}

export {
    BubbleSort,
    BubblePositions
}