import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('../Admin/Dashboard'));
const User = lazy(() => import('../Admin/User'));
const Home = lazy(() => import('../Users/Home'));
const About = lazy(() => import('../Users/About'));
const Contact = lazy(() => import('../Users/Contact'));
const LoginForm = lazy(() => import('../Pages/Login'));
const MainPage = lazy(() => import('../Admin/MainPage'));
const MyAppointments = lazy(() => import('../Admin/MyAppointments'));
const Services = lazy(() => import('../Admin/Services'));
const Profile = lazy(() => import('../Pages/Profile'));
const Unauthorized = lazy(() => import('../Pages/Unauthorized'));
const Root = lazy(() => import('../Context/Root'));

import ProtectedRoute from './ProtectedRoute';
import Loader from '../Pages/Loader';

function Routing() {
    return (
        <Routes>
            {/* public routes */}
            <Route path='/' element={
                <Suspense fallback={<Loader/>}>
                    <Root />
                </Suspense>
            } />
            <Route path='/login' element={
                <Suspense fallback={<Loader/>}>
                    <LoginForm />
                </Suspense>
            } />
            <Route path='/home' element={
                <Suspense fallback={<Loader/>}>
                    <Home />
                </Suspense>
            } />
            <Route path='/about' element={
                <Suspense fallback={<Loader/>}>
                    <About />
                </Suspense>
            } />
            <Route path='/contact' element={
                <Suspense fallback={<Loader/>}>
                    <Contact />
                </Suspense>
            } />
            <Route path='/unauthorized' element={
                <Suspense fallback={<Loader/>}>
                    <Unauthorized />
                </Suspense>
            } />

            {/* Protected admin routes */}
            <Route
                path="/main/*"
                element={
                    <ProtectedRoute role="admin">
                        <Suspense fallback={<Loader/>}>
                            <MainPage />
                        </Suspense>
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={
                    <Suspense fallback={<Loader/>}>
                        <Dashboard />
                    </Suspense>
                } />
                <Route path="services" element={
                    <Suspense fallback={<Loader/>}>
                        <Services />
                    </Suspense>
                } />
                <Route path="appointments" element={
                    <Suspense fallback={<Loader/>}>
                        <MyAppointments />
                    </Suspense>
                } />
                <Route path="users" element={
                    <Suspense fallback={<Loader/>}>
                        <User />
                    </Suspense>
                } />
                <Route path="profile" element={
                    <Suspense fallback={<Loader/>}>
                        <Profile />
                    </Suspense>
                } />
            </Route>

            {/* Protected user route */}
            <Route path='/profile' element={
                <ProtectedRoute>
                    <Suspense fallback={<Loader/>}>
                        <Profile />
                    </Suspense>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default Routing;
