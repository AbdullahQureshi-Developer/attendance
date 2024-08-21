import React from 'react'
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
  Pagination,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

const data = [
  { name: 'Prabodhan Fitzgerald', hours: 160, avg: 8.0 },
  { name: 'Hiro Joyce', hours: 150, avg: 7.5 },
  { name: 'Lloyd Jefferson', hours: 150, avg: 6.8 },
  { name: 'Ceiran Meyo', hours: 130, avg: 7.6 },
  { name: 'Thumbiko James', hours: 152, avg: 7.9 },
]

const AdminCheck = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: 3, mt: 4, mb: 4, marginLeft: '0%' }}
    >
      <Grid container spacing={3}>
        {/* Today's Availability */}
        <Grid item xs={12}>
          <Typography variant="h5">Today's Availability</Typography>
          <Grid container spacing={2}>
            {/* Present */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Present</Typography>
                {/* List users */}
                <Grid container direction="column" spacing={1}>
                  {['John Doe', 'Jane Doette', 'Xin Yue'].map((name, index) => (
                    <Grid item key={index} container alignItems="center">
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        {name.charAt(0)}
                      </Avatar>
                      <Typography sx={{ ml: 2 }}>{name}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            {/* Absent */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Absent</Typography>
                {/* List users */}
                <Grid container direction="column" spacing={1}>
                  {['Kate John', 'Saad Ahmed'].map((name, index) => (
                    <Grid item key={index} container alignItems="center">
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        {name.charAt(0)}
                      </Avatar>
                      <Typography sx={{ ml: 2 }}>{name}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            {/* On Leave */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">On Leave</Typography>
                {/* List users */}
                <Grid container direction="column" spacing={1}>
                  {['John Doe', 'Jane Doette', 'Saad Ahmed'].map(
                    (name, index) => (
                      <Grid item key={index} container alignItems="center">
                        <Avatar sx={{ bgcolor: blue[500] }}>
                          {name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ ml: 2 }}>{name}</Typography>
                      </Grid>
                    ),
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Overall Stats */}
        <Grid item xs={12}>
          <Typography variant="h5">Overall Stats</Typography>
          <Paper sx={{ p: 2 }}>
            <TextField
              label="Search Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
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
                  {data.map((row, index) => {
                    // Extract the first letter of the name
                    const initial = row.name.charAt(0)

                    return (
                      <TableRow key={index}>
                        <TableCell
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                            {initial}
                          </Avatar>
                          {row.name}
                        </TableCell>
                        <TableCell>{row.hours}</TableCell>
                        <TableCell>{row.avg}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination count={10} sx={{ mt: 2 }} />
          </Paper>
        </Grid>

        {/* Manage Users Button */}
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ManageAccountsIcon />}
          >
            Manage Users
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminCheck
