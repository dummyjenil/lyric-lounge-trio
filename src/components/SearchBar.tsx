
import React from 'react';
import { Search } from 'lucide-react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const { currentTheme, searchQuery, setSearchQuery } = useMusic();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm animate-fade-in">
      <div className="relative">
        <Search 
          className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform",
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
          placeholder="Search songs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={cn(
            "w-full pl-10 pr-4 h-9 text-sm transition-colors bg-white/10 border-0 focus-visible:ring-1",
            {
              "placeholder:text-midnight-text/50 focus-visible:ring-midnight-accent": currentTheme === 'midnight',
              "placeholder:text-ocean-text/50 focus-visible:ring-ocean-accent": currentTheme === 'ocean',
              "placeholder:text-sunset-text/50 focus-visible:ring-sunset-accent": currentTheme === 'sunset',
              "placeholder:text-forest-text/50 focus-visible:ring-forest-accent": currentTheme === 'forest',
              "placeholder:text-candy-text/50 focus-visible:ring-candy-accent": currentTheme === 'candy',
            }
          )}
        />
      </div>
    </div>
  );
};

export default SearchBar;
