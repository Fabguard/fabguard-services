
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import WhatsAppChat from "./WhatsAppChat";

const WhatsappFab = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      <WhatsAppChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default WhatsappFab;
