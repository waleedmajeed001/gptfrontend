'use client';

import Image from 'next/image';

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
    <div className="flex flex-col h-full bg-white">
      {/* Single Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Company Branding Section */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl font-bold text-purple-600">xeven</span>
              <span className="text-lg font-bold text-green-600 ml-1">SOLUTIONS</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">Xeven Solutions</div>
            <div className="text-xs text-gray-600 mb-4">Innovate Transform Succeed.</div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-2">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white text-xs font-bold">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="text-white text-xs">📷</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-white text-xs">🐦</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                <span className="text-white text-xs font-bold">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <span className="text-white text-xs">▶</span>
              </a>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="bg-gray-200 rounded-lg w-full h-32 flex items-center justify-center mb-2 relative">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
              <div className="absolute top-2 left-2 flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span className="text-xs font-medium text-gray-700">XevenSolutions</span>
              </div>
            </div>
            <a href="#" className="text-purple-600 text-xs font-medium hover:underline flex items-center">
              <span className="mr-1">↗</span>
              Expand Video
            </a>
          </div>

          {/* Awards & Appreciations Section */}
          <div>
            <h3 className="text-sm font-semibold text-purple-600 mb-3">Awards & Appreciations</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Row 1 */}
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 1"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 2"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 3"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 4"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 5"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 6"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 7"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 8"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 9"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded p-3 text-center relative">
                <div className="w-16 h-16 mx-auto">
                  <Image
                    src="/award.png"
                    alt="Award 10"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
