function origSelectionPositions(refs, numArrayLen, barWidth, barMargin) {
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

function SelectionPositions(refs, swaps, numArrayLen, barWidth, barMargin) {
    const positionsArray = []
    const positions = origSelectionPositions(refs, numArrayLen, barWidth, barMargin)
    const origPositions = origSelectionPositions(refs, numArrayLen, barWidth, barMargin)
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

function SelectionSort(numArray) {
    const numArrayCopy = JSON.parse(JSON.stringify(numArray))
    const len = numArrayCopy.length
    const swaps = []
    for (let i = 0; i < len; i++) {
        let min = i
        for (let j = i + 1; j < len; j++){
            if (numArrayCopy[j].num < numArrayCopy[min].num) {
                min = j
            }
        }
        if (min !== i) {
            swaps.push([numArrayCopy[i], numArrayCopy[min]])
            const temp = numArrayCopy[i];
            numArrayCopy[i] = numArrayCopy[min]
            numArrayCopy[min] = temp
        }
    }
    return swaps
}

export {
    SelectionSort,
    SelectionPositions
}