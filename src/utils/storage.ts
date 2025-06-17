import { Message } from '../types/chat';

export class StorageService {
  private static readonly API_KEY_STORAGE_KEY = 'adyassist_api_key';
  private static readonly CHAT_HISTORY_STORAGE_KEY = 'adyassist_chat_history';

  // API Key storage methods
  static saveApiKey(apiKey: string): void {
    try {
      localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  }

  static getApiKey(): string | null {
    try {
      return localStorage.getItem(this.API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to get API key:', error);
      return null;
    }
  }

  static removeApiKey(): void {
    try {
      localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove API key:', error);
    }
  }

  // Chat history storage methods
  static saveChatHistory(messages: Message[]): void {
    try {
      const serializedMessages = messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }));
      localStorage.setItem(this.CHAT_HISTORY_STORAGE_KEY, JSON.stringify(serializedMessages));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  static getChatHistory(): Message[] {
    try {
      const stored = localStorage.getItem(this.CHAT_HISTORY_STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Failed to get chat history:', error);
      return [];
    }
  }

  static clearChatHistory(): void {
    try {
      localStorage.removeItem(this.CHAT_HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  }

  static clearAllData(): void {
    this.removeApiKey();
    this.clearChatHistory();
  }
}
