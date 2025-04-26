import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Suspense } from 'react';
import Loader from '../Pages/Loader';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user || (role && user.userData?.role !== role)) {
                navigate('/login');
            }
        }
    }, [user, role, navigate, loading]);

    if (loading) return null; // Optionally render a loader

    return <>
        <Suspense fallback={<Loader message="Loading protected content..." />}>
            {children}
        </Suspense>
    </>;
};

export default ProtectedRoute;
