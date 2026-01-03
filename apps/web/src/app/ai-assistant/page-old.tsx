/**
 * AI Assistant Page
 * Interactive AI chat interface for business insights
 * 
 * AI Asistan Sayfası
 * İş içgörüleri için interaktif AI sohbet arayüzü
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ProtectedRoute } from '../../components/protected-route';
import { Bot, Send, Loader2, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  interactionId?: string;
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

  // Auto scroll to bottom
  // Otomatik en alta kaydır
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
        context: {
          module: 'general',
        },
        userInput: input,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        interactionId: response.data.interactionId,
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

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleFeedback = async (interactionId: string, positive: boolean) => {
    try {
      await apiClient.post('/ai-assistant/feedback', {
        interactionId,
        feedback: {
          accepted: positive,
          rating: positive ? 5 : 1,
        },
      });
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  const quickPrompts = [
    'Tüm mağazalarımın performansını özetle',
    'Süresi dolmak üzere olan sözleşmeleri listele',
    'En yüksek kira/ciro oranına sahip mağazalar hangileri?',
    'Ankara\'daki mağazalarımızın analizi',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Bot className="w-8 h-8 text-primary-500" />
                AI Asistan
              </h1>
              <p className="text-gray-600 mt-1">
                Yapay zeka destekli karar desteği ve analiz
              </p>
            </div>
            <Link href="/dashboard" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-medium text-gray-600">AI Asistan</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Feedback Buttons */}
                  {message.role === 'assistant' && message.interactionId && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleFeedback(message.interactionId!, true)}
                        className="p-1 rounded hover:bg-gray-200 transition"
                        title="Yararlı"
                      >
                        <ThumbsUp className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.interactionId!, false)}
                        className="p-1 rounded hover:bg-gray-200 transition"
                        title="Yararlı değil"
                      >
                        <ThumbsDown className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(message.content)}
                        className="p-1 rounded hover:bg-gray-200 transition ml-2"
                        title="Kopyala"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
                  <span className="text-gray-600">AI düşünüyor...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Hızlı Sorular:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Sorunuzu yazın..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>Gönder</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              AI asistan beta aşamasındadır. Üretilen içerikleri doğrulayın.
            </p>
          </div>
        </div>
      </div>
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








