import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Container,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// Set up a default theme with your preferred font
const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial',
  },
})

// Hard-coded predefined usernames and PINs
const predefinedUsernameAdmin = 'admin'
const predefinedPinAdmin = '1234'

// Saad's initial settings
const predefinedUsernameSaad = 'Saad'
let predefinedPinSaad = ''

export default function SignIn() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: '', pin: '', newPin: '' })
  const [error, setError] = useState('')
  const [firstLogin, setFirstLogin] = useState(false) // Only true for Saad
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { username, pin, newPin } = user

   if (firstLogin && username === predefinedUsernameSaad) {
      // Handle Saad's first login where he sets a new PIN
      if (newPin) {
        predefinedPinSaad = newPin
        setFirstLogin(false)
        setError('')
        console.log('PIN set successfully for Saad:', predefinedPinSaad)
      } else {
        setError('Please enter a new PIN')
      }
    } else {
      // Handle regular logins
      if (
        (username === predefinedUsernameAdmin && pin === predefinedPinAdmin) ||
        (username === predefinedUsernameSaad && pin === predefinedPinSaad)
      ) {
        setError('')
        console.log('User logged in successfully:', user)
        
        // Navigate to the appropriate dashboard based on the username
        if (username === predefinedUsernameAdmin) {
          navigate('/AdminDashboard')
        } else {
          navigate('/Dashboard')
        }
      } else {
        setError('Invalid username or PIN')
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '32px',
            width: '378px',
            height: '244px',
            marginLeft: '0%',
            marginTop: '40%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: '-10%' }}>
            {firstLogin && user.username === predefinedUsernameSaad
              ? 'Change Password'
              : 'Sign In'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {firstLogin && user.username === predefinedUsernameSaad ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  name="newPin"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  value={user.newPin}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ textAlign: 'center' }}
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: '378px' }}
                >
                  CONFIRM
                </Button>
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  id="username"
                  name="username"
                  variant="standard"
                  type="text"
                  value={user.username}
                  autoComplete="username"
                  autoFocus
                  onChange={(event) => {
                    handleChange(event)
                    if (event.target.value === predefinedUsernameSaad) {
                      setFirstLogin(true)
                    } else {
                      setFirstLogin(false)
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="pin"
                  variant="standard"
                  label="Pin code"
                  type={showPassword ? 'text' : 'password'}
                  value={user.pin}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ textAlign: 'center' }}
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
