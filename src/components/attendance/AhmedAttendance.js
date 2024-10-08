import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Alert from '@mui/material/Alert';

const AttendanceAhmed = () => {
  // Local state
  const [pastAttendance, setPastAttendance] = useState([
    { date: '03/03/2022', status: 'Present' },
    { date: '02/03/2022', status: 'Present' },
    { date: '01/03/2022', status: 'Present' },
    { date: '29/02/2022', status: 'Leave' },
    { date: '28/02/2022', status: 'Absent' },
  ]);
  
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [upcomingEntries, setUpcomingEntries] = useState([]);
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [leaveReason, setLeaveReason] = useState('');
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [hasAppliedForLeave, setHasAppliedForLeave] = useState(false);
  const [showNotification, setShowNotification] = useState(notificationVisible);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleApplyForLeave = () => {
    // Check if leave has already been applied for today
    const today = new Date().toLocaleDateString();
    const leaveAppliedToday = upcomingEntries.some(
      (entry) => entry.date === today && entry.status === 'Leave'
    );

    if (leaveAppliedToday) {
      alert('You have already applied for leave today.');
      return;
    }

    setIsDatePickerOpen(true);
    setShowLeaveDetails(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLeaveSubmission = () => {
    if (selectedDate && leaveReason) {
      const leaveEntry = {
        date: selectedDate.toLocaleDateString(),
        status: 'Leave',
        reason: leaveReason,
      };

      // Add to upcoming entries
      setUpcomingEntries((prev) => [...prev, leaveEntry]);

      // Add to past attendance
      setPastAttendance((prev) => [...prev, leaveEntry]);

      setIsDatePickerOpen(false);
      setShowLeaveDetails(false);
      setSelectedDate(null);
      setLeaveReason('');

      // Mark leave as applied for today
      setHasAppliedForLeave(true);
    } else {
      alert('Please select a date and provide a reason for leave.');
    }
  };

  const handleSearch = () => {
    // Implement search functionality here
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const filteredAttendance = pastAttendance.filter((entry) => {
    return (
      (!searchTerm || entry.date.includes(searchTerm)) &&
      (!filterStatus || entry.status === filterStatus)
    );
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3, width: '100%' }}>
        {showNotification && (
          <Paper sx={{ marginTop: 2, padding: 2, backgroundColor: '#e3f2fd' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Alert severity="info">
                <Typography color="rgba(1, 67, 97, 1)" fontFamily={'Roboto'}>
                  <strong>Welcome back, Ahmed!</strong>
                  <br /> Are you ready to punch in your attendance?
                </Typography>
              </Alert>
              <Button variant="contained" sx={{ backgroundColor: '#42a5f5' }}>
                PUNCH IN ATTENDANCE
              </Button>
            </Box>
          </Paper>
        )}

        <Typography variant="h6" sx={{ marginTop: 3 }}>
          Past Attendance
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Search by Date"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Filter by Status"
            variant="outlined"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#42a5f5',
              color: 'white',
              textTransform: 'none',
              borderRadius: 2,
              marginBottom: 2,
            }}
            onClick={handleSearch}
          >
            Search
          </Button>

          {filteredAttendance.map((entry, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ padding: 1, borderBottom: '1px solid #ddd' }}
            >
              <Typography>{entry.date}</Typography>
              <Typography>{entry.reason}</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor:
                    entry.status === 'Present'
                      ? '#e0e0e0'
                      : entry.status === 'Leave'
                      ? '#42a5f5'
                      : '#ff7043',
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                {entry.status}
              </Button>
            </Box>
          ))}
        </Box>

        <Pagination count={7} page={1} sx={{ marginTop: 2 }} />

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#42a5f5',
            color: 'white',
            textTransform: 'none',
            borderRadius: 2,
            marginTop: 2,
            marginBottom: 3,
            marginLeft: '80%',
          }}
          onClick={handleApplyForLeave}
          disabled={hasAppliedForLeave}
        >
          APPLY FOR LEAVE +
        </Button>

        {isDatePickerOpen && (
          <>
            <DatePicker
              label="Select Leave Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ marginTop: 2 }} />
              )}
            />
            {showLeaveDetails && (
              <TextField
                label="Reason for Leave"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ marginTop: 2 }}
              />
            )}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#42a5f5',
                color: 'white',
                textTransform: 'none',
                borderRadius: 2,
                marginTop: 2,
              }}
              onClick={handleLeaveSubmission}
            >
              SUBMIT LEAVE
            </Button>
          </>
        )}

        <Box sx={{ marginTop: 2 }}>
          {upcomingEntries.map((entry, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ padding: 1, borderBottom: '1px solid #ddd' }}
            >
              <Typography>{entry.date}</Typography>
              <Typography>{entry.reason}</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor:
                    entry.status === 'Present'
                      ? '#e0e0e0'
                      : entry.status === 'Leave'
                      ? '#42a5f5'
                      : '#ff7043',
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                {entry.status}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AttendanceAhmed;
