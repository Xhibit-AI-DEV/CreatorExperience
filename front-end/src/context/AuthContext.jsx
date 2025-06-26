import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Add this useEffect to initialize user from localStorage
  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    const userEmail = localStorage.getItem('userEmail');
    console.log("AuthContext - Initializing from localStorage:", { walletAddress, userEmail });
    if (walletAddress) {
      setUser({ wallet: walletAddress, email: userEmail });
    }
  }, []);

  // Add any authentication-related functions here
  const login = (userData) => {
    console.log("AuthContext - Login called with:", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userEmail');
  };

  // Add a log to see the current user state
  console.log("AuthContext - Current user state:", user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
