'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.data.user);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        } else {
          // Token is invalid or expired
          signOut();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [token]);

  const signUp = async (email, password, name) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        
        // Store token and user in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        return { data: data.data, error: null };
      } else {
        return { data: null, error: data.message };
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        
        // Store token and user in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        return { data: data.data, error: null };
      } else {
        return { data: null, error: data.message };
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      // Clear user and token from state
      setUser(null);
      setToken(null);
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const value = {
    user,
    loading,
    token,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
} 