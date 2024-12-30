'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  website?: string;
  address: Address;
  company: Company;
}

interface UserContextType {
  user: User | null;
  addUser: (userData: User) => void;
  updateUser: (updatedUser: User) => void;
  error: string | null;
  setError: (error: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addUser = (userData: User) => {
    setUser(userData);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, addUser, updateUser, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};
