import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, getScopedCssBaselineUtilityClass } from "@mui/material";
import { updateCustomerPassword } from "../Service/CustomerService";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  let email = localStorage.getItem('userEmail'); // Use let instead of const if you intend to reassign email

  useEffect(() => {
    // Fetch the initial password from the server
    updateCustomerPassword(email).then((response) => {
      setPassword(response.data.password);
    }).catch((error) => {
      setError("Error fetching password: " + error.message);
    });
  }, [email]);// Use email as the dependency instead of undefined id

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);

    try {
      const response = await updateCustomerPassword(email,password);
      console.log(response);
      console.log("Password changed successfully");
      // Optionally, you can reset the form or show a success message to the user
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle errors such as displaying an error message to the user
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!password || password !== confirmPassword}
        >
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default ChangePassword;
