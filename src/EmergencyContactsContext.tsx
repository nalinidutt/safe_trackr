// EmergencyContactsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Contact {
  name: string;
  phone: string;
}

interface EmergencyContactsContextType {
  contacts: Contact[];
  addContact: (name: string, phone: string) => void;
}

const EmergencyContactsContext = createContext<EmergencyContactsContextType | undefined>(undefined);

export const EmergencyContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (name: string, phone: string) => {
    setContacts([...contacts, { name, phone }]);
  };

  return (
    <EmergencyContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </EmergencyContactsContext.Provider>
  );
};

export const useEmergencyContacts = () => {
  const context = useContext(EmergencyContactsContext);
  if (!context) {
    throw new Error('useEmergencyContacts must be used within an EmergencyContactsProvider');
  }
  return context;
};