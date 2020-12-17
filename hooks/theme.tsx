import React, { useState, useEffect, useContext } from 'react';

declare global {
    interface Window {
        __theme: any;
        __setPreferredTheme: any;
        __onThemeChange: any;
    }
}

const ThemeContext = React.createContext<any>('light');

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(global.window?.__theme || 'light');
    const toggleTheme = () => {
        global.window.__setPreferredTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        global.window.__onThemeChange = setTheme;
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
