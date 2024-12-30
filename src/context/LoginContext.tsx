'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

interface LoginContextType {
    login: boolean;
    userID: number | undefined;
    setLogin: (value: boolean) => void;
    setUserID: (value: number | undefined) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [login, setLogin] = useState<boolean>(false);
    const [userID, setUserID] = useState<number | undefined>(undefined);

    return (
        <LoginContext.Provider value={{ login, userID, setLogin, setUserID }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLoginContext must be used within a LoginProvider');
    }
    return context;
};
