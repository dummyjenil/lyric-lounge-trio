
import React from 'react';
import ThemeSelector from './ThemeSelector';
import SearchBar from './SearchBar';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopNav: React.FC = () => {
  const { currentTheme, isLiked } = useMusic();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
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
        </div>
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFavoritesClick}
            className={cn(
              "p-2 rounded-full transition-colors duration-300 hover-scale flex items-center gap-1.5",
              {
                "hover:bg-midnight-secondary/30 text-midnight-accent": currentTheme === 'midnight',
                "hover:bg-ocean-secondary/30 text-ocean-accent": currentTheme === 'ocean',
                "hover:bg-sunset-secondary/30 text-sunset-accent": currentTheme === 'sunset',
                "hover:bg-forest-secondary/30 text-forest-accent": currentTheme === 'forest',
                "hover:bg-candy-secondary/30 text-candy-accent": currentTheme === 'candy',
              }
            )}
          >
            <Heart 
              size={20} 
              className={cn(
                "transition-all",
                {
                  "fill-midnight-accent text-midnight-accent": currentTheme === 'midnight',
                  "fill-ocean-accent text-ocean-accent": currentTheme === 'ocean',
                  "fill-sunset-accent text-sunset-accent": currentTheme === 'sunset',
                  "fill-forest-accent text-forest-accent": currentTheme === 'forest',
                  "fill-candy-accent text-candy-accent": currentTheme === 'candy',
                }
              )}
            />
            <span className="hidden sm:inline text-sm font-medium">Favorites</span>
          </button>
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
