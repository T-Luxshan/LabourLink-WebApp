import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";

const LabourProfilePhoto = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload here
      console.log("File selected:", file);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Update profile photo
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" gap={10}>
            <Button autoFocus onClick={handleUpdateClick}>
              Update
            </Button>
            <Button onClick={handleClose} autoFocus>
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <input
        id="file-input"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </React.Fragment>
  );
}

export default LabourProfilePhoto;
