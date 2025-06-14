
import React from "react";

const whatsappNumber = "+917262927177";
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

const WhatsappFab = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed z-50 bottom-6 right-6 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center w-16 h-16 transition-colors"
    style={{ boxShadow: "0 4px 20px 0 rgba(60, 180, 80, 0.25)" }}
  >
    <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 2.05.53 4.06 1.54 5.82L.07 23.39a1 1 0 0 0 .85 1.42c.14 0 .28-.03.4-.1l5.55-2.87A11.44 11.44 0 0 0 12 23.5c6.27 0 11.5-5.23 11.5-11.5S18.27.5 12 .5zm0 20.5c-1.71 0-3.4-.39-4.9-1.14a1 1 0 0 0-.93-.03l-3.4 1.75 1-3.37a1 1 0 0 0-.13-.82A9.48 9.48 0 1 1 21.5 12c0 5.23-4.27 9.5-9.5 9.5zm5.15-7.46c-.3-.15-1.78-.88-2.05-.98-.27-.1-.46-.15-.64.15-.19.3-.74.98-.9 1.18-.17.19-.33.21-.62.07a7.85 7.85 0 0 1-2.32-1.44A8.96 8.96 0 0 1 8 12.86c-.13-.22-.01-.33.11-.43.13-.11.29-.3.43-.45.15-.15.2-.26.3-.44.1-.19.05-.34-.02-.49-.07-.14-.65-1.56-.89-2.18-.23-.59-.46-.52-.64-.53-.17-.01-.37-.01-.56-.01-.19 0-.49.07-.75.35C4.25 9.98 4 10.72 4 12.05c0 3.15 2.56 6.5 7.56 6.5.8 0 1.58-.07 2.33-.22.21-.05.47-.18.54-.36.07-.18.07-.36.05-.5-.03-.13-.21-.21-.43-.26z"/>
    </svg>
    <span className="sr-only">WhatsApp</span>
  </a>
);

export default WhatsappFab;

