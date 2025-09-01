'use client';

import { useState } from 'react';

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

interface DataSidebarProps {
  projects: Project[];
  clients: Client[];
  faqs: FAQ[];
  onAddProject: (data: { name: string; description: string }) => Promise<boolean>;
  onAddClient: (data: { name: string; logo_url: string }) => Promise<boolean>;
  onAddFaq: (data: { question: string; answer: string }) => Promise<boolean>;
}

export default function DataSidebar({ projects, clients, faqs, onAddProject, onAddClient, onAddFaq }: DataSidebarProps) {
  const [activeTab, setActiveTab] = useState('projects');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [clientForm, setClientForm] = useState({ name: '', logo_url: '' });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim() || !projectForm.description.trim()) return;

    setIsSubmitting(true);
    const success = await onAddProject(projectForm);
    if (success) {
      setProjectForm({ name: '', description: '' });
    }
    setIsSubmitting(false);
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name.trim() || !clientForm.logo_url.trim()) return;

    setIsSubmitting(true);
    const success = await onAddClient(clientForm);
    if (success) {
      setClientForm({ name: '', logo_url: '' });
    }
    setIsSubmitting(false);
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    setIsSubmitting(true);
    const success = await onAddFaq(faqForm);
    if (success) {
      setFaqForm({ question: '', answer: '' });
    }
    setIsSubmitting(false);
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
            <div className="space-y-4">
              {/* Add Project Form */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Add New Project</h3>
                <form onSubmit={handleProjectSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project description"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !projectForm.name.trim() || !projectForm.description.trim()}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Project'}
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Recent Projects</h4>
                {projects.length === 0 ? (
                  <p className="text-sm text-gray-500">No projects added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-sm">{project.name}</h5>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-4">
              {/* Add Client Form */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Add New Client</h3>
                <form onSubmit={handleClientSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter client name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={clientForm.logo_url}
                      onChange={(e) => setClientForm({ ...clientForm, logo_url: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter logo URL"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !clientForm.name.trim() || !clientForm.logo_url.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Client'}
                  </button>
                </form>
              </div>

              {/* Clients List */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Our Clients</h4>
                {clients.length === 0 ? (
                  <p className="text-sm text-gray-500">No clients added yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {clients.map((client) => (
                      <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs">🏢</span>
                        </div>
                        <p className="text-xs font-medium text-gray-900">{client.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              {/* Add FAQ Form */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">Add New FAQ</h3>
                <form onSubmit={handleFaqSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter question"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter answer"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !faqForm.question.trim() || !faqForm.answer.trim()}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Adding...' : 'Add FAQ'}
                  </button>
                </form>
              </div>

              {/* FAQs List */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Frequently Asked Questions</h4>
                {faqs.length === 0 ? (
                  <p className="text-sm text-gray-500">No FAQs added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-sm mb-1">{faq.question}</h5>
                        <p className="text-xs text-gray-500">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
