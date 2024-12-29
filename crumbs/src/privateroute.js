import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  // Replace with actual auth logic
  const isAuthenticated = sessionStorage.getItem('loggedin');

  return isAuthenticated ? children : <Navigate to="/welcome" />;
};

export default PrivateRoute;