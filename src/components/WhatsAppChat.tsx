
import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface WhatsAppChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppChat = ({ isOpen, onClose }: WhatsAppChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to FabGuard Services. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('service') || message.includes('help')) {
      return "We offer Plumbing, Electrical, Carpentry, Clothes Ironing, Dry Cleaning, and Washing & Ironing services. Which service are you interested in?";
    } else if (message.includes('price') || message.includes('cost')) {
      return "Our visit charges are ₹150 for Plumbing, Electrical & Carpentry services, and ₹100 for laundry services. Final pricing depends on the actual work required.";
    } else if (message.includes('book') || message.includes('order')) {
      return "You can book our services directly from our website. Just select the services you need and place an order. Our team will contact you to schedule a visit.";
    } else if (message.includes('contact') || message.includes('phone')) {
      return "You can reach us at +91-XXXXXXXXXX or continue chatting here. We're here to help!";
    } else if (message.includes('time') || message.includes('schedule')) {
      return "We work from 9 AM to 8 PM, Monday to Saturday. Our team will coordinate with you to find a convenient time for the service.";
    } else {
      return "Thank you for your message! For specific queries, please call us or book a service through our website. Our team will be happy to assist you.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 h-96">
      <Card className="h-full shadow-lg border-green-200">
        <CardHeader className="bg-green-500 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-sm font-medium">FabGuard Support</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-green-600 p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppChat;
