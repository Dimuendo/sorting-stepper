import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bar: {
        height: props => `${props.barHeight}px`,
        width: props => `${props.barWidth}px`,
        marginLeft: props => `${props.barMargin}px`,
        backgroundColor: 'black',
        transition: 'transform 0.5s ease-in, color 1s ease-in',
    },
}));

const Bar = React.forwardRef((props, ref) => {
    const classes = useStyles(props)
    const currRef = ref[props.index]

    return(
        <div className={classes.bar} id={props.id} ref={currRef}></div>
    )
})

export default Bar
