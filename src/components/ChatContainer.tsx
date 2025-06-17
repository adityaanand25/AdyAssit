import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useChat } from '../hooks/useChat';
import { MessageSquare, Settings, Trash2 } from 'lucide-react';

interface ChatContainerProps {
  apiKey: string;
  onResetApiKey: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ apiKey, onResetApiKey }) => {
  const { messages, isLoading, sendMessage, clearChatHistory } = useChat(apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/6 left-1/12 w-3 h-3 bg-white/10 rounded-full float"></div>
        <div className="absolute top-1/4 right-1/12 w-4 h-4 bg-purple-300/20 rounded-full float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-pink-300/30 rounded-full float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-2/3 right-1/6 w-5 h-5 bg-cyan-300/15 rounded-full float" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/6 right-1/3 w-3 h-3 bg-white/20 rounded-full float" style={{ animationDelay: '2.2s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto h-screen flex flex-col relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-t-3xl shadow-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-12 transition-all duration-300">
                <MessageSquare size={24} className="text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">AdyAssist</h1>
                <p className="text-sm text-purple-200 flex items-center gap-2">
                  Your friendly AI assistant
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="API Key Loaded"></span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChatHistory}
                className="p-3 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/10"
                title="Clear Chat History"
              >
                <Trash2 size={24} />
              </button>
              <button
                onClick={onResetApiKey}
                className="p-3 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/10"
                title="Change API Key"
              >
                <Settings size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-black/10 backdrop-blur-sm overflow-y-auto p-6 border-x border-white/10 custom-scrollbar">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Message message={message} />
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-6 animate-fadeInUp">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <MessageSquare size={20} className="text-white drop-shadow-lg" />
                </div>
                <div className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-6 py-4 rounded-2xl shadow-2xl">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-b-3xl shadow-2xl p-6 border border-white/10">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};