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
  updateCustomer
} from "../Service/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAccount = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const { email } = useParams();//

  useEffect(() => {
    if (email) {
      getCustomersByEmail(email).then((response) => {
        const { name, mobileNumber, address } = response; // Assuming the response contains these properties
        setName(name);
        setMobileNumber(mobileNumber);
        setAddress(address);
      });
    }
  }, [email]);

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
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      <Card sx={{ width: "500px", margin: "auto", marginTop: "150px" }}>
        <CardContent>
          <Typography
            variant="h5" // Increase the size to h4
            sx={{
              fontFamily: "Montserrat", // Set font family to Montserrat
              fontWeight: "bold", // Optionally set font weight to bold
              mt: 2, // Optional margin top
              textAlign:'center',
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

export default UpdateAccount;
