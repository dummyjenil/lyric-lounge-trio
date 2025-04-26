
import React from 'react';
import ThemeSelector from './ThemeSelector';
import SearchBar from './SearchBar';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';

const TopNav: React.FC = () => {
  const { currentTheme } = useMusic();

  return (
    <div 
      className={cn(
        "w-full backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 z-20 fixed top-0 left-0 right-0 border-b transition-colors duration-300",
        {
          "border-midnight-secondary/30": currentTheme === 'midnight',
          "border-ocean-secondary/30": currentTheme === 'ocean',
          "border-sunset-secondary/30": currentTheme === 'sunset',
          "border-forest-secondary/30": currentTheme === 'forest',
          "border-candy-secondary/30": currentTheme === 'candy',
        }
      )}
    >
      <div className="container flex items-center justify-between h-16 max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <div 
            className={cn(
              "font-bold text-xl transition-colors",
              {
                "text-midnight-accent": currentTheme === 'midnight',
                "text-ocean-accent": currentTheme === 'ocean',
                "text-sunset-accent": currentTheme === 'sunset',
                "text-forest-accent": currentTheme === 'forest',
                "text-candy-accent": currentTheme === 'candy',
              }
            )}
          >
            Lyric Lounge
          </div>
        </div>
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <ThemeSelector />
      </div>
    </div>
  );
};

export default TopNav;
