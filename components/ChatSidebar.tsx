'use client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSidebarProps {
  messages: Message[];
  onClearChat: () => void;
}

export default function ChatSidebar({ messages, onClearChat }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Company Branding */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">techticks SOLUTIONS</div>
          <div className="text-lg font-semibold text-gray-900 mb-2">TechTicks Solutions</div>
          <div className="text-sm text-purple-600 font-medium">Innovate Transform Succeed.</div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-center space-x-3">
          <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <span className="text-white text-sm">f</span>
          </a>
          <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
            <span className="text-white text-sm">📷</span>
          </a>
          <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
            <span className="text-white text-sm">🐦</span>
          </a>
          <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
            <span className="text-white text-sm">in</span>
          </a>
          <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <span className="text-white text-sm">▶</span>
          </a>
        </div>
      </div>

      {/* Video Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="bg-gray-200 rounded-lg w-full h-32 flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-lg">▶</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">TechTicksSolutions</p>
          <a href="#" className="text-purple-600 text-xs font-medium hover:underline">Expand Video</a>
        </div>
      </div>

      {/* Awards & Appreciations */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold text-purple-600 mb-4">Awards & Appreciations</h3>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-red-700 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-xs font-bold">⭐</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">MOST REVIEWED APP DEVELOPMENT COMPANIES PAKISTAN</h4>
            <div className="flex justify-center space-x-1">
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-xs font-bold">🏆</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900">TOP SOFTWARE DEVELOPMENT COMPANY</h4>
            <p className="text-xs text-gray-600 mt-1">GoodFirms</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <button 
            onClick={onClearChat}
            className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            🔄 Start new chat
          </button>
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            📋 Export chat
          </button>
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            ⭐ Save as favorite
          </button>
        </div>
      </div>
    </div>
  );
}
