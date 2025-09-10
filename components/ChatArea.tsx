'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
  readyMadeQuestions?: string[];
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

  const [suggestedQueries, setSuggestedQueries] = useState<string[]>([]);
  const [readyMadeQuestions, setReadyMadeQuestions] = useState<any>({});
  const [featuredQuestions, setFeaturedQuestions] = useState<string[]>([]);

  useEffect(() => {
    fetchSuggestedQuestions();
    fetchReadyMadeQuestions();
  }, []);

  const fetchSuggestedQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/faqs/suggestions');
      if (response.ok) {
        const data = await response.json();
        setSuggestedQueries(data.general_faqs?.slice(0, 3).map((faq: any) => faq.question) || [
          "What services does TechTicks provide?",
          "What industries does TechTicks specialize in?",
          "How can I contact TechTicks?"
        ]);
      }
    } catch (error) {
      console.error('Error fetching suggested questions:', error);
      setSuggestedQueries([
        "What services does TechTicks provide?",
        "What industries does TechTicks specialize in?",
        "How can I contact TechTicks?"
      ]);
    }
  };

  const fetchReadyMadeQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/chat/ready-made-questions');
      if (response.ok) {
        const data = await response.json();
        setReadyMadeQuestions(data.categories || {});
        setFeaturedQuestions(data.featured_questions || []);
      }
    } catch (error) {
      console.error('Error fetching ready-made questions:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header - Fixed */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Conversation With TechTicks GPT</h1>
            <p className="text-sm text-gray-500">28 Aug 2025</p>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Always-visible welcome + quick actions */}
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-lg px-4 py-3 bg-white border border-gray-200 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900">TechTicks Assistant</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Hey there! Welcome to TechTicks GPT — your AI-powered assistant by TechTicks Solutions. 
                      We're a premier software development firm empowering startups and SMEs since 2020. 
                      We build optimal and intelligent software solutions across AI development, web apps, 
                      mobile apps, DevOps, and more. How can we assist you today? Feel free to ask anything 
                      about our services, projects, or get started with the suggested questions below!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">AI Development</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      AI-powered solutions, machine learning, and intelligent automation for your business needs.
                    </p>
                    <button 
                      onClick={() => onSendMessage("Tell me about your AI development services")}
                      className="text-purple-600 text-xs font-medium hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🌐</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">Web & Mobile Apps</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Custom web applications, mobile apps, and cross-platform solutions for modern businesses.
                    </p>
                    <button 
                      onClick={() => onSendMessage("What web and mobile app development services do you offer?")}
                      className="text-purple-600 text-xs font-medium hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Questions */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Questions</h3>
              <div className="flex flex-wrap gap-2">
                {featuredQuestions.slice(0, 6).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(query)}
                    className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-gray-600">TechTicks Assistant</span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    </div>
                  )}
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className={`whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                      {message.content}
                    </p>
                  )}
                  
                  {/* Show related FAQs and suggested questions for assistant messages */}
                  {message.role === 'assistant' && message.relatedFaqs && message.relatedFaqs.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Related information:</p>
                      <div className="space-y-1">
                        {message.relatedFaqs.slice(0, 2).map((faq, faqIndex) => (
                          <div key={faqIndex} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            <strong>Q:</strong> {faq.question}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">You might also ask:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestedQuestions.slice(0, 3).map((question, qIndex) => (
                          <button
                            key={qIndex}
                            onClick={() => onSendMessage(question)}
                            className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {message.role === 'assistant' && message.readyMadeQuestions && message.readyMadeQuestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Topic quick questions:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.readyMadeQuestions.slice(0, 4).map((question, tIndex) => (
                          <button
                            key={tIndex}
                            onClick={() => onSendMessage(question)}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 ml-3 mt-1">
                    <span className="text-gray-600 font-bold text-sm">U</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold text-gray-600">TechTicks Assistant</span>
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                </div>
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
