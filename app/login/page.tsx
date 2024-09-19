"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bg from '../background/blueBackGround.jpg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const mockUser = {
    username: 'admin',
    password: 'password123',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === mockUser.username && password === mockUser.password) {
        localStorage.setItem('loggedIn', 'true');
        router.push('/dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-backgroundMovement"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-500 opacity-80 z-10"></div>

      {/* Login Form Box */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full z-20 flex flex-col items-center text-center transform transition-all duration-700 ease-out hover:scale-105">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-wide animate-fade-in">
          Welcome Everyone
        </h2>

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 animate-pulse rounded-lg w-full"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow shadow-sm hover:shadow-lg"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow shadow-sm hover:shadow-lg"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg font-semibold text-lg transition-transform transform hover:scale-110 focus:ring-4 focus:ring-purple-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8l5 5a8 8 0 01-13 3z"
                  ></path>
                </svg>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* <p className="text-gray-500 mt-4 hover:text-gray-700 transition-all duration-300 cursor-pointer">
          Forgot password?
        </p> */}
      </div>

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        .animate-backgroundMovement {
          animation: moveBackground 10s ease-in-out infinite;
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
          animation: fadeIn 2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
