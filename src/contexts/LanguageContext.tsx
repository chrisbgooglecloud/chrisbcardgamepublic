import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Translation } from '../locales/types';
import { en } from '../locales/en';
import { es } from '../locales/es';
import { ja } from '../locales/ja';

type Language = 'en' | 'es' | 'ja';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translation;
}

const translations: Record<Language, Translation> = {
    en,
    es,
    ja
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
