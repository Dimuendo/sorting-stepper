import React from 'react'
import Box from '@material-ui/core/Box';

import Bar from './Bar'

function BarContainer(props) {
    return(
        <Box display='flex' justifyContent='center'>
            {props.numArray.map((num, index) => (
                <Bar 
                    barHeight={num.num * 10}
                    barWidth={props.barWidth}
                    barMargin={props.barMargin}
                    key={index} 
                    id={`bar-${index}`} 
                    ref={props.refs} 
                    index={index}>
                </Bar>
            ))}
        </Box>
    )
}

export default BarContainer
