'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SystemPromptContextType {
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SystemPromptContext = createContext<SystemPromptContextType | undefined>(undefined);

export function SystemPromptProvider({ children }: { children: ReactNode }) {
  const [customPrompt, setCustomPromptState] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rovo-system-prompt');
    if (saved) {
      setCustomPromptState(saved);
    }
  }, []);

  const setCustomPrompt = (prompt: string) => {
    setCustomPromptState(prompt);
    localStorage.setItem('rovo-system-prompt', prompt);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SystemPromptContext.Provider value={{ customPrompt, setCustomPrompt, isModalOpen, openModal, closeModal }}>
      {children}
    </SystemPromptContext.Provider>
  );
}

export function useSystemPrompt() {
  const context = useContext(SystemPromptContext);
  if (context === undefined) {
    throw new Error('useSystemPrompt must be used within a SystemPromptProvider');
  }
  return context;
}
