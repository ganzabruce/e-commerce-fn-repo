import './App.css'

import { BrowserRouter as Router , Routes, Route, Navigate  } from 'react-router-dom'

import AdminDashboard from './components/dashboard/AdminDashboard'
import LandingPage from './landingPage'
import Nav from './components/navbar/nav'

import { useAdminContext } from './hooks/useAdminAuth'
import ProductDetails from './components/dashboard/products/productDetails'
import UserDetails from './components/dashboard/users/userDetails'

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
        <Route path="/product/info/:id" element={admin ? <ProductDetails />: <Navigate to="/" />} />
        <Route path="/user/info/:id" element={admin ? <UserDetails />: <Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}
export default App
