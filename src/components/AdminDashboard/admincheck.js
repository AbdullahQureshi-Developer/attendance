import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  ButtonGroup,
  Select,
  MenuItem,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { blue } from '@mui/material/colors';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TabPanel from './tabPanel';

const data = [
  { name: 'Prabodhan Fitzgerald', hours: 160, avg: 8.0 },
  { name: 'Hiro Joyce', hours: 150, avg: 7.5 },
  { name: 'Lloyd Jefferson', hours: 150, avg: 6.8 },
  { name: 'Ceiran Meyo', hours: 130, avg: 7.6 },
  { name: 'Thumbiko James', hours: 152, avg: 7.9 },
  { name: 'Emily Sanders', hours: 165, avg: 8.2 },
  { name: 'Jordan Blake', hours: 140, avg: 7.4 },
  { name: 'Taylor Morgan', hours: 155, avg: 7.7 },
  { name: 'Riley Brooks', hours: 120, avg: 6.9 },
  { name: 'Casey Wells', hours: 145, avg: 7.3 },
  { name: 'Avery Lee', hours: 160, avg: 8.0 },
  { name: 'Dylan Hart', hours: 125, avg: 7.1 },
  { name: 'Samantha Hughes', hours: 150, avg: 7.8 },
  { name: 'Alex Riley', hours: 170, avg: 8.4 },
  { name: 'Morgan Clark', hours: 140, avg: 7.6 },
  { name: 'Saad Ahmed', hours: 140, avg: 7.6 } 
];

const AdminCheck = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('name');
  const [timePeriod, setTimePeriod] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = data
    .filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'name' ? a.name.localeCompare(b.name) : b.hours - a.hours,
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <>
      {/* <AdminDashboard/> */}
    <Container maxWidth="lg" sx={{ padding: 3, mt: 4, mb: 4, marginLeft: '0%' }}>
      <Grid container spacing={3}>
        {/* Today's Availability */}
        <Grid item xs={12}>
          <Typography variant="h5">Today's Availability</Typography>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Present" />
            <Tab label="Absent" />
            <Tab label="On Leave" />
          </Tabs>

          <TabPanel value={selectedTab} index={0}>
            {/* Present */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Present
                  </Typography>
                  <Grid container direction="column" spacing={1}>
                    {[
                      'John Doe',
                      'Jane Doette',
                      'Xin Yue',
                      'Kate John',
                      'Saad Ahmed', 
                    ].map((name, index) => (
                      <Grid item key={index} container alignItems="center">
                        <Avatar sx={{ bgcolor: blue[500], width: 40, height: 40 }}>
                          {name.split(' ').map((n) => n[0]).join('')}
                        </Avatar>
                        <Typography sx={{ ml: 2 }}>{name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            {/* Absent */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Absent</Typography>
              <Grid container direction="column" spacing={1}>
                {['Kate John', 'Saad Ahmed'].map((name, index) => (
                  <Grid item key={index} container alignItems="center">
                    <Avatar sx={{ bgcolor: blue[500], width: 40, height: 40 }}>
                      {name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Typography sx={{ ml: 2 }}>{name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
            {/* On Leave */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">On Leave</Typography>
              <Grid container direction="column" spacing={1}>
                {['John Doe', 'Jane Doette', 'Saad Ahmed'].map((name, index) => (
                  <Grid item key={index} container alignItems="center">
                    <Avatar sx={{ bgcolor: blue[500], width: 40, height: 40 }}>
                      {name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Typography sx={{ ml: 2 }}>{name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>
        </Grid>

        {/* Overall Stats */}
        <Grid item xs={12}>
          <Typography variant="h5">Overall Stats</Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={8}>
                <TextField
                  label="Search Name"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                <ButtonGroup>
                  <Button
                    variant={sortOrder === 'name' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('name')}
                  >
                    Sort by Name
                  </Button>
                  <Button
                    variant={sortOrder === 'hours' ? 'contained' : 'outlined'}
                    onClick={() => handleSortChange('hours')}
                  >
                    Sort by Hours
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>

            <Select
              value={timePeriod}
              onChange={handleTimePeriodChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value={1}>1 Month</MenuItem>
              <MenuItem value={3}>3 Months</MenuItem>
              <MenuItem value={6}>6 Months</MenuItem>
              <MenuItem value={12}>12 Months</MenuItem>
            </Select>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Total Hours</TableCell>
                    <TableCell>Daily Average Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                          {row.name.charAt(0)}
                        </Avatar>
                        {row.name}
                      </TableCell>
                      <TableCell>{row.hours}</TableCell>
                      <TableCell>{row.avg}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                  renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#007BFF',
                      color: 'white',
                    },
                  }}
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
      </Container>
      </>
  );
};

export default AdminCheck;
