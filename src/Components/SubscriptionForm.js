import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SubscriptionForm = ({ onSubmit, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail); // Use initialEmail for pre-filling

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email); // Pass the captured email to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
        value={email}
        onChange={handleChange}
      />
    </form>
  );
};

export default SubscriptionForm;
