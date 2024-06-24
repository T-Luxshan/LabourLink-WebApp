import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateBookingAmount } from "../Service/HiringService";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FE9E0D',
    },
    secondary: {
      main: '#00204A',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export default function JobAmount({onAmountChange, bookingId}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [bId, setBId] = useState(null);

  const handleClickOpen = (id, initialAmount) => {
    setBId(id);
    // alert(bookingId);
    setAmount(initialAmount);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateBookingAmount(bookingId, amount);
      console.log("Booking amount updated successfully!");
      onAmountChange(bId);
    } catch (error) {
      console.error("Error updating booking amount:", error);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="secondary" onClick={() => handleClickOpen(bookingId ,1500)}>
        Completed
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Booking Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the payment amount you are paid for.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Booking Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}