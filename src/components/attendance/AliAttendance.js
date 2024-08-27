import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Alert from '@mui/material/Alert';
import { addUpcomingEntry, updatePastAttendance } from '../attendance/attendanceSlice';

const AttendanceAli = () => {
  const dispatch = useDispatch();
  const { pastAttendance, upcomingEntries, notificationVisible } = useSelector((state) => state.attendance);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [leaveReason, setLeaveReason] = useState('');
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [hasAppliedForLeave, setHasAppliedForLeave] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [isNotificationVisible, setIsNotificationVisible] = useState(notificationVisible);

  const statusOptions = ['Present', 'Absent', 'Leave'];

  useEffect(() => {
    if (notificationVisible) {
      setIsNotificationVisible(true);
      const timer = setTimeout(() => {
        setIsNotificationVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationVisible]);

  const handleApplyForLeave = () => {
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

      dispatch(addUpcomingEntry(leaveEntry));
      dispatch(updatePastAttendance([...pastAttendance, leaveEntry]));

      setIsDatePickerOpen(false);
      setShowLeaveDetails(false);
      setSelectedDate(null);
      setLeaveReason('');
      setHasAppliedForLeave(true);
    } else {
      alert('Please select a date and provide a reason for leave.');
    }
  };

  const filteredAttendance = pastAttendance.filter((entry) => {
    return (
      (!searchTerm || entry.date.includes(searchTerm)) &&
      (!filterStatus || entry.status === filterStatus)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAttendance.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3, width: '100%' }}>
        {isNotificationVisible && (
          <Paper sx={{ marginTop: 2, padding: 2, backgroundColor: '#e3f2fd' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Alert severity="info">
                <Typography color="rgba(1, 67, 97, 1)" fontFamily={'Roboto'}>
                  <strong>Welcome back, Ali!</strong>
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
            sx={{ marginBottom: 2, marginRight: 2 }}
          />

          <FormControl variant="outlined" sx={{ marginBottom: 2, width: '20%', marginRight: 2 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value=""><em>All</em></MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#42a5f5',
              color: 'white',
              textTransform: 'none',
              borderRadius: 2,
              marginBottom: 2,
              height: '5%',
            }}
          >
            Search
          </Button>

          {currentItems.map((entry, index) => (
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

        <Pagination
          count={Math.ceil(filteredAttendance.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ marginTop: 2 }}
        />

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

export default AttendanceAli;
