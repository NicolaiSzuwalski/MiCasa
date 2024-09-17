// AuthProvider.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null); // Use null initially

    useEffect(() => {
        const token = sessionStorage.getItem('supabase.auth.token');
        if (token) {
            const parsedData = JSON.parse(token);
            setLoginData(parsedData.session); // Store the session details
        }
    }, []);

    return (
        <AuthContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
