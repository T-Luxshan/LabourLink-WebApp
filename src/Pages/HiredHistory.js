import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getBookingHistoryByCustomerId, getCompletedBookings } from "../Service/HiringService";
import { Grid, Typography, Box, Button } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Review from "../Components/Review";
import Report from "../Components/Report";


const columns = [
  { id: "labourName", label: "Labour Name", minWidth: 170 },
  { id: "jobRole", label: "Labour Role", minWidth: 20 },
  { id: "date", label: "Date", minWidth: 90 },
  { id: "startTime", label: "Start Time", minWidth: 40 },
  { id: "bookingStage", label: "Booking Stage", minWidth: 10 },
  { id: "reportUser", label: "Report user", minWidth: 10 },
  { id: "jobDescription", label: "Job Description", minWidth: 170 },
];

const completedColumns = [
  { id: "labourName", label: "Labour Name", minWidth: 10 },
  { id: "jobRole", label: "Labour Role", minWidth: 20 },
  { id: "appointmentDate", label: "Appointment Date", minWidth: 20 },
  { id: "addReview", label: "Add Review", minWidth: 10 },
  { id: "printReceipt", label: "Print Receipt", minWidth: 10 },
];

export default function HiredHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [jobRoleCounts, setJobRoleCounts] = useState({});
  const [bookingStageCounts, setBookingStageCounts] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (email !== null) {
      fetchBookingHistory(email);
      fetchCompletedBookingHistory(email);
    } else {
      navigate("/login");
    }
  }, [email]);

  async function fetchCompletedBookingHistory(email) {
    try {
      const response = await getCompletedBookings(email);
      console.log(response.data);
      const sortedHistory = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCompletedBookings(sortedHistory);
    } catch (error) {
      console.log("Error fetching history ", error);
    }
  }

  async function fetchBookingHistory(email) {
    try {
      const response = await getBookingHistoryByCustomerId(email);
      console.log(response.data);
      const sortedHistory = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBookingHistory(sortedHistory);
      setData(response.data);
      processCounts(response.data);
    } catch (error) {
      console.log("Error fetching history ", error);
    }
  }

  const processCounts = (data) => {
    const jobRoleCounts = data.reduce((acc, item) => {
      acc[item.jobRole] = (acc[item.jobRole] || 0) + 1;
      return acc;
    }, {});

    const bookingStageCounts = data.reduce((acc, item) => {
      acc[item.bookingStage] = (acc[item.bookingStage] || 0) + 1;
      return acc;
    }, {});

    setJobRoleCounts(jobRoleCounts);
    setBookingStageCounts(bookingStageCounts);
  };

  const getPieChartData = (counts) => {
    return Object.entries(counts).map(([label, value], id) => ({
      id,
      value,
      label,
    }));
  };

  const handleAddReview = (bookingId) => {
    // Handle add review logic
    console.log("Add Review for bookingId: ", bookingId);
    // alert(bookingId);
  };

  const handlePrintReceipt = (bookingId) => {
    // Handle print receipt logic
    console.log("Print Receipt for bookingId: ", bookingId);
    navigate(`/receipt/${bookingId}`);

  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 10, mb: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
          <Box
          sx={{
            mb: 10,
            backgroundColor: "#F7F9F2",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            alignItems="center"
            sx={{
              fontWeight: "bold",
              color: "black",
              mb: "5px",
              mt: "5px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Completed Bookings
          </Typography>
          <TableContainer sx={{ maxHeight: 500,minHeight: '530px'  }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {completedColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 0,
                          mb: 0,
                          ml: 0,
                          fontFamily: "Montserrat",
                          color: "#1a237e",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {completedBookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {completedColumns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "addReview") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {/* <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAddReview(row.labourId)}
                                >
                                  Add Review
                                </Button> */}
                                <Review bookingId={row.id} />

                              </TableCell>
                            );
                          } else if (column.id === "printReceipt") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handlePrintReceipt(row.id)}
                                >
                                  Print Receipt
                                </Button>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Typography
                                  sx={{
                                    ml: 0,
                                  }}
                                >
                                  {value}
                                </Typography>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={completedBookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                mb: 2,
                backgroundColor: "#F7F9F2",
                p: 2,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h4"
                alignItems="center"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  mb: "5px",
                  mt: "5px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Booking Analysis
              </Typography>
              <PieChart
                series={[
                  {
                    data: getPieChartData(jobRoleCounts),
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 10,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 130,
                    cy: 150,
                  },
                ]}
                width={400}
                height={300}
              />
            </Box>
            <Box
              sx={{
                mb: 2,
                backgroundColor: "#F7F9F2",
                p: 2,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h6"
                align=""
                sx={{
                  fontWeight: "bold",
                  color: "#1a237e",
                  mb: "5px",
                  mt: "5px",
                  ml: 5,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Booking Stage Counts
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyleType: "none",
                  p: 0,
                  ml: 5,
                  mr: 35,
                  mb: 10,
                }}
              >
                {Object.entries(bookingStageCounts).map(([stage, count]) => (
                  <Box
                    component="li"
                    key={stage}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      color: "black",
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {stage}:
                    </Box>
                    <Box>{count}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4, mb: 0 }}>

        <Box
              sx={{
                mb: 2,
                backgroundColor: "#F7F9F2",
                p: 2,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h4"
                alignItems="center"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  mb: "5px",
                  mt: "5px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Booking History
              </Typography>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mt: 0,
                              mb: 0,
                              ml: 0,
                              fontFamily: "Montserrat",
                              color: "#1a237e",
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookingHistory
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              if (column.id === "reportUser") {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                <Report reportTo={row.labourId}/>

                                  </TableCell>
                                );
                              } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Typography
                                    sx={{
                                      ml: 0,
                                    }}
                                  >
                                    {value}
                                  </Typography>
                                </TableCell>
                              );
                                  }
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={bookingHistory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
      </Paper>
    </>
  );
}
