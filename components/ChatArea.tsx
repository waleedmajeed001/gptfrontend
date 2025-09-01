'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatArea({ messages, onSendMessage, isLoading }: ChatAreaProps) {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const suggestedQueries = [
    "What services does your company provide?",
    "What industries does your company specialize in?",
    "How do you handle bug fixing and software maintenance post-launch?"
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header - Fixed */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Conversation With TechTicks GPT</h1>
            <p className="text-sm text-gray-500">28 Aug 2025</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            ? Post Query
          </button>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-6">
              {/* Welcome Message */}
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-lg px-4 py-3 bg-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        Hey there! Welcome to TechTicks GPT — your AI-powered assistant by TechTicks Solutions. 
                        We're an emerging AI service provider dedicated to helping businesses stay ahead with smart, 
                        cutting-edge solutions. How can we assist you today? Feel free to ask anything, or select 
                        any agent below to get started!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Selection Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🏥</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">AI Healthcare</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        You are AI Healthcare a virtual sales expert trained on the full suite of healthcare solutions...
                      </p>
                      <a href="#" className="text-purple-600 text-xs font-medium hover:underline">Explore More</a>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">⚖️</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">Law & Legal Tech</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        You are AI LegalTech — a virtual expert on TechTicks Solutions' law and legal...
                      </p>
                      <a href="#" className="text-purple-600 text-xs font-medium hover:underline">Explore More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Queries */}
              <div className="flex flex-wrap gap-2 mt-6">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(query)}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed */}
      <div className="bg-white border-t border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ▶
          </button>
        </form>
      </div>
    </div>
  );
}
