import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import useStyles from './Styles'
import theme from './Themes'

function TopAppBar(props) {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid 
                        container
                        alignItems='center'
                        justify='space-between'
                    >
                        <Grid item>
                            <Box display='flex'>
                                <Typography variant="h5" className={classes.title} color='textPrimary'>
                                    Sorting Stepper
                                </Typography>
                                <Divider orientation="vertical" flexItem className={classes.divider} variant='fullWidth' />
                                <Button
                                    className={classes.generateBtn}
                                    color='secondary' 
                                    onClick={ () => {
                                        props.setArray(props.arrayGenerator(props.arrayLength))
                                        props.setPaused(true)
                                        props.setStep(0)
                                        props.setRefs(props.createRefs())
                                        props.resetBars(props.refs)
                                    }}>
                                    Generate Array
                                </Button>
                            </Box>
                        </Grid>
                        <ButtonGroup className={classes.btnContainer} variant='text' color='secondary'>
                            <Button 
                                className={classes.sortBtn}
                                onClick={ () => {
                                    props.setSort()
                                    props.setPaused()
                                }}
                            >
                                Bubble Sort
                            </Button>
                            <Button 
                                className={classes.sortBtn} 
                            >
                                Selection Sort
                            </Button>
                            <Button 
                                className={classes.sortBtn} 
                            >
                                Merge Sort
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </ThemeProvider>
    )
}

export default TopAppBar

// {/* <AppBar position="fixed">
//                     <Toolbar>
//                         <Grid 
//                             container
//                             alignItems='center'
//                             justify='space-between'
//                         >
//                             <Grid item>
//                                 <Box display='flex'>
//                                     <Typography variant="h5" className={classes.title} color='textPrimary'>
//                                         Sorting Stepper
//                                     </Typography>
//                                     <Divider orientation="vertical" flexItem className={classes.divider} variant='fullWidth' />
//                                     <Button
//                                         className={classes.generateBtn}
//                                         color='secondary' 
//                                         onClick={ () => {
//                                             setArray(arrayGenerator(ARRAY_LENGTH))
//                                             setPaused(true)
//                                             setStep(0)
//                                             setRefs(createRefs())
//                                             resetBars(refs)
//                                         }}>
//                                         Generate Array
//                                     </Button>
//                                 </Box>
//                             </Grid>
//                             <ButtonGroup className={classes.btnContainer} variant='text' color='secondary'>
//                                 <Button 
//                                     className={classes.sortBtn}
//                                     onClick={ () => {
//                                         setSort('bubble')
//                                         setPaused(false)
//                                     }}
//                                 >
//                                     Bubble Sort
//                                 </Button>
//                                 <Button 
//                                     className={classes.sortBtn} 
//                                 >
//                                     Selection Sort
//                                 </Button>
//                                 <Button 
//                                     className={classes.sortBtn} 
//                                 >
//                                     Merge Sort
//                                 </Button>
//                             </ButtonGroup>
//                         </Grid>
//                     </Toolbar>
//                 </AppBar>
//                 <Toolbar /> */}