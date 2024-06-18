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
import { updateLabour } from "../Service/LabourService";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  let email = localStorage.getItem('userEmail');

  const [updateMsg, setUpdateMsg] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  // Circular loading effect
  const [open, setOpen] = React.useState(false);

  // Snackbar for success/failed message
  const [updateState, setUpdateState] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form submitted!", data);
    setOpen(true);
    updateLabour(email, data.name, data.mobileNumber, data.nic)
      .then(res=>{
        setTimeout(() => {
          setOpen(false);
          setShowSnackbar(true);
          setUpdateMsg("Updated Successfully!");
          setUpdateState(true);
          navigate("/labour/profile");
        }, 2000);
      })
      .catch(err=>{
        console.log("update failed")
        setTimeout(() => {
          setOpen(false);
          setShowSnackbar(true);
          setUpdateMsg("Failed to update your details");
          setUpdateState(false);
        }, 2000);
      })
   

      
   
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
              <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar
              open={showSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={updateState ? "success" : "error"}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {updateMsg}
              </Alert>
            </Snackbar>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateLabourAccount;
