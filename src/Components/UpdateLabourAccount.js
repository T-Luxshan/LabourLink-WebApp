import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
// import {
//   getCustomersByEmail,
//   updateCustomer,
// } from "../Service/CustomerService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar"

const UpdateLabourAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { email } = useParams();//

  const [name, setName] = useState(location.state?.labour.name);
  const [mobileNumber, setMobileNumber] = useState(
    location.state?.labour.mobileNumber
  );
  const [nic, setNic] = useState(location.state?.labour.nic);
  const [email, setEmail] = useState(location.state?.labour.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const labour = { name, mobileNumber, nic };
    console.log("Form submitted!");
    console.log(labour);

    try {
      // if (email) {
      //   await updateCustomer(email, customer);
        console.log("Labour updated successfully");
      // }
      navigate("/labour/profile");
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      <NavigationBar/>
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
            Update account
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
              {/* <Grid item>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid> */}
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
                  id="nic"
                  label="Nic"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </Grid>
              <Grid item sx={{ textAlign: 'right', gap: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/labour/profile")}
                  sx={{ mr: 2 }} // Add margin-right for spacing between buttons
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateLabourAccount;
