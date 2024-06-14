import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePassword } from "../Service/LabourService";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(5, "Password can't be less than 5 letters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password can't be empty"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [updateMsg, setUpdateMsg] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState(null);
  // let email = localStorage.getItem('userEmail'); // Use let instead of const if you intend to reassign email

  let email = localStorage.getItem("userEmail");

  const onSubmit = (data) => {
    setOpen(true);
    updatePassword(email, data.password)
      .then((res) => {
        console.log("Done");
        setTimeout(() => {
          setOpen(false);
          setShowSnackbar(true);
          setUpdateMsg("Password updated Successfully!");
          setUpdateState(true);
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          setOpen(false);
          setShowSnackbar(true);
          setUpdateMsg("Error updating password");
          setUpdateState(false);
        }, 2000);
      });
  };

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

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={open}
        >
          Change Password
        </Button>
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
    </Container>
  );
};

export default ChangePassword;
