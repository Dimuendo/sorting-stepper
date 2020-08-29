import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Bar from './Bar'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#008B8B',
    },
}));

function BarContainer(props) {
    const classes = useStyles()

    return(
        <Box className={classes.root} display='flex' justifyContent='center'>
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
