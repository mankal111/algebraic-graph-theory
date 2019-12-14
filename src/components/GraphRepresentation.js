import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Alert } from 'react-bootstrap';
import { arrayToLatexMatrix, adjacencyMatrix, degreeMatrix, laplacianMatrix } from '../matrix';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    matrixContainer: {
        margin: '16px',
    },
}))

export default function GraphRepresentation({ vertices, edges }){
    const classes = useStyles();

    const [type, setType] = useState('Adjacency');
    // Create the latex text that describes the adjacencyMatrix
    let latexMatrix;
    switch(type) {
        case 'Degree':
            latexMatrix = arrayToLatexMatrix(degreeMatrix(vertices.length, edges));
            break;
        case 'Laplacian':
            latexMatrix = arrayToLatexMatrix(laplacianMatrix(vertices.length, edges));
            break;
        case 'Adjacency':
        default:
            latexMatrix = arrayToLatexMatrix(adjacencyMatrix(vertices.length, edges));
    }
    return (
        <div className={classes.root}>
            <Grid container alignItems="center" direction="column">
                <Grid item xs>
                    <Typography gutterBottom variant="h5">
                        Graph representation
                    </Typography>
                </Grid>
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
                    {
                        (vertices.length < 14) ?
                        (<InlineMath math={latexMatrix}/>) :
                        (<Alert variant={'warning'}>The matrix is too big to show it here.<br/> But you can still download it.</Alert>)
                    }
                </Grid>
            </Grid>
        </div>
    );
}