"use client";

import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />

        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <div className="font-semibold text-lg">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
