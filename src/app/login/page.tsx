"use client";

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Swal from 'sweetalert2';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
        const res = await login({ username, password });
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: res.message,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        router.push('/dashboard');
    } catch (err) {
        console.error('Login failed:', err);
        await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: (err as any)?.message || 'An error occurred during login.',
          confirmButtonText: 'OK'
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Mini CRM</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Login
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;