'use client';

import { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatArea from './ChatArea';
import DataSidebar from './DataSidebar';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Client {
  id: number;
  name: string;
  logo_url: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchFaqs();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/projects/');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/clients/');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/faqs/');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

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
          message: message
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

  const addProject = async (projectData: { name: string; description: string }) => {
    try {
      const response = await fetch('http://localhost:8000/api/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects(); // Refresh the projects list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding project:', error);
      return false;
    }
  };

  const addClient = async (clientData: { name: string; logo_url: string }) => {
    try {
      const response = await fetch('http://localhost:8000/api/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        await fetchClients(); // Refresh the clients list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding client:', error);
      return false;
    }
  };

  const addFaq = async (faqData: { question: string; answer: string }) => {
    try {
      const response = await fetch('http://localhost:8000/api/faqs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        await fetchFaqs(); // Refresh the FAQs list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding FAQ:', error);
      return false;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Data Input */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <DataSidebar 
          projects={projects}
          clients={clients}
          faqs={faqs}
          onAddProject={addProject}
          onAddClient={addClient}
          onAddFaq={addFaq}
        />
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
