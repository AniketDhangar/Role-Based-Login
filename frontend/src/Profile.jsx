import React from 'react';
import { Box, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAuth } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth(); // Accessing user context and logout function
    const navigate = useNavigate();

    // If user is not available, show a loading spinner
    if (!user) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Destructure user data
    const { userData } = user || {};
    const { name, email, role } = userData || {};

    // Logout function
    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                padding: 2,
            }}
        >
            <Card sx={{ maxWidth: 400, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" align="center" gutterBottom>
                        👤 Profile
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body1">
                            <strong>Name:</strong> {name || 'Not available'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {email || 'Not available'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Role:</strong> {role || 'Not available'}
                        </Typography>
                    </Box>
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
