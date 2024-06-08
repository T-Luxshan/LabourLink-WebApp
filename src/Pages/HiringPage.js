
import React, { useState } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

function HireLabourForm() {
  const [labourId, setLabourId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { labourEmail, customerId: urlCustomerId } = useParams();
     // Access URL parameters

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "labourId":
        setLabourId(value);
        break;
      case "customerId":
        setCustomerId(value);
        break;
      case "date":
        setDate(value);
        break;
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here, e.g., send data to backend
    console.log("Form submitted:", {
      labourId: labourEmail || labourId, // Use passed email or entered value
      customerId: urlCustomerId || customerId, // Use passed ID or entered value
      date,
      startTime,
      endTime,
    });
  };

  return (
    <Card sx={{ width: "500px", margin: "auto", marginTop: "150px", opacity: 1 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontFamily: "Montserrat", fontWeight: "bold", mt: 2, textAlign: "center" }}>
          Hire Labour
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                id="labourId"
                name="labourId"
                label="Labour Email"
                value={labourEmail || ""} // Use passed value or empty string
                onChange={handleChange}
                disabled={!!labourEmail} // Make pre-filled email non-editable (optional)
                
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="customerId"
                name="customerId"
                label="Customer Email"
                value={urlCustomerId || customerId} // Use passed ID or entered value
                onChange={handleChange}
                
              />
            </Grid>
            <Grid item>
              <TextField
              fullWidth
                id="date"
                name="date"
                label="Date (YYYY-MM-DD)"
                type="date"
                value={date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item>
              <TextField
              fullWidth
                id="startTime"
                name="startTime"
                label="Start Time"
                type="time"
                value={startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item fullWidth margin="normal">
              <TextField
              fullWidth
                id="endTime"
                name="endTime"
                label="End Time"
                type="time"
                value={endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
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
  );
}

export default HireLabourForm;
