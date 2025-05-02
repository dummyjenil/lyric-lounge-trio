
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SearchBar = () => {
  const { currentTheme, searchQuery, setSearchQuery } = useMusic();
  const [searchType, setSearchType] = useState<'all' | 'title' | 'artist' | 'lyrics'>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchTypeLabels = {
    all: 'All',
    title: 'Song Title',
    artist: 'Artist',
    lyrics: 'Lyrics'
  };

  return (
    <div className="relative w-full max-w-sm animate-fade-in">
      <div className={`relative transition-all duration-300 ${isMenuOpen ? 'translate-y-1' : ''}`}>
        <Search 
          className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform",
            isAnimating ? "animate-bounce" : "",
            {
              "text-midnight-text/50": currentTheme === 'midnight',
              "text-ocean-text/50": currentTheme === 'ocean',
              "text-sunset-text/50": currentTheme === 'sunset',
              "text-forest-text/50": currentTheme === 'forest',
              "text-candy-text/50": currentTheme === 'candy',
            }
          )}
        />
        
        <Input
          type="search"
          placeholder={`Search ${searchTypeLabels[searchType].toLowerCase()}...`}
          value={searchQuery}
          onChange={handleSearchChange}
          className={cn(
            "w-full pl-10 pr-24 h-9 text-sm transition-colors bg-white/10 backdrop-blur-sm border-0 focus-visible:ring-1",
            {
              "placeholder:text-midnight-text/50 focus-visible:ring-midnight-accent": currentTheme === 'midnight',
              "placeholder:text-ocean-text/50 focus-visible:ring-ocean-accent": currentTheme === 'ocean',
              "placeholder:text-sunset-text/50 focus-visible:ring-sunset-accent": currentTheme === 'sunset',
              "placeholder:text-forest-text/50 focus-visible:ring-forest-accent": currentTheme === 'forest',
              "placeholder:text-candy-text/50 focus-visible:ring-candy-accent": currentTheme === 'candy',
            }
          )}
        />
        
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs rounded-md transition-colors",
                {
                  "bg-midnight-secondary/50 text-midnight-text hover:bg-midnight-secondary": currentTheme === 'midnight',
                  "bg-ocean-secondary/50 text-ocean-text hover:bg-ocean-secondary": currentTheme === 'ocean',
                  "bg-sunset-secondary/50 text-sunset-text hover:bg-sunset-secondary": currentTheme === 'sunset',
                  "bg-forest-secondary/50 text-forest-text hover:bg-forest-secondary": currentTheme === 'forest',
                  "bg-candy-secondary/50 text-candy-text hover:bg-candy-secondary": currentTheme === 'candy',
                }
              )}
            >
              {searchTypeLabels[searchType]}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className={cn(
              "min-w-[8rem] animate-slide-in-top",
              {
                "bg-midnight-secondary/90 backdrop-blur-md border-midnight-accent/30": currentTheme === 'midnight',
                "bg-ocean-secondary/90 backdrop-blur-md border-ocean-accent/30": currentTheme === 'ocean',
                "bg-sunset-secondary/90 backdrop-blur-md border-sunset-accent/30": currentTheme === 'sunset',
                "bg-forest-secondary/90 backdrop-blur-md border-forest-accent/30": currentTheme === 'forest',
                "bg-candy-secondary/90 backdrop-blur-md border-candy-accent/30": currentTheme === 'candy',
              }
            )}
          >
            <DropdownMenuRadioGroup value={searchType} onValueChange={(value) => setSearchType(value as any)}>
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title">Song Title</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="artist">Artist</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lyrics">Lyrics</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchBar;
