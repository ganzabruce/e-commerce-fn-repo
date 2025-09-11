import './App.css'

import { BrowserRouter as Router , Routes, Route, Navigate  } from 'react-router-dom'

import AdminDashboard from './components/dashboard/AdminDashboard'
import LandingPage from './landingPage'
import Nav from './components/navbar/nav'

import { useAdminContext } from './hooks/useAdminAuth'
import { useUserContext } from './hooks/useUserContext'
function App() {
  const { admin } = useAdminContext();
  // const { user } = useUserContext();

  return (
    <>
    <Router>
      <nav>
        <Nav />
      </nav>
      <Routes>
        <Route path="/" element={admin ? <Navigate to="/admin/dashboard" />:<LandingPage />} />
        <Route path="/admin/dashboard" element={admin ? <AdminDashboard />: <Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}
export default App
