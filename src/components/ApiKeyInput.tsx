import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsSubmitting(true);
      // Add a small delay to show the saving feedback
      setTimeout(() => {
        onApiKeySubmit(apiKey.trim());
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/2 left-1/5 w-4 h-4 bg-white/20 rounded-full float"></div>
        <div className="absolute top-1/3 right-1/5 w-6 h-6 bg-purple-300/30 rounded-full float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-pink-300/40 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-cyan-300/25 rounded-full float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/10 relative z-10 transform hover:scale-105 transition-all duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:rotate-12 transition-all duration-300">
            <Key size={40} className="text-white drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">AdyAssist</h1>
          <p className="text-purple-200 text-sm">Enter your Gemini API key to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="w-full px-6 py-4 pr-12 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 transition-all duration-300 hover:bg-white/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white transition-colors duration-200 hover:scale-110"
            >
              {showKey ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white py-4 rounded-2xl font-medium hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-purple-500/25 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <CheckCircle size={20} />
                  Saving...
                </>
              ) : (
                'Start Chatting'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="mt-6 p-6 bg-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-xl">
          <p className="text-sm text-purple-100">
            <strong className="text-purple-200">How to get API key:</strong><br />
            1. Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline hover:no-underline transition-colors duration-200">Google AI Studio</a><br />
            2. Create a new API key<br />
            3. Copy and paste it here
          </p>
        </div>
      </div>
    </div>
  );
};