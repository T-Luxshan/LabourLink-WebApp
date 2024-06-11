import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBarLabour from "./NavigationBarLabour";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Please enter a valid name")
    .required("Your name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  nic: yup
    .string()
    .matches(/^[0-9]{12}$|^[0-9]{9}[v|V]$/, 'Please enter a valid NIC number')
    .required('Your NIC number is required')
});

const UpdateLabourAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form submitted!", data);

    try {
      // Call your update API here with data
      console.log("Labour updated successfully");
      navigate("/labour/profile");
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div>
      <NavigationBarLabour/>
      <Card sx={{ width: "500px", margin: "auto", marginTop: "150px" }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              mt: 2,
              textAlign: "center",
            }}
          >
            Update Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={location.state?.labour.name || ''}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="name"
                      label="Name"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="mobileNumber"
                  control={control}
                  defaultValue={location.state?.labour.mobileNumber || ''}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="mobileNumber"
                      label="Mobile Number"
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="nic"
                  control={control}
                  defaultValue={location.state?.labour.nic || ''}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="nic"
                      label="NIC"
                      error={!!errors.nic}
                      helperText={errors.nic ? errors.nic.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item sx={{ textAlign: 'right', gap: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/labour/profile")}
                  sx={{ mr: 2 }}
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
