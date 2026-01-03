/**
 * AI Assistant Page
 * AI Chat Interface
 * 
 * AI Asistan Sayfası
 * AI Sohbet Arayüzü
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { Bot, Send, Sparkles, Zap, FileText, TrendingUp, MapPin } from 'lucide-react';
import apiClient from '../../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function AIAssistantContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Merhaba! Ben BASIS AI Asistanınızım. Size kira sözleşmeleri, lokasyon analizi ve optimizasyon konularında yardımcı olabilirim. Nasıl yardımcı olabilirim?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/ai-assistant/execute', {
        promptId: 'PROMPT-GENERAL',
        context: { module: 'general' },
        userInput: input,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { text: 'Aktif sözleşmelerimi analiz et', icon: FileText },
    { text: 'En karlı lokasyonları göster', icon: MapPin },
    { text: 'Performans trendlerini özetle', icon: TrendingUp },
    { text: 'Optimizasyon önerileri ver', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-4 shadow-xl animate-float">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white text-shadow mb-2">
              AI Asistan
            </h1>
            <p className="text-white/70">
              Akıllı yardımcınız ile iş süreçlerinizi optimize edin
            </p>
          </div>

          {/* Chat Container */}
          <div className="glass-strong rounded-3xl p-6 h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.role === 'assistant' 
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500' 
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        {message.role === 'assistant' ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-gray-700 dark:text-gray-200 font-semibold">
                            {message.role === 'user' ? 'S' : ''}
                          </span>
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`p-4 rounded-2xl ${
                        message.role === 'assistant' 
                          ? 'glass'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`}>
                        <p className="text-sm text-white">{message.content}</p>
                        <p className="text-xs mt-2 text-white/50">
                          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 glass rounded-full text-white placeholder-white/40 focus-glass transition-smooth"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="btn-glass !bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gönder
                </button>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickPrompts.map((prompt, index) => (
              <div
                key={index}
                className="glass-card p-4 cursor-pointer group"
                onClick={() => setInput(prompt.text)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <prompt.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors">{prompt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <ProtectedRoute>
      <AIAssistantContent />
    </ProtectedRoute>
  );
}
