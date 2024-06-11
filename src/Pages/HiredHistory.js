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
import { Typography } from "@mui/material";

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
  const email = localStorage.getItem('userEmail');
  const navigate=useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if(email !== null){
      fetchBookingHistory(email);
    }else{
      navigate('/login');
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
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 10, mb: 55 }}>
      <TableContainer sx={{ maxHeight: 550 }}>
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
                      mt: 4,
                      mb: 1,
                      ml: 4,
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Typography
                            sx={{
                              ml: 4,
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
    </Paper>
  );
}
