import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Helps avoid flickers on initial load

    useEffect(() => {
        const storedUser = localStorage.getItem("pos-user");
        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.log("Error parsing stored user", error);
                setUser(null);
            }
        }
        setLoading(false); // Done checking
    }, []);

    const login = (userData, token) => {
        const payload = { userData, token };
        setUser(payload);
        localStorage.setItem("pos-user", JSON.stringify(payload));
        localStorage.setItem("pos-token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("pos-user");
        localStorage.removeItem("pos-token");
    };

    const contextValue = useMemo(() => ({ user, login, logout, loading }), [user, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
