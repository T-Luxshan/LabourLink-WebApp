import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  getCustomersByEmail,
  updateCustomer,
} from "../Service/CustomerService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import addNotification from "react-push-notification";
import logo from "../Images/app-logo3.png";
import { saveNotifications } from "../Service/NotificationService";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { email } = useParams();//

  const [name, setName] = useState(location.state?.customer.name);
  const [mobileNumber, setMobileNumber] = useState(
    location.state?.customer.mobileNumber
  );
  const [address, setAddress] = useState(location.state?.customer.address);
  const [email, setEmail] = useState(location.state?.customer.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, mobileNumber, address };
    console.log("Form submitted!");
    console.log(customer);

    try {
      if (email) {
        await updateCustomer(email, customer);
        console.log("Customer updated successfully");
      }
      navigate("/profile");
      accountUpdated();
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const accountUpdated = async () => {
    const notification = {
      title: "Account Updated Successfully",
      message: "You have successfully updated account details ",
      recipient: email, // Adjust as necessary
      createdAt: new Date().toISOString(), // Add current time
    };

    try {
      await saveNotifications(notification);
      addNotification({
        title: notification.title,
        message: notification.message,
        duration: 4000,
        icon: logo,
        native: true,
        onClick: () => navigate("/notification"),
      });
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Card sx={{ width: "500px", margin: "auto", marginTop: "150px" }}>
        <CardContent>
          <Typography
            variant="h5" // Increase the size to h4
            sx={{
              fontFamily: "Montserrat", // Set font family to Montserrat
              fontWeight: "bold", // Optionally set font weight to bold
              mt: 2, // Optional margin top
              textAlign: "center",
            }}
          >
            Update Customer
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="mobileNumber"
                  label="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="address"
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item sx={{ textAlign: "left" }}>
                
                <Button type="submit" variant="contained" color="primary" sx={{mr:3}}>
                  Submit
                </Button>
                <Button variant="outlined" onClick={()=>{navigate("/profile")}}>Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAccount;
