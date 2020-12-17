import React from 'react';

import { AuthProvider } from './auth';
import { AlertProvider } from './alert';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <ThemeProvider>
            <AlertProvider>{children}</AlertProvider>
        </ThemeProvider>
    </AuthProvider>
);

export default AppProvider;
