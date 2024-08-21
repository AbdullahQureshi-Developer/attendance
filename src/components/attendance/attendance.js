import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Button, Paper, TextField } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addUpcomingEntry, addPastAttendance } from './attendanceSlice'
import Alert from '@mui/material/Alert'

const Attendance = () => {
  const dispatch = useDispatch()
  const { pastAttendance, notificationVisible, upcomingEntries } = useSelector(
    (state) => state.attendance,
  )

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [leaveReason, setLeaveReason] = useState('')
  const [showLeaveDetails, setShowLeaveDetails] = useState(false)
  const [hasAppliedForLeave, setHasAppliedForLeave] = useState(false)
  const [showNotification, setShowNotification] = useState(notificationVisible)

  const handleApplyForLeave = () => {
    // Check if leave has already been applied for today
    const today = new Date().toLocaleDateString()
    const leaveAppliedToday = upcomingEntries.some(
      (entry) => entry.date === today && entry.status === 'Leave',
    )

    if (leaveAppliedToday) {
      alert('You have already applied for leave today.')
      return
    }

    setIsDatePickerOpen(true)
    setShowLeaveDetails(true)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleLeaveSubmission = () => {
    if (selectedDate && leaveReason) {
      const leaveEntry = {
        date: selectedDate.toLocaleDateString(),
        status: 'Leave',
        reason: leaveReason,
      }

      // Add to upcoming entries
      dispatch(addUpcomingEntry(leaveEntry))

      // Add to past attendance
      dispatch(addPastAttendance(leaveEntry))

      setIsDatePickerOpen(false)
      setShowLeaveDetails(false)
      setSelectedDate(null)
      setLeaveReason('')

      // Mark leave as applied for today
      setHasAppliedForLeave(true)
    } else {
      alert('Please select a date and provide a reason for leave.')
    }
  }
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
        // Optionally, you can dispatch an action to update the Redux state here
        // dispatch(hideNotification());
      }, 5000) // 10 seconds

      return () => clearTimeout(timer) // Cleanup the timer
    }
  }, [showNotification])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3, width: '100%' }}>
        {showNotification && (
          <Paper sx={{ marginTop: 2, padding: 2, backgroundColor: '#e3f2fd' }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Alert severity="info">
                <Typography color="rgba(1, 67, 97, 1)" fontFamily={'Roboto'}>
                  <strong>Welcome back, Saad!</strong>
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
          Past attendance
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          {pastAttendance.map((entry, index) => (
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
          disabled={hasAppliedForLeave} // Disable button if leave has been applied
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
  )
}

export default Attendance
