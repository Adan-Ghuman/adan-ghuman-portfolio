import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme-v1';

const THEME_TRANSITION_MS = 200;

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem(THEME_STORAGE_KEY);
                if (saved === 'light' || saved === 'dark') return saved;
                if (document.documentElement.classList.contains('light')) return 'light';
            }
        } catch {
        }
        return 'dark';
    });

    const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
        }
    }, [theme]);

    const toggleTheme = () => {
        const root = document.documentElement;

        if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
        }

        root.classList.add('theme-transitioning');

        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

        transitionTimeout.current = setTimeout(() => {
            root.classList.remove('theme-transitioning');
            transitionTimeout.current = null;
        }, THEME_TRANSITION_MS + 50);
    };

    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
