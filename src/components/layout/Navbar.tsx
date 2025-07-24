"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });

  const handleLogout = async () => {
    try {
      const res = await logout();
      await Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: res?.message || 'You have been logged out successfully.',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });
      localStorage.removeItem('user');
      router.replace("/login");
    } catch (err: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: err?.message || err?.response?.data?.message || 'An error occurred during logout.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <nav className={`bg-blue-600 text-white px-6 py-3 shadow-md`}>
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <Link href="/" className="text-2xl font-bold">
          Lead Management
        </Link>
        <div className="space-x-4">
          {loading && <span>Loading...</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
