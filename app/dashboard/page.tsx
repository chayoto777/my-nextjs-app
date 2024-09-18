// app/pages/dashboard/page.tsx

"use client"; // Add this to make it a Client Component

import { useRouter } from 'next/navigation'; // Use from 'next/navigation' in App Router
import { useEffect, useState } from 'react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Michael Johnson', email: 'michael@example.com' },
];

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    setFilteredUsers(
      mockUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Welcome to the Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mt-4 mb-4 border rounded"
      />
      <ul className="bg-white p-4 rounded-lg shadow-lg">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="p-4 border-b last:border-none border-gray-300"
          >
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
