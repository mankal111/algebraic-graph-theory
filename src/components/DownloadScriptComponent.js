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

export default function CustomizedDialogs({verticesLength, edges, representation, platform}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  let scriptText, matrix, matrixText, downloadButtonText, fileName;
  switch(platform){
    case 'Matlab':
      fileName = 'matrix.m';
      downloadButtonText = 'Save script to .m file';
      matrix = getMatrixRepresentation(verticesLength, edges, representation, 'matlab');
      matrixText = arrayToTextMatrix(matrix,'[',']',', ','; ');
      scriptText = `syms t
M = sym(${matrixText});
CharacteristicPolynomial = charpoly(M,t)
Eigenvalues = solve(CharacteristicPolynomial)`;
      break;
    case 'Mathematica':
      fileName = 'matrix.wls';
      downloadButtonText = 'Save script to .wls file';
      matrix = getMatrixRepresentation(verticesLength, edges, representation, 'mathematica');
      matrixText = arrayToTextMatrix(matrix,'{','}',', ','}, {');
      scriptText = `m = ${matrixText};
characteristicPolynomial = CharacteristicPolynomial[m, t]
eigenvalues = Solve[characteristicPolynomial==0, t]`;
      break;
    case 'Python':
      fileName = 'matrix.py';
      downloadButtonText = 'Save script to .py file';
      matrix = getMatrixRepresentation(verticesLength, edges, representation, 'python');
      matrixText = arrayToTextMatrix(matrix,'[[',']]',', ','], [');
      scriptText = `import math
from sympy import Matrix
      
M = Matrix(${matrixText})
print("Characteristic Polynomial:")
print(M.charpoly().as_expr())
print("Eigenvalues:")
print(M.eigenvals())`;
      break;
    default:
      scriptText = '';
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
    a.download = fileName;
    document.body.appendChild(a);
    // Trigger download
    a.click();
    // Remove the element
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
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
        {platform}
      </Button>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
  Download a {platform} script that computes the characteristic polynomial and the spectrum
        </DialogTitle>
        <DialogContent dividers>
            <textarea
                readOnly={true}
                style={{width: '100%', height: '100%', whiteSpace: 'prewrap'}}
                value={scriptText}
                id={'matrixTextarea'}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={copyText} color="primary">
            Copy script to clipboard
          </Button>
          <Button autoFocus onClick={download} color="primary">
            {downloadButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}