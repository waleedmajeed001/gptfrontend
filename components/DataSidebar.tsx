'use client';

export default function DataSidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Header with Login/New buttons */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2 mb-4">
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            🔐 Login
          </button>
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            ✨ New
          </button>
        </div>
      </div>

      {/* Top Projects Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Top Projects */}
          <div>
            <h2 className="text-lg font-semibold text-purple-600 mb-4">Top Projects</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🏥</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Powered Smart Hospital Management System</h3>
                    <p className="text-xs text-gray-600">An AI-based HIMS that automates hospital tasks, boosts patient care, and improves operational efficiency.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">👨‍⚕️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Virtual Diagnostic Assistant (GP-POD)</h3>
                    <p className="text-xs text-gray-600">GP-POD is an AI general physician that automates diagnostics and provides medical support.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Islamic Information Knowledge</h3>
                    <p className="text-xs text-gray-600">AI chatbot offering Islamic knowledge and guidance with accurate religious information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div>
            <h2 className="text-lg font-semibold text-purple-600 mb-4">Our Top Clients</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">🏛️</span>
                </div>
                <p className="text-xs font-medium text-gray-900">Government of Punjab</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">⛽</span>
                </div>
                <p className="text-xs font-medium text-gray-900">OGDCL</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">🏦</span>
                </div>
                <p className="text-xs font-medium text-gray-900">The Bank of Punjab</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">💼</span>
                </div>
                <p className="text-xs font-medium text-gray-900">Jinnalyst</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">🚀</span>
                </div>
                <p className="text-xs font-medium text-gray-900">Awfera Innovations</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
                <p className="text-xs font-medium text-gray-900">RMI Beta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
