import React from 'react'
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial',
  },
})

export default function Navbar() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Attendance
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
