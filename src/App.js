import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import { Provider } from 'react-redux'
import { store } from './store'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Users from './components/AdminDashboard/users'
// import UsersTable from './components/attendance/userTable'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Users" element={<Users/>} />

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
