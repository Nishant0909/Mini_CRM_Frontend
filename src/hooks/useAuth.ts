import { useState } from 'react';
import { loginUser, logoutUser, registerUser } from '../lib/auth';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  // Add other user fields as needed
}

function setTokenCookie(token: string) {
  document.cookie = `token=${token}; path=/;`;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useRouter();

  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(credentials);
      setUser(userData?.user);
      localStorage.setItem('user', JSON.stringify(userData?.user));
      if (userData.token) {
        setTokenCookie(userData.token);
      }
      setLoading(false);
      return userData;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setUser(null);
      setLoading(false);
      return null;
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const registeredUser = await registerUser(userData);
      setUser(registeredUser);
      setLoading(false);
      return registeredUser;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setUser(null);
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await logoutUser();
      setUser(null);
      setLoading(false);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    };
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setUser, // Expose setUser for advanced usage if needed
  };
} 