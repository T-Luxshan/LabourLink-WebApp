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

const Account = () => {
  const [customer, setCustomer] = useState({});
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCustomerData(email);
  },[email])

  async function fetchCustomerData(email) {
    try {
      console.log("Fetching customer data for email:", email);
      const response = await getCustomersByEmail(email);
      console.log("Customer data fetched:", response.data);
      setCustomer(response.data);
    } catch (error) {
      navigate("/login");
      console.error("Error fetching customer data:", error);
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
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
