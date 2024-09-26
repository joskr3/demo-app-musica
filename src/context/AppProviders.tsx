// src/context/AppProviders.tsx
import  { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryClientContext';


export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <QueryProvider>
      {children}
    </QueryProvider>
  </AuthProvider>
);
