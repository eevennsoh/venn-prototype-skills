'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  widget?: {
    type: string;
    data: any;
  };
  widgetLoading?: boolean;
}

interface RovoChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const RovoChatContext = createContext<RovoChatContextType | undefined>(undefined);

export function RovoChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleChat = () => setIsOpen(prev => !prev);
  const closeChat = () => setIsOpen(false);

  return (
    <RovoChatContext.Provider value={{ isOpen, toggleChat, closeChat, messages, setMessages }}>
      {children}
    </RovoChatContext.Provider>
  );
}

export function useRovoChat() {
  const context = useContext(RovoChatContext);
  if (context === undefined) {
    throw new Error('useRovoChat must be used within a RovoChatProvider');
  }
  return context;
}
