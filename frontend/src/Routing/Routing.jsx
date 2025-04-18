import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import User from '../User';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import Root from '../Context/Root';
import LoginForm from '../Login';
import Profile from '../Profile';
import ProtectedRoute from './ProtectedRoute';

function Routing() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Root />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contact />} />

            {/* Admin Protected Routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute role="admin">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute role="admin">
                        <User />
                    </ProtectedRoute>
                }
            />

            {/* Common Logged-in User Routes */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Routing;
