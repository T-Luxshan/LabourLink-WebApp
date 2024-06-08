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

const Account = () => {
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const email = "johndoe@example.com";
    const fetchCustomerData = async () => {
      try {
        const response = await getCustomersByEmail(email);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        throw error;
      }
    };

    fetchCustomerData();
  }, []);

  // Function to handle the edit button click
  const handleEditClick = () => {
    navigate("/update-account", {
      state: {
        customer,
      },
    }); // Navigate to the UpdateAccount component
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
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "5px" }} backgroundColor='#EEEEEE' >
        <Box textAlign="center" mb={3}>
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
            <Typography variant="body1" color="textSecondary" fontWeight="bold" marginLeft={5}>
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{customer.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary" fontWeight="bold" marginLeft={5}>
              Email
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{customer.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary" fontWeight="bold" marginLeft={5}>
              Mobile Number
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{customer.mobileNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary" fontWeight="bold" marginLeft={5}>
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
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
