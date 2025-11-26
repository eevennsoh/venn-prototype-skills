'use client';

import { useEffect } from 'react';
import { setGlobalTheme } from '@atlaskit/tokens';

export default function TokenProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the design tokens with light theme
    setGlobalTheme({ colorMode: 'light' });
  }, []);

  return <>{children}</>;
}