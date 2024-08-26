import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    pastAttendance: [
      { date: '09/03/2022', status: 'Present', name: 'John Doe' },
      { date: '02/03/2022', status: 'Present', name: 'Doette' },
      { date: '01/03/2022', status: 'Present', name: 'Xin Yue' },
      { date: '29/02/2022', status: 'Leave', name: 'Kate John' },
      { date: '28/02/2022', status: 'Absent', name: 'Saad Ahmed' },
      { date: '12/02/2022', status: 'Absent', name: 'William Doe' },
      { date: '28/02/2022', status: 'Present', name: 'Jane Doette' },
      { date: '19/02/2022', status: 'Leave', name: 'Xin Yue' },
      { date: '29/02/2022', status: 'Absent', name: 'Ali Sallar' },
      { date: '28/02/2022', status: 'Present', name: 'Saad Ahmed' },
      { date: '30/02/2022', status: 'Absent', name: 'Mike Doe' },
      { date: '24/02/2022', status: 'Leave', name: 'Jane Doette' },
    ],
    notificationVisible: true,
    upcomingEntries: [],
  },
  reducers: {
    updatePastAttendance(state, action) {
      state.pastAttendance = action.payload;
    },
    addUpcomingEntry(state, action) {
      state.upcomingEntries.push(action.payload);
    },
    setNotificationVisible(state, action) {
      state.notificationVisible = action.payload;
    },
  },
});

export const { updatePastAttendance, addUpcomingEntry, setNotificationVisible } = attendanceSlice.actions;

export default attendanceSlice.reducer;
