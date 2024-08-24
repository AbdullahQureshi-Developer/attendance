import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import SaadDashboard from './components/Dashboard/SaadDashboard'
import { Provider } from 'react-redux'
import { store } from './store'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Users from './components/AdminDashboard/users'
import AliDashboard from './components/Dashboard/AliDashboard'
import AhmedDashboard from './components/Dashboard/AhmedDashboard'
import SettingsPanel  from "./components/Dashboard/SettingsPanel"
// import UsersTable from './components/attendance/userTable'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SaadDashboard" element={<SaadDashboard />} />
          <Route path="/AliDashboard" element={<AliDashboard/>} />
          <Route path="/AhmedDashboard" element={<AhmedDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Users" element={<Users/>} />
          <Route path="/SettingsPanel" element={<SettingsPanel/>} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
