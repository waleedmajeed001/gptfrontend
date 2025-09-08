'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  keywords: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  industry: string;
  client_name: string;
  project_url: string;
  image_url: string;
  metrics: string;
  case_study_url: string;
}

interface Client {
  id: number;
  name: string;
  logo_url: string;
  industry: string;
  website: string;
  testimonial: string;
  testimonial_author: string;
  testimonial_position: string;
}

export default function DataSidebar() {
  const [activeTab, setActiveTab] = useState('projects');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general', keywords: '' });
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  useEffect(() => {
    fetchFaqs();
    fetchProjects();
    fetchClients();
  }, []);

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

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/faqs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaq),
      });
      if (response.ok) {
        setNewFaq({ question: '', answer: '', category: 'general', keywords: '' });
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleUpdateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/faqs/${editingFaq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });
      if (response.ok) {
        setEditingFaq(null);
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleDeleteFaq = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/faqs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Login/New buttons - Fixed */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex space-x-2">
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            🔐 Login
          </button>
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            ✨ New
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'projects'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'clients'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Clients
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'faqs'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {activeTab === 'projects' && (
            <>
              {/* Top Projects */}
              <div>
                <h2 className="text-lg font-semibold text-purple-600 mb-4">Our Case Studies</h2>
                <div className="space-y-4">
                  {projects.map((project) => {
                    const metrics = project.metrics ? JSON.parse(project.metrics) : {};
                    return (
                      <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🚀</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
                            <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                {project.industry}
                              </span>
                              {metrics.conversion_increase && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                  {metrics.conversion_increase} ↑
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              <strong>Tech:</strong> {project.technologies}
                            </div>
                            {project.project_url && (
                              <a 
                                href={project.project_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 text-xs hover:underline mt-1 inline-block"
                              >
                                View Project →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Clients */}
              <div>
                <h2 className="text-lg font-semibold text-purple-600 mb-4">Our Clients</h2>
                <div className="grid grid-cols-2 gap-3">
                  {clients.map((client) => (
                    <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.industry}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'clients' && (
            <div>
              <h2 className="text-lg font-semibold text-purple-600 mb-4">Client Testimonials</h2>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{client.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{client.testimonial_position}</p>
                        <p className="text-xs text-gray-700 italic mb-2">"{client.testimonial}"</p>
                        <div className="flex items-center space-x-2">
                          <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {client.industry}
                          </span>
                          {client.website && (
                            <a 
                              href={client.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-600 text-xs hover:underline"
                            >
                              Visit Website →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div>
              <h2 className="text-lg font-semibold text-purple-600 mb-4">FAQ Management</h2>
              
              {/* Add New FAQ Form */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-purple-900 mb-3">Add New FAQ</h3>
                <form onSubmit={handleAddFaq} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter question"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <textarea
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter answer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newFaq.category}
                      onChange={(e) => setNewFaq({...newFaq, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="general">General</option>
                      <option value="services">Services</option>
                      <option value="pricing">Pricing</option>
                      <option value="technology">Technology</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={newFaq.keywords}
                      onChange={(e) => setNewFaq({...newFaq, keywords: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., services, development, AI, pricing"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors"
                  >
                    Add FAQ
                  </button>
                </form>
              </div>

              {/* Existing FAQs */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 text-sm">Existing FAQs</h3>
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{faq.question}</h4>
                        <p className="text-xs text-gray-600 mb-2">{faq.answer}</p>
                        <div className="flex items-center space-x-2">
                          <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                          {faq.keywords && (
                            <span className="text-xs text-gray-500">Keywords: {faq.keywords}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => setEditingFaq(faq)}
                          className="text-blue-600 hover:text-blue-700 text-xs"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
