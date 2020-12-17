import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Alert from '../components/Alert';

export interface AlertMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface AlertContextData {
    alert(message: Omit<AlertMessage, 'id'>): void;
    removeAlert(id: string): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<AlertMessage[]>([]);

    const alert = useCallback(
        ({ type, title, description }: Omit<AlertMessage, 'id'>) => {
            const id = uuidv4();

            const alert = {
                id,
                type,
                title,
                description,
            };

            setMessages((oldMessages) => [...oldMessages, alert]);
        },
        []
    );

    const removeAlert = useCallback((id: string) => {
        setMessages((state) => state.filter((message) => message.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={{ alert, removeAlert }}>
            {children}
            <Alert messages={messages} />
        </AlertContext.Provider>
    );
};

export function useAlert(): AlertContextData {
    const context = useContext(AlertContext);

    return context;
}
