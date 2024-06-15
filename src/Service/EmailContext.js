
import { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail, role, setRole }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  return useContext(EmailContext);
}
