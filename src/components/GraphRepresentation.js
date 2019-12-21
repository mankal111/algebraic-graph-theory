import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { arrayToLatexMatrix, getMatrixRepresentation } from '../matrix';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DownloadMatrixComponent from './DownloadMatrixComponent';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    matrixContainer: {
        margin: '16px',
        width: '100%',
        maxHeight: '250px',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
    },
}))

export default function GraphRepresentation({ verticesLength, edges, representation, setRepresentation }){
    const classes = useStyles();
    const matrix = getMatrixRepresentation(verticesLength, edges, representation, 'latex');
    return (
        <div className={classes.root}>
            <Grid container alignItems="center" direction="column">
                <Grid item>
                    <Grid container direction={'row'}>
                        <Grid item>
                            <Select
                                value={representation}
                                onChange={e => setRepresentation(e.target.value)}
                                labelId="matrix-representation-label"
                            >
                                <MenuItem value={'Adjacency'}>Adjacency</MenuItem>
                                <MenuItem value={'Degree'}>Degree</MenuItem>
                                <MenuItem value={'Laplacian'}>Laplacian</MenuItem>
                                <MenuItem value={'SNLaplacian'}>Symmetric Normalized Laplacian</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'>matrix</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.matrixContainer}>
                    <InlineMath math={arrayToLatexMatrix(matrix)}/>
                </Grid>
                <Grid item>
                    <DownloadMatrixComponent
                        verticesLength={verticesLength}
                        edges={edges}
                        representation={representation}
                        setRepresentation={setRepresentation}
                    />
                </Grid>
            </Grid>
        </div>
    );
}