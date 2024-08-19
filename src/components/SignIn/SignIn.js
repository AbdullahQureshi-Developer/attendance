import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment } from '@mui/material'
import { AppBar, Toolbar } from '@mui/material'

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial',
  },
})

const predefinedUsername = 'user'
let predefinedPin = '1234'

export default function SignIn() {
     const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', pin: '', newPin: '' })
  const [error, setError] = useState('')
  const [firstLogin, setFirstLogin] = useState(true)
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
    if (firstLogin) {
      if (newPin) {
        predefinedPin = newPin
        setFirstLogin(false)
        setError('')
        console.log('PIN set successfully:', predefinedPin)
      } else {
        setError('Please enter a new PIN')
      }
    } else {
      if (username === predefinedUsername && pin === predefinedPin) {
        setError('')
          console.log('User logged in successfully:', user)
          navigate('/Dashboard');
        // Proceed to the next step (e.g., redirect to another page)
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
        <CssBaseline />
        <Box
          className="box1"
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
            {firstLogin ? 'Change Password' : 'Sign In'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {firstLogin ? (
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
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="pin"
                  variant="standard"
                  label="Pin code"
                  type="password"
                  id="pin"
                  value={user.pin}
                  autoComplete="current-password"
                  onChange={handleChange}
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
