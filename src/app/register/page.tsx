"use client";

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const { register, loading, error } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({ username, password, first_name, last_name });
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: res.message,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: (err as any)?.message || 'An error occurred during registration.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Register for Mini CRM</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            type="text"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
            required
          />
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
            Register
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 