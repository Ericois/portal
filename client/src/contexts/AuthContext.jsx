import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (storedToken) {
        const session = JSON.parse(storedToken);
        setUser(session.user);
        setToken(session.access_token);
        await checkAdmin(session.user.id);
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const checkAdmin = async (userId) => {
    const { data, error } = await supabase
      .from('user_tenants')
      .select('is_business_admin')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    const isAdmin = data ? data.is_business_admin : false;
    setIsAdmin(isAdmin);
    return isAdmin;
  };

  const login = async (email, password, rememberMe) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Login failed. Please check your credentials and try again.");
        throw error;
      }
      
      const isAdmin = await checkAdmin(data.user.id);
      if (!isAdmin) {
        await supabase.auth.signOut();
        setUser(null);
        setToken(null);
        setError("Login failed. Please check your credentials and try again.");  // Unified error message
        return false;
      }

      setUser(data.user);
      setToken(data.session.access_token);
      
      if (rememberMe) {
        localStorage.setItem("token", JSON.stringify(data.session));
      } else {
        sessionStorage.setItem("token", JSON.stringify(data.session));
      }

      setError(null);  // Clear any previous error message
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      setError("Login failed. Please check your credentials and try again.");  // Ensure error message is consistent
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, token, isAdmin, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
