import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { charAndSpecLatex, adjacencyMatrix } from '../matrix';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    latexContainer: {
        margin: '16px',
        width: '100%',
        maxHeight: '250px',
        overflow: 'auto',
    },
}))

export default function CharPolAndSpectrum({ matrix }){
    const classes = useStyles();

    let charAndSpecLatexObj = {};
    if (matrix.length<20){
        charAndSpecLatexObj = charAndSpecLatex(matrix);
    } else {
        charAndSpecLatexObj = {
            characteristicPolynomial: '\\text{I will not try to compute the characteristic polynomial.}',
            spectrum: '\\text{The computation would take long time in your browser.}'
        };
    }
    let {characteristicPolynomial, spectrum} = charAndSpecLatexObj;
    return (
        <div className={classes.root}>
            <Grid container alignItems="center" direction="column">
                <Grid item xs>
                    <Typography gutterBottom variant="h6">
                        Characteristic polynomial and spectrum
                    </Typography>
                </Grid>
                <Grid item className={classes.latexContainer}>
                    <InlineMath math={characteristicPolynomial}/>
                    <br/>
                    <InlineMath math={spectrum}/>
                </Grid>
            </Grid>
        </div>
    );
}