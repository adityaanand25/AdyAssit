import { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { GeminiService } from '../services/gemini';
import { StorageService } from '../utils/storage';

export const useChat = (apiKey: string) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const geminiService = new GeminiService(apiKey);

  // Load chat history on hook initialization
  useEffect(() => {
    const savedMessages = StorageService.getChatHistory();
    if (savedMessages.length > 0) {
      setState(prev => ({
        ...prev,
        messages: savedMessages,
      }));
    } else {
      // Set default welcome message if no history exists
      const welcomeMessage: Message = {
        id: '1',
        content: 'Namaste! Main AdyAssist hun, aapka AI assistant. Aap mujhse Hindi, English, ya Hinglish mein baat kar sakte hain. Kya help chahiye?',
        isUser: false,
        timestamp: new Date(),
      };
      setState(prev => ({
        ...prev,
        messages: [welcomeMessage],
      }));
    }
  }, [apiKey]);

  // Save messages to storage whenever messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      StorageService.saveChatHistory(state.messages);
    }
  }, [state.messages]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await geminiService.generateResponse(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Kuch gadbad hui hai, please try again!',
        isUser: false,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, [apiKey]);

  const clearChatHistory = useCallback(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: 'Namaste! Main AdyAssist hun, aapka AI assistant. Aap mujhse Hindi, English, ya Hinglish mein baat kar sakte hain. Kya help chahiye?',
      isUser: false,
      timestamp: new Date(),
    };
    
    const clearNotification: Message = {
      id: '0',
      content: 'Chat history cleared! Aapka data safely delete ho gaya hai.',
      isUser: false,
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [clearNotification, welcomeMessage],
    }));
    
    StorageService.clearChatHistory();
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== '0'),
      }));
    }, 3000);
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChatHistory,
  };
};