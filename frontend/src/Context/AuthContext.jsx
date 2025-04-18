import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("pos-user");
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.log("Invalid user in localStorage", error);
            return null;
        }
    });

    const login = (userData, token) => {
        const payload = { userData, token };
        setUser(payload); // Directly setting userData
        localStorage.setItem("pos-user", JSON.stringify(payload));
        localStorage.setItem("pos-token", token); // Optional: if you use token elsewhere
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("pos-user");
        localStorage.removeItem("pos-token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
