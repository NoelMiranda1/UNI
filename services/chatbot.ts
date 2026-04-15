import api from './api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatbotResponse {
  response: string;
  provider: 'ollama' | 'gemini' | 'openai' | 'cache' | 'fallback' | 'none';
  tokensUsed?: number;
  sources: { collection: string; id: string; title: string }[];
  fromCache: boolean;
}

export interface SuggestedQuestion {
  id: string;
  question: string;
  category: string;
  icon: string;
}

export interface QuestionCategory {
  name: string;
  icon: string;
  questions: SuggestedQuestion[];
}

export interface QuestionsResponse {
  total: number;
  categories: QuestionCategory[];
}

class ChatbotService {
  async sendMessage(pregunta: string, history?: ChatMessage[]): Promise<ChatbotResponse> {
    const body: { pregunta: string; history?: ChatMessage[] } = { pregunta };
    if (history && history.length > 0) {
      body.history = history.slice(-10);
    }
    const response = await api.post<ChatbotResponse>('/chatbot', body);
    return response.data;
  }

  async getQuestions(): Promise<QuestionsResponse> {
    const response = await api.get<QuestionsResponse>('/chatbot/questions');
    return response.data;
  }
}

export default new ChatbotService();
