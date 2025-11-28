import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { CEOVA_LOGO_URL, MEETING_URL } from '../constants';

const ChatWidget: React.FC = () => {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    isLoading: false,
  });
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.isLoading, state.isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // Initial Greeting if empty
    if (state.isOpen && state.messages.length === 0) {
       addBotMessage("Hey! 👋 I'm Ceova. Need a creative business idea, a website, or just want to chat?");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'model',
      text,
      timestamp: new Date(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: false,
    }));
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
    }));

    // Call API
    try {
      const response = await sendMessageToGemini(userText);
      addBotMessage(response);
    } catch (error) {
      console.error(error);
      addBotMessage("Whoops! Connection glitch. Try again?");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleChat = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {state.isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[500px] sm:h-[600px] bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 animate-slide-in border border-gray-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={CEOVA_LOGO_URL} alt="Ceova Logo" className="w-10 h-10 rounded-full border-2 border-white bg-white object-contain" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Ceova</h3>
                <p className="text-blue-100 text-xs">BuildMyCEO Assistant</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-hide space-y-2">
            {/* Disclaimer Banner */}
            <div className="text-[10px] text-center text-gray-400 mb-4 uppercase tracking-wider">
              Powered by Gemini • Harshit & Tushar
            </div>

            {state.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {state.isLoading && (
              <div className="flex justify-start animate-pulse">
                 <img src={CEOVA_LOGO_URL} className="w-6 h-6 rounded-full mr-2 opacity-70" alt="thinking" />
                 <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sticky CTA */}
          <a 
            href={MEETING_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-yellow-100 text-yellow-800 text-xs text-center py-2 font-semibold hover:bg-yellow-200 border-t border-yellow-200 transition-colors"
          >
            🔥 Book a strategy call for just ₹9!
          </a>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Ask about ideas, prices, websites..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || state.isLoading}
                className={`ml-2 p-2 rounded-full transition-all duration-200 ${
                  inputValue.trim() 
                    ? 'bg-blue-600 text-white shadow-md hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-1">
               <span className="text-[9px] text-gray-400">Ceova can make mistakes. Check details with Sales.</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!state.isOpen && (
        <button
          onClick={toggleChat}
          className="group flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 relative"
          aria-label="Open Chat"
        >
          <img 
             src={CEOVA_LOGO_URL} 
             alt="Ceova" 
             className="w-10 h-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform duration-300"
          />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white justify-center items-center">1</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;