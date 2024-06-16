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
import BookingData from './BookingDetails.json';

const LabourPerformance = () => {
    const [open, setOpen] = React.useState(true);
    const [selectedRole, setSelectedRole] = React.useState('all');
    const [bookingDetails, setBookingDetails] = React.useState([]);

    const allBookingStagePieData = [];


    // Calculate totals for all roles



React.useEffect(()=> {
   fetchBookingDetails();
})

const fetchBookingDetails = () => {
  setBookingDetails(BookingData);
  // setPieChart();
}

// const setPieChart = () => {
  const jobRoles = [...new Set(bookingDetails.map(item => item.jobRole))];

  // Initialize an object to store counts for each job role
  const jobRoleCounts = {};

  // Loop through each job role
  jobRoles.forEach(role => {
      // Initialize counts for each booking stage
      const counts = {
          PENDING: 0,
          ACCEPTED: 0,
          DECLINED: 0,
          COMPLETED: 0
      };

      // Count occurrences of each booking stage for the current job role
      bookingDetails.forEach(item => {
          if (item.jobRole === role) {
              counts[item.bookingStage]++;
          }
      });

      // Store counts for the current job role
      jobRoleCounts[role] = counts;

      allBookingStagePieData[role] =  [
        { id: 0, value: counts.PENDING, label: 'Pending' },
        { id: 1, value: counts.ACCEPTED, label: 'Accepted' },
        { id: 2, value: counts.COMPLETED, label: 'Completed' },
        { id: 3, value: counts.DECLINED, label: 'Declined' }
    ];
  });


  

const totalBookingStagePieData = {
  Pending: Object.keys(allBookingStagePieData).reduce((total, role) => total + allBookingStagePieData[role][0].value, 0),
  Accepted: Object.keys(allBookingStagePieData).reduce((total, role) => total + allBookingStagePieData[role][1].value, 0),
  Completed: Object.keys(allBookingStagePieData).reduce((total, role) => total + allBookingStagePieData[role][2].value, 0),
  Declined: Object.keys(allBookingStagePieData).reduce((total, role) => total + allBookingStagePieData[role][3].value, 0),
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
                                    {jobRoles.map((jobRole, index) =>(
                                      <MenuItem value={jobRole}>{jobRole}</MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '110%', ml: 5 }}>
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
                                <Box sx={{ mr: 1 }}>
                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }]}
                                        series={[
                                            { data: [2, 5, 2, 3.5, 1.5, 5, 4, 3.5, 4.5, 4, 2, 3, 4, 5, 4.5, 4, 2, 3, 4, 5] },
                                        ]}
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
