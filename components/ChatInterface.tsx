'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatArea from './ChatArea';
import DataSidebar from './DataSidebar';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversation_history: messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = { role: 'assistant' as const, content: data.response };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage = { role: 'assistant' as const, content: 'Sorry, I encountered an error. Please try again.' };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { role: 'assistant' as const, content: 'Sorry, I cannot connect to the server. Please check your connection.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Top Projects & Clients */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <DataSidebar />
      </div>

      {/* Center Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatArea 
          messages={messages} 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>

      {/* Right Sidebar - Company Info & Awards */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <ChatSidebar 
          messages={messages}
          onClearChat={() => setMessages([])}
        />
      </div>
    </div>
  );
}
