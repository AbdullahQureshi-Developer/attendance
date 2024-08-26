import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './components/attendance/attendanceSlice';

const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
  },
});

export default store;
