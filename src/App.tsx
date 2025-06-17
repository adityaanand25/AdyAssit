import { useState, useEffect } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ChatContainer } from './components/ChatContainer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { StorageService } from './utils/storage';

function App() {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    // Load API key from storage on app start
    const savedApiKey = StorageService.getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    StorageService.saveApiKey(key);
  };

  const handleResetApiKey = () => {
    setApiKey('');
    StorageService.removeApiKey();
  };

  if (!apiKey) {
    return (
      <>
        <PWAInstallPrompt />
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      </>
    );
  }

  return (
    <>
      <PWAInstallPrompt />
      <ChatContainer apiKey={apiKey} onResetApiKey={handleResetApiKey} />
    </>
  );
}

export default App;