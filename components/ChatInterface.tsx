'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatArea from './ChatArea';
import DataSidebar from './DataSidebar';
// import QuestionsSidebar from './QuestionsSidebar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  relatedFaqs?: Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
  }>;
  suggestedQuestions?: string[];
  confidenceScore?: number;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
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
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: data.response,
          relatedFaqs: data.related_faqs,
          suggestedQuestions: data.suggested_questions,
          confidenceScore: data.confidence_score
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I cannot connect to the server. Please check your connection.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Questions (removed) */}

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
