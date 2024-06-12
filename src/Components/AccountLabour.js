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
import { getLabourById } from "../Service/LabourService";

const AccountLabour = () => {
  const [labour, setLabour] = useState({});
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [jobRole, setJobRole] = useState([]);

  let availableJobRoles = ["Painter", "Driver"];
  
  const navigate = useNavigate();

  useEffect(()=>{
    fetchLabourData(email);
    setJobRole(availableJobRoles);
  },[email])

  const fetchLabourData = (email) => {
    getLabourById(email)
      .then(res =>setLabour(res.data))
      .catch(err =>{
        console.error("Error fetching labour data:", err);
        // navigate("/login");
      })
  }
  

  const handleEditClick = () => {
    navigate("/update-account-labour", {
      state: {
        labour,
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
          Your Details
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

export default AccountLabour;
