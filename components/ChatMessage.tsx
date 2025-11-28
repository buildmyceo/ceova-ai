import React from 'react';
import { Message } from '../types';
import { CEOVA_LOGO_URL, MEETING_URL } from '../constants';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Helper to convert URLs in text to clickable links
  // Also specifically highlights the Meeting Link
  const renderContent = (text: string) => {
    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        // Remove trailing punctuation often captured by regex in simple splits
        const cleanUrl = part.replace(/[.,;!?)]+$/, "");
        const suffix = part.slice(cleanUrl.length);

        const isMeetingLink = cleanUrl.includes("book-a-metting") || cleanUrl === MEETING_URL;

        if (isMeetingLink) {
          return (
            <React.Fragment key={index}>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 mb-1 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-700 transition-colors shadow-sm no-underline"
              >
                Book ₹9 Meeting Now! 🚀
              </a>
              {suffix}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-words"
            >
              {cleanUrl}
            </a>
            {suffix}
          </React.Fragment>
        );
      }
      
      // Handle bold text **text**
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={index}>
          {boldParts.map((subPart, subIndex) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
              return <strong key={subIndex}>{subPart.slice(2, -2)}</strong>;
            }
            return subPart;
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2 self-end">
          <img 
            src={CEOVA_LOGO_URL} 
            alt="Ceova" 
            className="w-8 h-8 rounded-full border border-gray-200 bg-white object-contain"
          />
        </div>
      )}
      
      <div
        className={`relative max-w-[80%] px-4 py-3 text-sm shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
            : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none'
        }`}
      >
        <div className="leading-relaxed whitespace-pre-wrap">
          {renderContent(message.text)}
        </div>
        <span className={`text-[10px] block mt-1 opacity-70 ${isUser ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;