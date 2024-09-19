"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import bg from '../background/blueBackGround.jpg';

interface User {
  id: number;
  name: string;
  email: string;
}

// API URL for fetching users
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3; // Show 3 users per page

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json(); 
        setUsers(data); 
        setFilteredUsers(data); 
        setLoading(false); 
      } catch (error) {
        setError('Error fetching users. Please try again later.');
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [search, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-backgroundMovement"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-500 opacity-80 z-0 animate-gradientFade"></div>

      <div className="relative bg-white p-8 rounded-xl shadow-md w-full max-w-2xl z-10 transform transition-all duration-700 ease-out hover:scale-105 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to the Application</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <ul className="space-y-4">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <li
                key={user.id}
                className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
              </li>
            ))
          ) : (
            <li className="text-gray-600 text-center">No users found</li>
          )}
        </ul>

        {/* Pagination controls */}
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-backgroundMovement {
          animation: moveBackground 20s ease-in-out infinite;
        }

        @keyframes moveBackground {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradientFade {
          animation: gradientFade 10s ease-in-out infinite alternate;
        }

        @keyframes gradientFade {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
