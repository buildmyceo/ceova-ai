import React from 'react';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* 
        This div simulates the host website content. 
        In the real implementation, the ChatWidget would be the only thing rendered
        over the existing Odoo site.
      */}
      <div className="hidden">
        <h1>BuildMyCEO - Odoo Host Page</h1>
      </div>
      
      {/* The Chat Widget sits on top */}
      <ChatWidget />
    </div>
  );
};

export default App;