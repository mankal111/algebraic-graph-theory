import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';

import 'bootstrap/dist/css/bootstrap.min.css';

import GraphCanvas from './components/GraphCanvas';
import GraphDataPanel from './components/GraphDataPanel';
import OptionsContainer from './components/OptionsContainer';

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
  appBar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  gridContainer: {
    height: '100%',
    paddingTop: '66px',
  },
  gridColumn: {
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: 'auto',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar}>
        <ToolBar>
          <Typography variant="h6" className={classes.title}>
            Graph Maker
          </Typography>
          <OptionsContainer />
        </ToolBar>
      </AppBar>
      <Grid container className={classes.gridContainer} spacing={3} justify="space-around" alignItems="stretch">
        <Grid className={classes.gridColumn} item xs={7}>
          <Paper className={classes.paper}>
            <GraphCanvas/>
          </Paper>
        </Grid>
        <Grid className={classes.gridColumn} item xs={5}>
          <Paper className={classes.paper}>
            <GraphDataPanel />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
