
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SearchType = 'all' | 'title' | 'artist' | 'lyrics';

const SearchBar = () => {
  const { currentTheme, searchQuery, setSearchQuery, playSongsByArtist } = useMusic();
  const [searchType, setSearchType] = useState<SearchType>('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value as SearchType);
  };

  return (
    <div className="relative w-full max-w-md mx-auto animate-fade-in flex">
      <div className="relative flex-1">
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
            "w-full pl-10 pr-4 h-9 text-sm transition-colors bg-white/10 border-0 focus-visible:ring-1 rounded-r-none",
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
      <Select onValueChange={handleSearchTypeChange} defaultValue="all">
        <SelectTrigger 
          className={cn(
            "w-32 h-9 rounded-l-none border-0 focus-visible:ring-1 transition-colors bg-white/10",
            {
              "focus-visible:ring-midnight-accent": currentTheme === 'midnight',
              "focus-visible:ring-ocean-accent": currentTheme === 'ocean',
              "focus-visible:ring-sunset-accent": currentTheme === 'sunset',
              "focus-visible:ring-forest-accent": currentTheme === 'forest',
              "focus-visible:ring-candy-accent": currentTheme === 'candy',
            }
          )}
        >
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="artist">Artist</SelectItem>
          <SelectItem value="lyrics">Lyrics</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
