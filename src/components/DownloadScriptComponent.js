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

export default function CustomizedDialogs({verticesLength, edges, representation, setRepresentation}) {
  const [open, setOpen] = React.useState(false);
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
    a.download = 'matrix.m';
    document.body.appendChild(a);
    // Trigger download
    a.click();
    // Remove the element
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  const matrix = getMatrixRepresentation(verticesLength, edges, representation, 'matlab');
  
  const matrixText = arrayToTextMatrix(matrix,'[',']',', ','; ');
  const scriptText = `syms t
M = sym(${matrixText});
CharacteristicPolynomial = charpoly(M,t)
EigenValues = solve(CharacteristicPolynomial)`;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
        startIcon={<GetApp />}
      >
        Download matlab script
      </Button>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Download matrix
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
            Save script to .m file
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}