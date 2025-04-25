
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useMusic();

  const themes: { value: Theme; label: string }[] = [
    { value: 'midnight', label: 'Midnight' },
    { value: 'ocean', label: 'Ocean' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'forest', label: 'Forest' },
    { value: 'candy', label: 'Candy' },
  ];

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.value}
            onClick={() => setTheme(theme.value)}
            variant={currentTheme === theme.value ? "default" : "outline"}
            className={cn(
              "transition-all",
              {
                "bg-midnight-accent hover:bg-midnight-accent/90 text-midnight-text": 
                  currentTheme === theme.value && theme.value === 'midnight',
                "bg-ocean-accent hover:bg-ocean-accent/90 text-ocean-text": 
                  currentTheme === theme.value && theme.value === 'ocean',
                "bg-sunset-accent hover:bg-sunset-accent/90 text-sunset-text": 
                  currentTheme === theme.value && theme.value === 'sunset',
                "bg-forest-accent hover:bg-forest-accent/90 text-forest-text": 
                  currentTheme === theme.value && theme.value === 'forest',
                "bg-candy-accent hover:bg-candy-accent/90 text-candy-text": 
                  currentTheme === theme.value && theme.value === 'candy',
              }
            )}
          >
            {theme.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
