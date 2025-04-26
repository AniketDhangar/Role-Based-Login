import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../Routing/Routing';


const Root = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false);  // User is not authenticated
      navigate("/login");  // Redirect to login if not authenticated
    }
  }, []);

  return (
    <Router>
      {isAuthenticated && <Routing />} {/* Render the routes only if authenticated */}
    </Router>
  );
};

export default Root;
