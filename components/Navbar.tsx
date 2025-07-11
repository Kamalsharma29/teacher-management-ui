// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Admin", path: "/admin" },
    { name: "Settings", path: "/settings" },
    { name: "Calendar", path: "/calendar" },
  ];

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${
              pathname === item.path
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
