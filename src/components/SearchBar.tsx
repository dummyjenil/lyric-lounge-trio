
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type SearchType = 'all' | 'title' | 'artist' | 'lyrics';

const SearchBar = () => {
  const { currentTheme, searchQuery, setSearchQuery } = useMusic();
  const isMobile = useIsMobile();
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (value: string) => {
    if (value === 'all' || value === 'title' || value === 'artist' || value === 'lyrics') {
      document.dispatchEvent(new CustomEvent('setSearchType', { detail: value }));
    }
  };

  useEffect(() => {
    // Focus input when mobile search is opened
    if (showSearchOnMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showSearchOnMobile]);

  // Background style based on current theme
  const getBackgroundStyle = () => {
    switch (currentTheme) {
      case 'midnight':
        return "from-midnight-primary/80 to-midnight-secondary/90";
      case 'ocean':
        return "from-ocean-primary/80 to-ocean-secondary/90";
      case 'sunset':
        return "from-sunset-primary/80 to-sunset-secondary/90";
      case 'forest':
        return "from-forest-primary/80 to-forest-secondary/90";
      case 'candy':
        return "from-candy-primary/80 to-candy-secondary/90";
      default:
        return "from-black/60 to-black/80";
    }
  };

  // For mobile, show a collapsed version that expands on click
  if (isMobile && !showSearchOnMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => setShowSearchOnMobile(true)}
          variant="ghost"
          size="sm" 
          className={cn(
            "flex items-center justify-center gap-2 shadow-md backdrop-blur-sm w-10 h-10 rounded-full overflow-hidden",
            "hover:scale-105 transition-transform duration-200",
            {
              "bg-midnight-secondary/40 text-midnight-accent": currentTheme === 'midnight',
              "bg-ocean-secondary/40 text-ocean-accent": currentTheme === 'ocean',
              "bg-sunset-secondary/40 text-sunset-accent": currentTheme === 'sunset',
              "bg-forest-secondary/40 text-forest-accent": currentTheme === 'forest',
              "bg-candy-secondary/40 text-candy-accent": currentTheme === 'candy',
            }
          )}
        >
          <Search size={18} className="animate-pulse" />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {(isMobile && showSearchOnMobile) ? (
        <motion.div 
          className="fixed inset-0 z-50 px-4 py-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-b backdrop-blur-lg",
              getBackgroundStyle()
            )}
            onClick={() => setShowSearchOnMobile(false)}
          />
          
          {/* Search UI for mobile */}
          <motion.div 
            className="relative w-full max-w-md flex flex-col gap-3 z-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="mb-2 flex justify-between items-center">
              <h3 className={cn(
                "text-lg font-semibold",
                {
                  "text-midnight-text": currentTheme === 'midnight',
                  "text-ocean-text": currentTheme === 'ocean',
                  "text-sunset-text": currentTheme === 'sunset',
                  "text-forest-text": currentTheme === 'forest',
                  "text-candy-text": currentTheme === 'candy',
                }
              )}>
                Search Music
              </h3>
              <Button
                onClick={() => setShowSearchOnMobile(false)}
                variant="ghost"
                size="sm"
                className="w-8 h-8 rounded-full flex items-center justify-center p-0"
              >
                <X size={18} />
              </Button>
            </div>
            
            <div className="relative w-full">
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
                ref={inputRef}
                type="search"
                placeholder="Search songs, artists, lyrics..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  "w-full pl-10 pr-4 h-12 text-base rounded-xl transition-colors bg-white/10 border-0 focus-visible:ring-2",
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
                  "h-12 transition-colors bg-white/10 border-0 focus-visible:ring-2 rounded-xl",
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
          </motion.div>
        </motion.div>
      ) : !isMobile ? (
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
                "h-9 transition-colors bg-white/10 border-0 focus-visible:ring-1 w-32 rounded-l-none",
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
      ) : null}
    </AnimatePresence>
  );
};

export default SearchBar;
