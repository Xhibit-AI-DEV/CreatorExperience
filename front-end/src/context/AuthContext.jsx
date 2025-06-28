import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize user from localStorage only once
  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    const userEmail = localStorage.getItem('userEmail');
    
    console.log("AuthContext - Initializing from localStorage:", { walletAddress, userEmail });
    
    if (walletAddress) {
      setUser({ wallet: walletAddress, email: userEmail });
    }
    
    setIsInitialized(true);
  }, []); // Empty dependency array - only run once

  // Use useCallback for login/logout functions
  const login = useCallback((userData) => {
    console.log("AuthContext - Login called with:", userData);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userEmail');
  }, []);

  // Only log when user actually changes
  useEffect(() => {
    if (isInitialized) {
      console.log("AuthContext - User state changed:", user);
    }
  }, [user, isInitialized]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized }}>
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
