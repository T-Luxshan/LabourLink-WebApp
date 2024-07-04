import React, { useRef, useEffect, useState } from "react";
import ReactPrint from "react-to-print";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { getFullBookingDetails } from "../Service/HiringService";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";


const ReceiptTemplate = () => {
  const ref = useRef();
  const { id } = useParams();
  const [completedBookings, setCompletedBookings] = useState({});

  async function fetchCompletedBookingHistory(id) {
    try {
      const response = await getFullBookingDetails(id);
      console.log(response.data);
      setCompletedBookings(response.data);
    } catch (error) {
      console.log("Error fetching history ", error);
    }
  }

  
  useEffect(() => {
    fetchCompletedBookingHistory(id);
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{ padding: 3, margin: "20px auto", maxWidth: 800 }}
        ref={ref}
      >
        <Grid container justifyContent="space-between" mb={3}>
          <Grid item xs={12} md={6} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Barcode
              value={`Booking Id: ${id}`}
              width={1}
              height={50}
              displayValue={false}
            />
          </Grid>
          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "right" }}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-end" }}
              alignItems="center"
            >
              <img
                src={"/Images/app-logo3.png"}
                alt="App Logo"
                style={{ width: "50px", height: "auto", marginRight: "10px" }}
              />
              <Typography
                variant="h4"
                component="div"
                sx={{ color: "#F97300", fontFamily: "Montserrat" }}
              >
                Labour LINK
              </Typography>
            </Box>
            <Typography color="#00204A">(+94) 1234567890</Typography>
            <Typography>LabourLink@gmail.com</Typography>
          </Grid>
        </Grid>
        <Typography variant="h2" align="center" color="primary">
          INVOICE
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Booking Id: {id}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "black",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Customer
            </Typography>
            <Typography>{completedBookings.customerName}</Typography>
            <Typography>{completedBookings.customerId}</Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "right" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "black",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Labour
            </Typography>
            <Typography>{completedBookings.labourName}</Typography>
            <Typography>{completedBookings.labourId}</Typography>
          </Grid>
        </Grid>
        <TableContainer sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Job
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Appointment Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Appointment Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Description
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{completedBookings.jobRole}</TableCell>
                <TableCell>{completedBookings.appointmentDate}</TableCell>
                <TableCell>{completedBookings.appointmentTime}</TableCell>
                <TableCell>{completedBookings.description}</TableCell>
                <TableCell align="right">
                  Rs {completedBookings.amount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Typography variant="h5">
                    <strong>Total:</strong>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">
                    <strong>{completedBookings.amount}</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ReactPrint
        trigger={() => (
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight:40}}>
            <Button variant="contained" color="primary">
              <PrintIcon /> Print
            </Button>
          </Box>
        )}
        content={() => ref.current}
        documentTitle={`INVOICE ${id}`}
      />
    </Box>
  );
};

export default ReceiptTemplate;
