import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GetApp from '@material-ui/icons/GetApp';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { arrayToTextMatrix, getMatrixRepresentation } from '../matrix';
 
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({verticesLength, edges, representation, setRepresentation}) {
  const [open, setOpen] = React.useState(false);
  const [format, setFormat] = React.useState('space');
  const [expr, setExpr] = React.useState('approx');
  const [newLines, setNewLines] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const copyText = () => {
    // Get the textarea element
    const textArea = document.getElementById('matrixTextarea');
    // Select text
    textArea.select();
    // Copy text
    document.execCommand("copy");
  }

  const download = () => {
    // Get the textarea element
    const textArea = document.getElementById('matrixTextarea');
    // Create the blob
    var file = new Blob([textArea.value], {type: 'text/plain'});
    // Create an element that contains the link to the file
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'matrix.txt';
    document.body.appendChild(a);
    // Trigger download
    a.click();
    // Remove the element
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  const matrix = getMatrixRepresentation(verticesLength, edges, representation, expr);
  
  let matrixText;

  switch (format) {
    case 'cBraces':
      matrixText = arrayToTextMatrix(matrix,'{{','}}',', ',`},${newLines ? '\n' : ''}{`);
      break;
    case 'sBrackets':
      matrixText = arrayToTextMatrix(matrix,'[[',']]',', ',`],${newLines ? '\n' : ''}[`);
      break;
    case 'matlab':
      matrixText = arrayToTextMatrix(matrix,'[',']',', ',`;${newLines ? '\n' : ' '}`);
      break;
    case 'latex':
      matrixText = arrayToTextMatrix(matrix, '\\begin{bmatrix}', '\\end{bmatrix}',
        '&', `\\\\${newLines ? '\n' : ' '}`);
      break;
    case 'space': 
    default:
      matrixText = arrayToTextMatrix(matrix,'','',' ',newLines ? '\n' : ' ');
      break;
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
        startIcon={<GetApp />}
      >
        Download matrix
      </Button>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Download matrix
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="space-around" style={{maxWidth: 600}}>
            <FormControl>
              <InputLabel htmlFor="matrix-representation-label">Representation</InputLabel>
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
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="matrix-format-label">Format</InputLabel>
              <Select
                value={format}
                onChange={e => setFormat(e.target.value)}
                labelId="matrix-format-label"
              >
                <MenuItem value={'space'}>Space separated</MenuItem>
                <MenuItem value={'cBraces'}>Curly braces {'{,}'}</MenuItem>
                <MenuItem value={'sBrackets'}>Square brackets {'[,]'}</MenuItem>
                <MenuItem value={'matlab'}>Matlab</MenuItem>
                <MenuItem value={'latex'}>LaTeX</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="expression-label">Expressions</InputLabel>
              <Select
                value={expr}
                onChange={e => setExpr(e.target.value)}
                labelId="expression-label"
              >
                <MenuItem value={'approx'}>Approximate</MenuItem>
                <MenuItem value={'latex'}>LaTeX</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormControlLabel
                value={newLines}
                control={<Checkbox checked={newLines} color="primary" onChange={e => setNewLines(e.target.checked)}/>}
                label="New lines"
                labelPlacement="start"
              />
            </FormControl>
          </Grid>
            <textarea
                readOnly={true}
                style={{width: '100%', height: '100%', whiteSpace: 'prewrap'}}
                value={matrixText}
                id={'matrixTextarea'}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={copyText} color="primary">
            Copy text to clipboard
          </Button>
          <Button autoFocus onClick={download} color="primary">
            Save matrix to .txt file
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}