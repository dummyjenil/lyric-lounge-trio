
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { cn } from '@/lib/utils';

const ThemeSelector: React.FC = () => {
  const { currentTheme } = useMusic();

  return (
    <div className="mt-6 animate-fade-in">
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
        Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
      </h3>
    </div>
  );
};

export default ThemeSelector;
