import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const initialUsersData = [
  { id: 1, name: 'Alice Johnson', position: 'Frontend Engineer', email: 'alice.johnson@example.com', totalHours: 120, dailyAvgHours: 6 },
  { id: 2, name: 'Bob Smith', position: 'Backend Engineer', email: 'bob.smith@example.com', totalHours: 200, dailyAvgHours: 8 },
  { id: 3, name: 'Carol Davis', position: 'DevOps', email: 'carol.davis@example.com', totalHours: 150, dailyAvgHours: 7.5 },
  { id: 4, name: 'David Wilson', position: 'HR Manager', email: 'david.wilson@example.com', totalHours: 180, dailyAvgHours: 9 },
];

function UsersTable() {
  const [users, setUsers] = useState(initialUsersData);
  const [filteredUsers, setFilteredUsers] = useState(initialUsersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    filterUsers(searchQuery, selectedPosition);
  }, [users, searchQuery, selectedPosition]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handlePositionChange = (e) => {
    const position = e.target.value;
    setSelectedPosition(position);
  };

  const filterUsers = (query, position) => {
    const filtered = users.filter(user => {
      const matchesQuery = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      const matchesPosition = position === '' || user.position === position;
      return matchesQuery && matchesPosition;
    });
    setFilteredUsers(filtered);
  };

  const handleMenuClick = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditOpen = () => {
    if (selectedUser) {
      setIsEditOpen(true);
    }
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleEditSave = () => {
    if (selectedUser && validateUser(selectedUser)) {
      setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
      handleEditClose();
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      handleMenuClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddOpen = () => {
    setSelectedUser({
      id: users.length ? Math.max(users.map(user => user.id)) + 1 : 1,
      name: '',
      position: '',
      email: '',
      totalHours: 0,
      dailyAvgHours: 0,
    });
    setIsAddOpen(true);
  };

  const handleAddClose = () => {
    setIsAddOpen(false);
    setSelectedUser(null);
  };

  const handleAddSave = () => {
    if (selectedUser && validateUser(selectedUser)) {
      setUsers([...users, selectedUser]);
      handleAddClose();
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const handleViewOpen = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setSelectedUser(null);
  };

  const validateUser = (user) => {
    return user.name && user.position && user.email; // Add more validation as needed
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div style={{ padding: 16, marginTop:50 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '16px' }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search by name, email"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Position</InputLabel>
            <Select
              label="Position"
              value={selectedPosition}
              onChange={handlePositionChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Frontend Engineer">Frontend Engineer</MenuItem>
              <MenuItem value="Backend Engineer">Backend Engineer</MenuItem>
              <MenuItem value="DevOps">DevOps</MenuItem>
              <MenuItem value="HR Manager">HR Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" size="medium" onClick={handleAddOpen}>
            <AddIcon />
            Add User
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Daily Avg. Hours</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: '#2196f3', width: 40, height: 40 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                    </Grid>
                    <Grid item>{user.name}</Grid>
                  </Grid>
                </TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.totalHours}</TableCell>
                <TableCell>{user.dailyAvgHours}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '8px' }}
                    onClick={() => handleViewOpen(user)}
                  >
                    View
                  </Button>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={event => handleMenuClick(event, user)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedUser && selectedUser.id === user.id)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit User Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="position"
                label="Position"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.position}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={selectedUser.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="totalHours"
                label="Total Hours"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedUser.totalHours}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="dailyAvgHours"
                label="Daily Avg. Hours"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedUser.dailyAvgHours}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddOpen} onClose={handleAddClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="position"
                label="Position"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.position}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={selectedUser.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="totalHours"
                label="Total Hours"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedUser.totalHours}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="dailyAvgHours"
                label="Daily Avg. Hours"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedUser.dailyAvgHours}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewOpen} onClose={handleViewClose}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography variant="h6">Name: {selectedUser.name}</Typography>
              <Typography variant="body1">Position: {selectedUser.position}</Typography>
              <Typography variant="body1">Email: {selectedUser.email}</Typography>
              <Typography variant="body1">Total Hours: {selectedUser.totalHours}</Typography>
              <Typography variant="body1">Daily Avg. Hours: {selectedUser.dailyAvgHours}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersTable;
