import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Admin/Dashboard';
import Services from '../Admin/Services';
import MyAppointments from '../Admin/MyAppointments';
import User from '../Admin/User';
import MainPage from '../Admin/MainPage';
import Profile from '../Pages/Profile';
import LoginForm from '../Pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from '../Pages/Unauthorized';

function Routing() {
  return (
    <Routes>
      {/* Public routes */}
      {/* <Route path='/login' element={<LoginForm />} />
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } /> */}

      {/* Protected admin routes */}
      {/* <Route path='/main/*' element={
        <ProtectedRoute role="admin">
          <MainPage />
        </ProtectedRoute>
      } /> */}
      {/* <Route path='/main/dashboard' element={
        <ProtectedRoute role="admin">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/main/services' element={
        <ProtectedRoute role="admin">
          <Services />
        </ProtectedRoute>
      } />
      <Route path='/main/appointments' element={
        <ProtectedRoute role="admin">
          <MyAppointments />
        </ProtectedRoute>
      } />
      <Route path='/main/users' element={
        <ProtectedRoute role="admin">
          <User />
        </ProtectedRoute>
      } /> */}


    </Routes>
  );
}

export default Routing;
