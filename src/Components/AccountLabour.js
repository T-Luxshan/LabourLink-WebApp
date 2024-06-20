import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getCustomersByEmail } from "../Service/CustomerService";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getUserByToken } from "../Service/UserService";
import { deleteLabour, getLabourById } from "../Service/LabourService";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getProfilePicture } from "../Service/ProfilePhotoService";
import { LogoutUser } from "../Service/AuthService";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FE9E0D',
    },
    secondary: {
      main: '#00204A',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});


const AccountLabour = () => {
  const [labour, setLabour] = useState({});
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [jobRole, setJobRole] = useState([]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Snackbar for success/failed message
  const [updateMsg, setUpdateMsg] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [imgUri, setImgUri] = useState(true);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(()=>{
    fetchLabourData(email);
  },[email])

  const fetchLabourData = (email) => {
    getLabourById(email)
      .then(res =>{ 
        setLabour(res.data);
        setJobRole(res.data.jobRole);
      })
      .catch(err =>{
        console.error("Error fetching labour data:", err);
        LogoutUser();
        navigate("/login");
      })

      getProfilePicture(email)
        .then(respose=>{
          setImgUri(respose.data.profileUri);
        })
        .catch(err=>console.log("failed to fetch profile photo"));
  }
  

  const handleEditClick = () => {
    navigate("/update-account-labour", {
      state: {
        labour,
      },
    });
  };
  const handleDelete = () => {
    setOpen(true);
  };

  const handleAccountDelete = () => {
   
    deleteLabour(email)
      .then(res=>{
        console.log("Account deleted");
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userEmail');
        navigate("/");
      })
      .catch(err=>{
        console.log("Account deletion failed", err)
        setUpdateMsg("Account deletion failed");
        setShowSnackbar(true);
      })
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "5px" }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          style={{
            fontFamily: "Montserrat",
            color: "#1a237e",
            fontWeight: "bold",
          }}
        >
          Your Details
        </Typography>
      </Box>
      <Paper
        elevation={3}
        style={{ padding: "30px", borderRadius: "5px" }}
        backgroundColor="#EEEEEE"
      >
        <Box textAlign="center" mb={3}>
            <Avatar alt="Labour" src={imgUri} style={{
              margin: "0 auto",
              width: 150,  
              height: 150,
              }} /> 
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{labour.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              Email
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{labour.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              Mobile Number
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{labour.mobileNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              NIC
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{labour.nic}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              Job Role
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{jobRole.join(' , ')}</Typography>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="center" gap={15}>
        <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleDelete}
          >
            Delete account
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
            onClick={handleEditClick}
          >
            Edit account
          </Button>
        </Box>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {updateMsg}
          </Alert>
        </Snackbar>

 
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          This action is irreversible and will permanently delete all your data, including your profile 
          information, booking details, and ratings. If you delete your account, you will lose access to 
          all the services associated with it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} >
            cancel
          </Button>
          <Button onClick={handleAccountDelete} autoFocus color="error">
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  

      </Paper>
    </Container>
  );
};

export default AccountLabour;
