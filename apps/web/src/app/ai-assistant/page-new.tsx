/**
 * AI Assistant Page
 * Premium Glassmorphism AI Chat Interface
 * 
 * AI Asistan Sayfası
 * Premium Glassmorphism AI Sohbet Arayüzü
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { GlassCard } from '../../components/ui/glass-card';
import { GlassButton } from '../../components/ui/glass-button';
import { GlassInput } from '../../components/ui/glass-input';
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
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-glass bg-gradient-to-br from-accent-cyan to-accent-teal mb-4 shadow-glow-accent animate-float">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-glass-text mb-2">AI Asistan</h1>
            <p className="text-glass-textMuted">
              Akıllı yardımcınız ile iş süreçlerinizi optimize edin
            </p>
          </div>

          {/* Chat Container */}
          <GlassCard className="mb-4 h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-glass flex items-center justify-center flex-shrink-0 ${
                        message.role === 'assistant' 
                          ? 'bg-gradient-to-br from-accent-cyan to-accent-teal shadow-glow-cyan' 
                          : 'glass-medium'
                      }`}>
                        {message.role === 'assistant' ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-semibold text-glass-text">U</span>
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`p-4 rounded-glass ${
                        message.role === 'assistant' 
                          ? 'glass-medium glass-border-accent' 
                          : 'glass-light'
                      }`}>
                        <p className="text-sm text-glass-text whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className="text-xs text-glass-textSubtle mt-2">
                          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-10 h-10 rounded-glass bg-gradient-to-br from-accent-cyan to-accent-teal flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="p-4 glass-medium rounded-glass">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-glass-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-3 glass-light border border-glass-border rounded-glass text-glass-text placeholder-glass-textMuted focus:glass-medium focus:border-accent-cyan focus:outline-none transition-smooth"
                  disabled={isLoading}
                />
                <GlassButton
                  variant="primary"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  icon={<Send className="w-5 h-5" />}
                >
                  Gönder
                </GlassButton>
              </div>
            </div>
          </GlassCard>

          {/* Quick Prompts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickPrompts.map((prompt, index) => (
              <GlassCard
                key={index}
                hover
                className="p-4 cursor-pointer"
                onClick={() => setInput(prompt.text)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-glass glass-light flex items-center justify-center">
                    <prompt.icon className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <p className="text-xs text-glass-textMuted">{prompt.text}</p>
                </div>
              </GlassCard>
            ))}
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
