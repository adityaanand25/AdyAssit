import React, { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:bg-white/20 transition-all duration-300">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message in Hindi, English, ya Hinglish..."
            className="w-full resize-none border-0 outline-none bg-transparent text-white placeholder-purple-200 text-sm max-h-32 min-h-[3rem] leading-relaxed"
            rows={1}
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transform hover:scale-110 hover:shadow-purple-500/25 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          {isLoading ? (
            <Loader2 size={20} className="animate-spin relative z-10" />
          ) : (
            <Send size={20} className="relative z-10" />
          )}
        </button>
      </div>
    </div>
  );
};