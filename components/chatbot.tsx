"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, X, MinusCircle, Bot, Loader2, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import chatbotService, { type ChatMessage, type QuestionCategory } from '@/services/chatbot';

interface UIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([{
    id: '1',
    role: 'assistant',
    content: '¡Hola! Soy el asistente virtual de la Universidad Nacional de Ingeniería. ¿En qué puedo ayudarte?'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      chatbotService.getQuestions()
        .then(data => setCategories(data.categories))
        .catch(() => {});
    }
  }, [isOpen, categories.length]);

  const buildHistory = useCallback((): ChatMessage[] => {
    return messages
      .filter(m => m.id !== '1')
      .map(m => ({ role: m.role, content: m.content }));
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: UIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const history = buildHistory();
      const data = await chatbotService.sendMessage(text.trim(), history);

      const assistantMessage: UIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: UIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="group relative rounded-full w-16 h-16 bg-primary-dark hover:bg-primary text-white shadow-lg flex items-center justify-center"
        >
          <Bot className="h-8 w-8" />
        </Button>
      )}

      {isOpen && (
        <Card className={`w-80 sm:w-96 ${isMinimized ? 'h-14' : 'h-[550px]'} bg-white shadow-xl rounded-lg flex flex-col transition-all duration-300`}>
          <div className="p-3 bg-primary-dark text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border-2 border-white">
                <AvatarFallback className="bg-primary text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Asistente UNI</span>
                <span className="text-xs text-primary-lightest">
                  {isLoading ? 'Escribiendo...' : 'En línea'}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:text-primary-lightest hover:bg-white/10"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:text-primary-lightest hover:bg-white/10"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-7 w-7 mr-2 mt-1 flex-shrink-0 border border-gray-200">
                        <AvatarFallback className="bg-primary text-white">
                          <Bot className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-2.5 text-sm whitespace-pre-wrap ${
                        message.role === 'user'
                          ? 'bg-primary-dark text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <Avatar className="h-7 w-7 mr-2 mt-1 flex-shrink-0 border border-gray-200">
                      <AvatarFallback className="bg-primary text-white">
                        <Bot className="h-3.5 w-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-2.5 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Escribiendo...</span>
                    </div>
                  </div>
                )}

                {showSuggestions && categories.length > 0 && messages.length <= 1 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MessageSquare className="h-3 w-3" />
                      <span>Preguntas sugeridas</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.slice(0, 3).flatMap(cat =>
                        cat.questions.slice(0, 2).map(q => (
                          <button
                            key={q.id}
                            onClick={() => handleSuggestionClick(q.question)}
                            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-primary-dark hover:text-white hover:border-primary-dark transition-colors text-gray-700"
                          >
                            {q.icon} {q.question}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-primary-dark hover:bg-primary text-white disabled:opacity-50 h-9 w-9"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
