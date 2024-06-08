import * as React from 'react';
import { useState ,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { storage } from '../Config/firebase.config';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { isNICExist } from '../Service/AuthServeice';

const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#EC9851', 
      },
      secondary: {
        main: '#EAE9E7', 
      },
    },
  });

const UploadDocument = ({ nic, onFileUpload}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [docURI, setDocURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nicExist, setNicExist] = useState(false);
  const [disableState, setDisableState] = useState(true);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {

        if (!/^[0-9]{12}$|^[0-9]{9}[v|V]$/.test(nic)) {
            setDisableState(true)
        } else {
            isNICExist(nic)
                .then(response => {
                    setNicExist(response.data);
                    setDisableState(response.data);
                   
                })
                .catch(error => {
                    console.error(error);
                });
        }
        
    
  }, [nic]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log('File selected:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  const handleUploadDoc = () => {
    setIsLoading(true);
    if (file) {
      const docRef = ref(storage, `LabourDocuments/document-${nic}-${Date.now()}`);
      uploadBytes(docRef, file)
        .then(() => {
          console.log('Document uploaded successfully');
          return getDownloadURL(docRef);
        })
        .then((url) => {
          console.log('File available at:', url);
          setDocURI(url);
          onFileUpload(url)
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error uploading document:', error);
        });
    } else {
      alert("No file selected to upload");
      setIsLoading(false);
    }
  };

  const deleteDocument = async () => {
        setIsLoading(true);
        const deleteRef = ref(storage, docURI);
        try {
          deleteObject(deleteRef).then(() => {
            setFile(null);
            setDocURI('');
            setInterval(() => {
              setIsLoading(false);
            }, 2000)
          })
        } catch (error) {
          setIsLoading(true);
          setFile(null);
          setInterval(() => {
            setIsLoading(false);
          }, 2000)
          console.log(error)
        }
        
      }
    

  return (
    <React.Fragment>
      {nicExist && <Typography sx={{color:'red', fontSize:14}}>This NIC already exist.</Typography>}
      <Button variant="outlined" onClick={handleClickOpen} disabled={disableState}>
        Please upload your certified document.
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Upload Certified Document"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To finish the sign-up process, you are required to submit a document regarding your job preferences.
            Please submit one of these documents:
            <br />• Your resume, or
            <br />• Verified documents from the company you worked/currently working for, or
            <br />• A certificate from the Grama Niladhari.
            <br />
            <br />Note: Submit as a PDF file.
            <br />
            
            <Box sx={{mt:2, ml:10}}>
                {isLoading ? (
                    <Box sx={{mt:2, ml:10}}>
                        <CircularProgress color='primary'/>
                    </Box>
                
                )
                :
                !docURI ? (
                <input
                    type='file'
                    onChange={handleFileChange}
                    />
                    ) : (
                        <Typography sx={{color: 'green'}}> Document uploaded successfully </Typography>
                    )
                }
            </Box>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {!docURI ? (
            <>
            <Button onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleUploadDoc} autoFocus>
                Upload File
            </Button>
            </>
        ) : (
            <>
            <Button onClick={deleteDocument}>
                Delete file
            </Button>
            <Button onClick={handleClose} autoFocus>
                Continue
            </Button>
            </>
        )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UploadDocument;
