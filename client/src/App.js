import React, { useState, useEffect } from 'react';
import MetaMaskConnect from './components/MetaMaskConnect.js';

const App = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleConnect = async(token) => {
        try {
            setToken(token);
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="App">
            {token ? (
                <p>Welcome, you are logged in!</p>
            ) : (
                <MetaMaskConnect onConnect={handleConnect} />
            )}
        </div>
    );
};

export default App;