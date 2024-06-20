import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateBookingAmount } from "../Service/HiringService";

export default function JobAmount() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [bookingId, setBookingId] = useState(null);

  const handleClickOpen = (id, initialAmount) => {
    setBookingId(id);
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
    } catch (error) {
      console.error("Error updating booking amount:", error);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => handleClickOpen(20, 1500)}>
        Open form dialog
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
            To update the booking amount, please enter the new amount here.
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