import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const { login, loggedUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedUser) {
            if (loggedUser.role === 'admin') {
                navigate('/main/dashboard');
            } else if (loggedUser.role === 'user') {
                navigate('/profile'); // or any user dashboard route
            }
        }
    }, [loggedUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/login", { email, password });
            const { loggedUser, token } = res.data;

            login(loggedUser, token); // sets user in context

            if (loggedUser.role === 'admin') {
                navigate('/main/dashboard');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            console.log(error)
            // alert("Login failed. Please check credentials.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
            />
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </Box>
    );
};

export default LoginForm;
