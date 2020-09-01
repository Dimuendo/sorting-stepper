function origBubblePositions(refs, numArrayLen, barWidth, barMargin) {
    let lowest = Number.MAX_SAFE_INTEGER
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
}

export {
    BubbleSort,
    BubblePositions
}