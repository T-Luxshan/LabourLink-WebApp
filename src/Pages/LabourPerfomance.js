import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/system';
import { LineChart } from '@mui/x-charts/LineChart';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography'; // Import Typography for axis labels
import BookingData from './BookingDetails.json';
import ReviewData from './ReviewDetails.json';

// Custom LineChart component with yAxisLabel
const CustomLineChart = ({ series, xAxis, yAxisLabel, width, height }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Add yAxisLabel */}
      <Typography
        sx={{
          position: 'absolute',
          transform: 'rotate(-90deg)',
          left: -15, 
          top: height / 2,
          textAlign: 'center',
        }}
      >
        {yAxisLabel}
      </Typography>
      {/* Render LineChart */}
      <LineChart series={series} xAxis={xAxis} width={width} height={height} />
    </Box>
  );
};

const LabourPerformance = () => {
  React.useEffect(() => {
    fetchBookingDetails(BookingData);
    fetchRatingDetails(ReviewData);
  }, []);

  const [open, setOpen] = React.useState(true);
  const [selectedRole, setSelectedRole] = React.useState('all');
  const [bookingDetails, setBookingDetails] = React.useState([]);
  const [ratingDetails, setRatingDetails] = React.useState([]);
  const allBookingStagePieData = [];

  const fetchBookingDetails = (BookingData) => {
    setBookingDetails(BookingData);
  };

  const fetchRatingDetails = (ReviewData) => {
    setRatingDetails(ReviewData);
  };

  const jobRoles = [...new Set(bookingDetails.map((item) => item.jobRole))];

  // Initialize an object to store counts for each job role
  const jobRoleCounts = {};

  // Loop through each job role
  jobRoles.forEach((role) => {
    // Initialize counts for each booking stage
    const counts = {
      PENDING: 0,
      ACCEPTED: 0,
      DECLINED: 0,
      COMPLETED: 0,
    };

    // Count occurrences of each booking stage for the current job role
    bookingDetails.forEach((item) => {
      if (item.jobRole === role) {
        counts[item.bookingStage]++;
      }
    });

    // Store counts for the current job role
    jobRoleCounts[role] = counts;

    allBookingStagePieData[role] = [
      { id: 0, value: counts.PENDING, label: 'Pending' },
      { id: 1, value: counts.ACCEPTED, label: 'Accepted' },
      { id: 2, value: counts.COMPLETED, label: 'Completed' },
      { id: 3, value: counts.DECLINED, label: 'Declined' },
    ];
  });

  const totalBookingStagePieData = {
    Pending: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][0].value,
      0
    ),
    Accepted: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][1].value,
      0
    ),
    Completed: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][2].value,
      0
    ),
    Declined: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][3].value,
      0
    ),
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAllSelection = () => {
    setSelectedRole('all');
  };

  const getChartData = () => {
    if (selectedRole === 'all') {
      // Display total data for all roles
      return Object.keys(totalBookingStagePieData).map((label, index) => ({
        id: index,
        value: totalBookingStagePieData[label],
        label: label,
      }));
    } else {
      // Display data for selected role
      return allBookingStagePieData[selectedRole];
    }
  };

  const getLineChartData = () => {
    if (selectedRole === 'all') {
      const allRatings = jobRoles.map((role) => {
        return {
          name: role,
          ratings: ratingDetails
            .filter((item) => item.jobRole === role)
            .map((item) => item.rating),
        };
      });
      return allRatings;
    } else {
      const selectedRatings = ratingDetails
        .filter((item) => item.jobRole === selectedRole)
        .map((item) => item.rating);
      return [{ name: selectedRole, ratings: selectedRatings }];
    }
  };

  const lineChartData = getLineChartData();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>View labour performance</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Labour performance report</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ mb: 2, minWidth: 200 }}>
                <InputLabel id="job-role-label">Job Role</InputLabel>
                <Select
                  labelId="job-role-label"
                  id="job-role"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label="Job Role"
                >
                  <MenuItem value="all">All</MenuItem>
                  {jobRoles.map((jobRole, index) => (
                    <MenuItem key={index} value={jobRole}>
                      {jobRole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '110%',
                  ml: 5,
                }}
              >
                <PieChart
                  series={[
                    {
                      data: getChartData(),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 10, additionalRadius: -30, color: 'gray' },
                      innerRadius: 20,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 130,
                      cy: 150,
                    },
                  ]}
                  height={300}
                />
                <Box sx={{ ml:2, }}>
                  {/* Use CustomLineChart with yAxisLabel */}
                  <CustomLineChart
                    xAxis={[
                      {
                        data: Array.from(
                          { length: lineChartData[0]?.ratings.length || 0 },
                          (_, i) => i + 1
                        ),
                      },
                    ]}
                    series={lineChartData.map((roleData) => ({
                      data: roleData.ratings,
                      label: roleData.name,
                    }))}
                    yAxisLabel="Rating" 
                    width={500}
                    height={300}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LabourPerformance;
