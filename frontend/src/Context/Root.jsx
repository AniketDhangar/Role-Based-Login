import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Root = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate(); 
    useEffect(() => {
        // If the user exists (logged in)
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard'); 
            } else if (user.role === 'user') {
                navigate('/profile');  
            } else {
                navigate('/login');  
            }
        } else {
            navigate('/login');  
        }
    }, [user, navigate]); 

    return null; 
};

export default Root;
