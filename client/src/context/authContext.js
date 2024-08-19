import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [userAddress, setUserAddress] = useState(null);

    return (
        <AuthContext.Provider value={{ userAddress, setUserAddress }}>
            {children}
        </AuthContext.Provider>
    );
};