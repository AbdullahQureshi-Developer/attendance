import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';

const AdminCheck = () => {
  const { pastAttendance } = useSelector((state) => state.attendance);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredAttendance = pastAttendance.filter((entry) => {
    return (
      (!searchTerm || entry.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterStatus || entry.status === filterStatus)
    );
  });

  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAttendance.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage);

  return (
    <Box sx={{ padding: 3, marginTop: '30px' }}>
      <Typography variant="h6">Today's Availability</Typography>
      
      <Grid container spacing={2}>
        {['Present', 'Absent', 'Leave'].map((status) => (
          <Grid item xs={12} sm={4} key={status}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>{status}</Typography>
              {filteredAttendance
                .filter((entry) => entry.status === status)
                .slice(0, 5)
                .map((entry, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar sx={{ marginRight: 2, backgroundColor: 'primary.main' }}>
                      {entry.name?.[0] || '?'}
                    </Avatar>
                    <Typography>{entry.name || 'Unknown'}</Typography>
                  </Box>
                ))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Overall Stats</Typography>
        
        {/* Search TextField for filtering names */}
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '300px', marginBottom: 2 }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Hours</TableCell>
                <TableCell>Daily Average Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ marginRight: 2, backgroundColor: 'primary.main' }}>
                        {entry.name?.[0] || '?'}
                      </Avatar>
                      {entry.name || 'Unknown'}
                    </Box>
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.totalHours}</TableCell>
                  <TableCell>{entry.dailyAverageHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAttendance.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Box>
  );
};

export default AdminCheck;
