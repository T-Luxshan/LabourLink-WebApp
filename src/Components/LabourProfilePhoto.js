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
import { storage } from '../Config/firebase.config';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';

const LabourProfilePhoto = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [profileUri, setProfileUri] = React.useState('');
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
        const imgRef = ref(storage, `ProfilePhoto/profile-${Date.now()}`); 
        uploadBytes(imgRef, file)
        .then(() => {
          console.log('Profile uploaded successfully');
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          console.log('File available at:', url);
          setProfileUri(url);
          console.log(url);
        //   onFileUpload(url)
        //   setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error uploading profile:', error);
        });
    }
    handleClose();
  };

//   const handleUploadDoc = () => {
//     setIsLoading(true);
//     if (file) {
//       const imgRef = ref(storage, `LabourDocuments/document-${nic}-${Date.now()}`);
//       uploadBytes(img, file)
//         .then(() => {
//           console.log('Profile uploaded successfully');
//           return getDownloadURL(docRef);
//         })
//         .then((url) => {
//           console.log('File available at:', url);
//           setDocURI(url);
//           onFileUpload(url)
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error uploading document:', error);
//         });
//     } else {
//       alert("No file selected to upload");
//       setIsLoading(false);
//     }
//   };

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
