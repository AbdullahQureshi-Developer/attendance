import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pastAttendance: [
    { date: '03/03/2022', status: 'Present' },
    { date: '02/03/2022', status: 'Present' },
    { date: '01/03/2022', status: 'Present' },
    { date: '29/02/2022', status: 'Leave' },
    { date: '28/02/2022', status: 'Absent' },
  ],
  notificationVisible: true,
  upcomingEntries: [],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    hideNotification(state) {
      state.notificationVisible = false;
    },
    addUpcomingEntry(state, action) {
      state.upcomingEntries.push(action.payload);
    },
    addPastAttendance(state, action) {
      state.pastAttendance.push(action.payload);
    },
    searchAttendance(state, action) {
      // Implement search functionality here if needed
      // This is just a placeholder for searching past attendance
    },
  },
});

export const { hideNotification, addUpcomingEntry, addPastAttendance, searchAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
