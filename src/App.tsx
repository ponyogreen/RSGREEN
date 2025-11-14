import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AccountOverview from './pages/AccountOverview'
import Billing from './pages/Billing'
import Usage from './pages/Usage'
import Devices from './pages/Devices'
import Plans from './pages/Plans'
import Support from './pages/Support'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ?
              <Navigate to="/dashboard" /> :
              <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ?
              <Dashboard onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/account"
          element={
            isAuthenticated ?
              <AccountOverview onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/billing"
          element={
            isAuthenticated ?
              <Billing onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/usage"
          element={
            isAuthenticated ?
              <Usage onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/devices"
          element={
            isAuthenticated ?
              <Devices onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/plans"
          element={
            isAuthenticated ?
              <Plans onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/support"
          element={
            isAuthenticated ?
              <Support onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
