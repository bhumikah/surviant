import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import CheckInbox from './pages/CheckInbox'
import ResetPassword from './pages/resetpassword'
import UserProfile from './pages/UserProfile'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-inbox" element={<CheckInbox />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
 <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App


