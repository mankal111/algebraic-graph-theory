import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { arrayToLatexMatrix, adjacencyMatrix, degreeMatrix, laplacianMatrix } from '../matrix';
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
    },
}))

export default function GraphRepresentation({ vertices, edges }){
    const classes = useStyles();

    const [type, setType] = useState('Adjacency');
    // Create the latex text that describes the adjacencyMatrix
    let matrix;
    switch(type) {
        case 'Degree':
            matrix = degreeMatrix(vertices.length, edges);
            break;
        case 'Laplacian':
            matrix = laplacianMatrix(vertices.length, edges);
            break;
        case 'Adjacency':
        default:
            matrix = adjacencyMatrix(vertices.length, edges);
    }
    return (
        <div className={classes.root}>
            <Grid container alignItems="center" direction="column">
                <Grid item>
                    <Grid container direction={'row'}>
                        <Grid item>
                            <Select
                                value={type}
                                onChange={e => setType(e.target.value)}
                                labelId="matrix-representation-label"
                            >
                                <MenuItem value={'Adjacency'}>Adjacency</MenuItem>
                                <MenuItem value={'Degree'}>Degree</MenuItem>
                                <MenuItem value={'Laplacian'}>Laplacian</MenuItem>
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
                    <DownloadMatrixComponent matrix={matrix} />
                </Grid>
            </Grid>
        </div>
    );
}