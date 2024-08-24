import React from 'react';
import { Box, Breadcrumbs, Typography, TextField, Button, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

function Settings() {
  return (
    <Box sx={{ margin: '5%', marginLeft:'2px' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/AdminDashboard">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography color="textPrimary">
          <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Settings
        </Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography variant="h4" sx={{ marginTop: '20px' }}>
        Settings
      </Typography>

      {/* Office Hours Section */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6">Office Hours</Typography>
        
        <TextField
          label="Start Time"
          type="time"
          defaultValue="09:00"
          sx={{ marginTop: '20px', marginBottom: '20px', display: 'block' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />

        <TextField
          label="Finish Time"
          type="time"
          defaultValue="09:00"
          sx={{ marginBottom: '20px', display: 'block' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />

        <TextField
          label="Working Hours"
          type="number"
          defaultValue="8"
          sx={{ marginBottom: '40px', display: 'block' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {/* Save Changes Button */}
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
      >
        SAVE CHANGES
      </Button>
    </Box>
  );
}

export default Settings;
