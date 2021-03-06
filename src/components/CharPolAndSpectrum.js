import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { charAndSpecLatex, getMatrixRepresentation, arrayToTextMatrix } from '../matrix';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DownloadScriptComponent from './DownloadScriptComponent';

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
    mainGridContainer: {
        width: '100%',
    },
    externalComputeContainer: {
        width: '100%',
    },
}))



export default function CharPolAndSpectrum({ verticesLength, edges, representation }){
    const classes = useStyles();
    const matrix = getMatrixRepresentation(verticesLength, edges, representation, 'approx');

    const wolframAlphaLink = () => {
        const wolframMatrix = getMatrixRepresentation(verticesLength, edges, representation, 'mathematica');
        return "https://www.wolframalpha.com/input/?i=" +
            encodeURI(arrayToTextMatrix(wolframMatrix,'{{','}}',', ','},{'));
    }
    let contentElement = {};
    if (edges.length<20){
        const {characteristicPolynomial, spectrum} = charAndSpecLatex(matrix);
        contentElement = (
            <Grid container direction="column" className={classes.latexContainer}>
                <Grid item xs>
                    <InlineMath math={characteristicPolynomial}/>
                </Grid>
                <Grid item xs>
                    <InlineMath math={spectrum}/>
                </Grid>
                <Typography variant="body1">
                    The characteristic polynomial and the spectrum are rough approximations.
                    Use one of the mathematics software systems for more precise computations.
                </Typography>
            </Grid>
        )
    } else {
        contentElement = (
            <Typography variant="body1">
                I will not try to compute the characteristic polynomial because the
                computation would take too long time in your browser.
            </Typography>
        );
    }
    return (
        <div className={classes.root}>
            <Grid
                container
                alignItems="center"
                direction="column"
                className={classes.mainGridContainer}
            >
                <Grid item xs>
                    <Typography gutterBottom variant="h6">
                        Characteristic polynomial and spectrum
                    </Typography>
                </Grid>
                <Grid item xs>
                    {contentElement}
                </Grid>
                <Grid item xs className={classes.externalComputeContainer}>
                    <Typography gutterBottom variant="h6">
                        Compute Online:
                    </Typography>
                    <Button variant="contained" color="primary" target="_blank" href={wolframAlphaLink()}>
                        Wolfram Alpha
                    </Button>
                    <Typography gutterBottom variant="h6">
                        Download Scripts:
                    </Typography>
                    <Grid 
                        container
                        alignItems="center"
                        direction="row"
                        justify="space-around"
                    >
                        <Grid item>
                            <DownloadScriptComponent
                                verticesLength={verticesLength}
                                edges={edges}
                                representation={representation}
                                platform={"Mathematica"}
                            />
                        </Grid>
                        <Grid item>
                            <DownloadScriptComponent
                                verticesLength={verticesLength}
                                edges={edges}
                                representation={representation}
                                platform={"Matlab"}
                            />
                        </Grid>
                        <Grid item>
                            <DownloadScriptComponent
                                verticesLength={verticesLength}
                                edges={edges}
                                representation={representation}
                                platform={"Python"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}