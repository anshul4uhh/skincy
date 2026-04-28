import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Safe markdown renderer with error handling
function SafeMarkdownRenderer({ content }: { content: string }) {
  try {
    return (
      <div className="markdown-render">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    );
  } catch (error) {
    console.error("Markdown rendering error:", error);
    // Fallback to plain text if markdown fails
    return <div className="text-gray-900 whitespace-pre-wrap">{content}</div>;
  }
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: Date;
}

interface ChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8000";
const CHAT_ENDPOINT = `${API_BASE_URL}/chat/query`;

export function Chatbot({ isOpen = true, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "✨ Hi there! I'm **SkinSaathi**, your AI Skin Health Companion. Whether you have questions about skincare routines, skin conditions, sun protection, dermatology insights, or anything skin-related—I'm here to help! Type something and let's chat about keeping your skin healthy and radiant. 💫",
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Prepare chat history for context
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call backend API
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          chat_history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to get response";
      setError(errorMsg);

      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: `⚠️ Sorry, I couldn't process your question: ${errorMsg}. Please try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "✨ Hi there! I'm **SkinSaathi**, your AI Skin Health Companion. Whether you have questions about skincare routines, skin conditions, sun protection, dermatology insights, or anything skin-related—I'm here to help! Type something and let's chat about keeping your skin healthy and radiant. 💫",
        sources: [],
        timestamp: new Date(),
      },
    ]);
    setInput("");
    setError(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-5" />
          <h3 className="font-bold text-lg">SkinSaathi - AI Skin Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none border-l-4 border-blue-500"
              }`}
            >
              <div className="text-sm leading-relaxed markdown-content">
                {message.role === "assistant" ? (
                  <SafeMarkdownRenderer content={message.content} />
                ) : (
                  message.content
                )}
              </div>

              {/* Sources */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-xs font-semibold text-gray-700 mb-2">📚 Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((source, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-white text-blue-600 text-xs px-2 py-1 rounded-full border border-blue-200"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl rounded-bl-none px-4 py-3 flex gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Clear Chat Button */}
      {messages.length > 1 && (
        <div className="px-4 py-2 border-t border-gray-200 text-center">
          <button
            onClick={clearChat}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear conversation
          </button>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skin cancer, prevention..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-sm disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
