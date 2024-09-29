import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Contact {
  name: string;
  phone: string;
}

interface AppContextType {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
}

// Define the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Define the props for AppProvider
interface AppProviderProps {
  children: ReactNode; // Specify that children can be any React node
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  return (
    <AppContext.Provider value={{ contacts, addContact }}>
      {children}
    </AppContext.Provider>
  );
};