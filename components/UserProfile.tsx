'use client';

import { useState } from 'react';

interface UserProfileProps {
  user: {
    id: number;
    username: string;
    email: string;
    is_guest: boolean;
    created_at: string;
  };
  onLogout: () => void;
  onNewChat: () => void;
}

export default function UserProfile({ user, onLogout, onNewChat }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.is_guest ? 'G' : user.username.charAt(0).toUpperCase()}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {user.is_guest ? 'Guest User' : user.username}
          </div>
          <div className="text-xs text-gray-500">
            {user.is_guest ? 'Temporary Session' : user.email}
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {user.is_guest ? 'G' : user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {user.is_guest ? 'Guest User' : user.username}
                </div>
                <div className="text-sm text-gray-500">
                  {user.is_guest ? 'Temporary Session' : user.email}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                onNewChat();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Chat</span>
            </button>

            {!user.is_guest && (
              <button
                onClick={() => {
                  // TODO: Implement chat history
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Chat History</span>
              </button>
            )}

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
