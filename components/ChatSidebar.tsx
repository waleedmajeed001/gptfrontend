'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ChatSidebarProps {
  messages: Array<{role: string, content: string}>;
  onClearChat: () => void;
}

interface CompanyInfo {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  website: string;
  linkedin: string;
  upwork: string;
  phone: string;
  email: string;
  address: string;
  founded_year: number;
  total_projects: number;
  total_clients: number;
  total_countries: number;
}

export default function ChatSidebar({ messages, onClearChat }: ChatSidebarProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/clients/company');
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo(data);
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Single Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Company Branding */}
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              {companyInfo?.company_name || 'TECHTICKS'}
            </h1>
            <h2 className="text-lg font-semibold text-gray-800 mt-1">TechTicks Solutions</h2>
            <p className="text-sm text-gray-600 mt-1">
              {companyInfo?.tagline || 'WE BUILD THE FUTURE OPTIMAL AND INTELLIGENT SOFTWARE SOLUTIONS'}
            </p>
          </div>

          {/* Company Stats */}
          {companyInfo && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3 text-center">Our Impact</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-600">{companyInfo.total_projects}+</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{companyInfo.total_clients}+</div>
                  <div className="text-xs text-gray-600">Clients</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{companyInfo.total_countries}+</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          )}

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4">
            <a href={companyInfo?.website || "https://techticks.io/"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                🌐
              </div>
            </a>
            <a href={companyInfo?.linkedin || "https://www.linkedin.com/company/102528746/"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                💼
              </div>
            </a>
            <a href={companyInfo?.upwork || "https://www.upwork.com/agencies/techticks/"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                ⚡
              </div>
            </a>
          </div>

          {/* Contact Information */}
          {companyInfo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3 text-center">Contact Us</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>{companyInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>{companyInfo.email}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>📍</span>
                  <span>{companyInfo.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Video Section */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-2xl">▶️</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-2">XevenSolutions</h3>
            <a href="#" className="text-purple-600 text-xs font-medium hover:underline flex items-center justify-center">
              Expand Video <span className="ml-1">→</span>
            </a>
          </div>

          {/* Awards & Appreciations */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3 text-center">Awards & Appreciations</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Award 1 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 1" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 2 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 2" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 3 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 3" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 4 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 4" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 5 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 5" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 6 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 6" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 7 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 7" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 8 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 8" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 9 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 9" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Award 10 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto">
                  <Image 
                    src="/award.png" 
                    alt="Award 10" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Actions */}
          {messages.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={onClearChat}
                className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                🗑️ Clear Chat History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
