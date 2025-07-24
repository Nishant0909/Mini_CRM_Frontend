"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Create Lead", href: "/dashboard/create" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-1 left-4 z-50 bg-white border rounded p-2 shadow"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-auto min-h-screen w-64 bg-gray-100 border-r overflow-y-auto z-40
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center justify-center bg-blue-600 px-6 py-3 w-full">CRM</h2>
        <nav className="flex flex-col space-y-4 p-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-4 rounded transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded"
          >
            Logout
          </button>
        </div>
        {user && (
          <p className="mt-4 text-sm text-gray-600">
            Logged in as: <br /> <strong>{user.username}</strong>
          </p>
        )}
      </aside>
      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
