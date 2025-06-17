import React from 'react';
import { Message as MessageType } from '../types/chat';
import { User, Bot } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };



  return (
    <div className={`flex gap-4 mb-8 ${message.isUser ? 'justify-end' : 'justify-start'} group`}>
      {!message.isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-300">
          <Bot size={20} className="text-white drop-shadow-lg" />
        </div>
      )}
      
      <div className={`max-w-[75%] ${message.isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-6 py-4 rounded-3xl transform hover:scale-105 transition-all duration-300 ${
            message.isUser
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white ml-auto shadow-2xl shadow-purple-500/30'
              : 'bg-white/10 backdrop-blur-xl text-white border border-white/20 shadow-2xl hover:bg-white/20'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`text-xs text-purple-200 mt-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {message.isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center order-2 shadow-xl transform group-hover:rotate-12 transition-all duration-300">
          <User size={20} className="text-white drop-shadow-lg" />
        </div>
      )}
    </div>
  );
};