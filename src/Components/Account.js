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
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteCustomer } from "../Service/CustomerService";
import { displayProfilePhoto } from "../Service/ProfilePhoto";

const Account = () => {
  const [customer, setCustomer] = useState({});
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [profilePhoto, setProfilePhoto] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    deleteCustomer(email);
    setOpen(false);
    navigate("/login");
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("userEmail");
  };

  useEffect(() => {
    fetchCustomerData(email);
    fetchProfile(email);
  }, [email]);

  async function fetchCustomerData(email) {
    try {
      console.log("Fetching customer data for email:", email);
      const response = await getCustomersByEmail(email);
      const imageData = response.data;
      console.log("Customer data fetched:", response.data);
      setCustomer(response.data);
    } catch (error) {
      navigate("/login");
      console.error("Error fetching customer data:", error);
    }
  }

  async function fetchProfile(email) {
    try {
      console.log("Fetching customer Profile picture for email:", email);
      const response = await displayProfilePhoto(email);
      const imageData = response.data;
      console.log(imageData);
      setProfilePhoto(imageData);
      // setProfilePhoto(`data:${imageData.mimeType};base64,${imageData}`);
    } catch (error) {
      console.error("Error fetching customer Profile picture:", error);
    }
  }

  const handleEditClick = () => {
    navigate("/update-account", {
      state: {
        customer,
      },
    });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
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
          Labour Details
        </Typography>
      </Box>
      <Paper
        elevation={3}
        style={{ padding: "30px", borderRadius: "5px" }}
        backgroundColor="#EEEEEE"
      >
        <Box textAlign="center" mb={3}>
          {/* {profilePhoto ? (
            <img
              alt="Profile Photo"
              src={profilePhoto} // Use profilePhoto state here
              style={{
                margin: "0 auto",
                backgroundColor: "#ff9800",
                width: 80,
                height: 80,
              }}
            />
          ) : (
            // Display a placeholder image or error message if necessary
            <Avatar
              style={{
                margin: "0 auto",
                backgroundColor: "#ff9800",
                width: 80,
                height: 80,
              }}
            >
              <AccountCircleIcon style={{ fontSize: 60 }} />
            </Avatar>
          )} */}
          <Avatar
              style={{
                margin: "0 auto",
                backgroundColor: "#ff9800",
                width: 80,
                height: 80,
              }}
            >
              <AccountCircleIcon style={{ fontSize: 60 }} />
            </Avatar>
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
            <Typography variant="body1">{customer.name}</Typography>
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
            <Typography variant="body1">{customer.email}</Typography>
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
            <Typography variant="body1">{customer.mobileNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              fontWeight="bold"
              marginLeft={5}
            >
              Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{customer.address}</Typography>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
            style={{
              backgroundColor: "#F97300",
              color: "#00204A",
              marginLeft: 20,
            }}
          >
            Delete Account
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "#00204A" }}>
            Do you want to delete your account?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you are deleting your account you may not be abled to continue
              and all your data will be deleted permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={handleClose}
              autoFocus
              style={{ color: "#FF0000" }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Account;
