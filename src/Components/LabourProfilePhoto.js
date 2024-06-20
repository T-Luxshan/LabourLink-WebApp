import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import { storage } from '../Config/firebase.config';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import Avatar from 'react-avatar-edit';

const LabourProfilePhoto = ({onProfileChange}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [profileUri, setProfileUri] = React.useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const [src, setSrc] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpload = () => {
    if (preview) {
      const blob = dataURLtoBlob(preview);
      const imgRef = ref(storage, `ProfilePhoto/profile-${Date.now()}.png`);
      uploadBytes(imgRef, blob)
        .then(() => {
          console.log('Profile uploaded successfully');
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          console.log('File available at:', url);
          setProfileUri(url);
          onProfileChange(url);
        })
        .catch((error) => {
          console.error('Error uploading profile:', error);
        });
    }
    handleClose();
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const onCloseAvatar = () => {
    setPreview(null);
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
          <Avatar 
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onCloseAvatar}
            // src={src}
          />
          <Box display="flex" justifyContent="center" gap={10}>
            <Button onClick={handleUpload}>
              Update
            </Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default LabourProfilePhoto;
