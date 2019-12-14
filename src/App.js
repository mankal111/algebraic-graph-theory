import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GraphCanvas from './components/GraphCanvas';
import GraphDataPanel from './components/GraphDataPanel.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#cfe8fc',
    padding: '16px',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={3} justify="space-around" alignItems="stretch">
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Algebraic Graph Theory
            </Typography>
            <GraphCanvas/>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <GraphDataPanel />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
