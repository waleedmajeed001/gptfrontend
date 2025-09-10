'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatInterface from '../components/ChatInterface';
import AuthModal from '../components/AuthModal';
import UserProfile from '../components/UserProfile';

export default function Home() {
  const { user, isAuthenticated, isLoading, login, guestMode, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              TechTicks GPT
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your intelligent assistant for all things TechTicks
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign In / Sign Up
            </button>

            <button
              onClick={async () => {
                try {
                  const response = await fetch('http://localhost:8000/api/auth/guest', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  
                  if (response.ok) {
                    const data = await response.json();
                    guestMode(data.session_id, data.user_id);
                  }
                } catch (error) {
                  console.error('Failed to create guest session:', error);
                }
              }}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Continue as Guest
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Guest mode allows you to try TechTicks GPT without creating an account.</p>
            <p className="mt-1">Your chat history will not be saved.</p>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={login}
          onGuestMode={guestMode}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">TechTicks GPT</h1>
            {user?.is_guest && (
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Guest Mode
              </span>
            )}
          </div>
          <UserProfile
            user={user!}
            onLogout={logout}
            onNewChat={() => {
              // TODO: Implement new chat functionality
              console.log('New chat clicked');
            }}
          />
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
