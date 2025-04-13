
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Language } from '@/types/music';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LanguageSelector: React.FC = () => {
  const { setLanguage, currentLanguage, currentTheme } = useMusic();

  const languages: { code: Language; label: string }[] = [
    { code: 'english', label: 'English' },
    { code: 'spanish', label: 'Español' },
    { code: 'french', label: 'Français' },
  ];

  return (
    <div className="mt-6">
      <h3 
        className={cn(
          "text-xl font-semibold mb-3",
          {
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          }
        )}
      >
        Language
      </h3>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            variant={currentLanguage === lang.code ? "default" : "outline"}
            className={cn(
              "transition-all",
              {
                "bg-midnight-accent hover:bg-midnight-accent/90 text-midnight-text": 
                  currentLanguage === lang.code && currentTheme === 'midnight',
                "bg-ocean-accent hover:bg-ocean-accent/90 text-ocean-text": 
                  currentLanguage === lang.code && currentTheme === 'ocean',
                "bg-sunset-accent hover:bg-sunset-accent/90 text-sunset-text": 
                  currentLanguage === lang.code && currentTheme === 'sunset',
                "bg-forest-accent hover:bg-forest-accent/90 text-forest-text": 
                  currentLanguage === lang.code && currentTheme === 'forest',
                "bg-candy-accent hover:bg-candy-accent/90 text-candy-text": 
                  currentLanguage === lang.code && currentTheme === 'candy',
              }
            )}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
