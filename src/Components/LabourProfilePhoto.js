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
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import Avatar from 'react-avatar-edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import { addProfilePicture, deleteProfilePicture } from '../Service/ProfilePhotoService';


const LabourProfilePhoto = ({onProfileChange, profile}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  let email = localStorage.getItem('userEmail'); 

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
    setIsLoading(true);
    if(profile){
      handleDelete()
    }
    if (preview) {
      const blob = dataURLtoBlob(preview);
      const imgRef = ref(storage, `ProfilePhoto/profile-${email}-${Date.now()}.png`);
      uploadBytes(imgRef, blob)
        .then(() => {
          console.log('Profile uploaded successfully');
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          console.log('File available at:', url);
          onProfileChange(url);
          saveToDB(url);
          setIsLoading(false);
          handleClose();
        })
        .catch((error) => {
          console.error('Error uploading profile:', error);
        });
    }
    else{
      setIsLoading(false);
      handleClose();
    }
    
  };

  const handleDelete = async () => {
    setIsLoading(true);
        const deleteRef = ref(storage, profile);
        try {
          deleteObject(deleteRef).then(() => {
            deleteFromDB()
            onProfileChange(null);
            setInterval(() => {
              setIsLoading(false);
            }, 2000)
          })
        } catch (error) {
          setIsLoading(true);
          setInterval(() => {
            setIsLoading(false);
          }, 2000)
        }
        setOpen(false);
  }

  // Save to Database
  const saveToDB = (profileUri) => {
    addProfilePicture(profileUri)
      .then(res=>console.log("Profile saved to DB"))
      .catch(err=>console.log("Faild to save to db"))
  }

  //Delete from Database.
  const deleteFromDB = (profileUri) => {
    deleteProfilePicture(profileUri)
      .then(res=>console.log("Profile deleted from DB"))
      .catch(err=>console.log("Faild to delete from db"))
  }

  const onCrop = (view) => {
    setPreview(view);
  };

  const onCloseAvatar = () => {
    setPreview(null);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon fontSize='small'/>
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box display="flex" justifyContent="center" gap={5}>
          <DialogTitle id="responsive-dialog-title">
            Update profile photo
          </DialogTitle>
          <IconButton aria-label="edit" onClick={handleClose}>
            <CancelIcon color="error"/>
          </IconButton>
        </Box>
          
        
        <DialogContent>
        {isLoading ?
          <Box sx={{ display: 'flex',justifyContent:"center",  m:"100px"}}>
            <CircularProgress color='primary'/>
          </Box>
        :
          <Avatar 
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onCloseAvatar}
          />
        }  
        
          
          <Box display="flex" justifyContent="center" gap={10}>
            <Button onClick={handleUpload}>
              Update
            </Button>
            {profile &&
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
            }
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default LabourProfilePhoto;
