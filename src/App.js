import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import Attendance from './components/attendance/attendance'
import { Provider } from 'react-redux'
import { store } from './store'
import AdminDashboard from './components/Dashboard/AdminDashboard'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Attendance" element={<Attendance />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
