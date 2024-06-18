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
import { getBookingHistoryByCustomerId } from "../Service/HiringService";
import { Grid, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const columns = [
  { id: "labourName", label: "Labour Name", minWidth: 170 },
  { id: "jobRole", label: "Labour Role", minWidth: 70 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "startTime", label: "Start Time", minWidth: 100 },
  { id: "bookingStage", label: "Booking Stage", minWidth: 170 },
  { id: "jobDescription", label: "Job Description", minWidth: 170 },
];

export default function HiredHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bookingHistory, setBookingHistory] = useState([]);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

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
    } else {
      navigate("/login");
    }
  }, [email]);

  async function fetchBookingHistory(email) {
    try {
      const response = await getBookingHistoryByCustomerId(email);
      console.log(response.data);
      const sortedHistory = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBookingHistory(sortedHistory);
    } catch (error) {
      console.log("Error fetching history ", error);
    }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 10, mb: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={400}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
