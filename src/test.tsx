// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Dashboard/AdminDashboard';

function Apps() {
  return (
    <Router>
      <Routes>

        <Route 
          path="/admin" 
          element={
            // <ProtectedRoute requireAdmin>
              <AdminDashboard />
            // </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default Apps;