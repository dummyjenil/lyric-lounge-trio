
import React from 'react';
import ThemeSelector from './ThemeSelector';
import SearchBar from './SearchBar';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopNav: React.FC = () => {
  const { currentTheme, likedSongs, setSearchQuery } = useMusic();
  const navigate = useNavigate();

  // Function to show only favorite songs in the playlist
  const showFavorites = () => {
    navigate('/favorites');
  };

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
          
          <Button
            onClick={showFavorites}
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1 ml-4 transition-all duration-300 animate-fade-in",
              {
                "hover:bg-midnight-secondary/40 text-midnight-text": currentTheme === 'midnight',
                "hover:bg-ocean-secondary/40 text-ocean-text": currentTheme === 'ocean',
                "hover:bg-sunset-secondary/40 text-sunset-text": currentTheme === 'sunset',
                "hover:bg-forest-secondary/40 text-forest-text": currentTheme === 'forest',
                "hover:bg-candy-secondary/40 text-candy-text": currentTheme === 'candy',
              }
            )}
          >
            <Heart size={16} className={likedSongs.length > 0 ? "fill-current text-red-500" : ""} />
            <span>Favorites</span>
            {likedSongs.length > 0 && (
              <span className={cn(
                "ml-1 px-1.5 py-0.5 text-xs rounded-full", 
                {
                  "bg-midnight-accent text-white": currentTheme === 'midnight',
                  "bg-ocean-accent text-white": currentTheme === 'ocean',
                  "bg-sunset-accent text-white": currentTheme === 'sunset',
                  "bg-forest-accent text-white": currentTheme === 'forest',
                  "bg-candy-accent text-white": currentTheme === 'candy',
                }
              )}>
                {likedSongs.length}
              </span>
            )}
          </Button>
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
