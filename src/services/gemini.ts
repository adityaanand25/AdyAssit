interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are AdyAssist, a helpful AI assistant who responds in Hinglish (a mix of Hindi and English). Use common Hindi words mixed with English in a natural way that Indians commonly speak. Keep responses conversational and friendly. User's message: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Response Error:', errorData);
        
        if (response.status === 400) {
          throw new Error('Invalid API key ya request format galat hai. Please check your API key!');
        } else if (response.status === 403) {
          throw new Error('API key ka access denied hai. Please check permissions!');
        } else if (response.status === 404) {
          throw new Error('API endpoint not found. Model might be unavailable!');
        } else {
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from AI. Please try again!');
      }
      
      const responseText = data.candidates[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error('Empty response from AI. Please try again!');
      }
      
      return responseText;
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Sorry yaar, API call fail ho gaya. Please check your internet connection!');
    }
  }
}