import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role === 'admin') {

        return <Navigate to="/admin/dashboard" replace />;
    }

    // if (role && user.role !== role) {
    //     return <Navigate to="/" replace />;
    // }
    if (user.role === 'admin') {

        return <Navigate to="/profile" replace />;
    }

    return children;
}

export default ProtectedRoute;
