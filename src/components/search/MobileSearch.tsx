
import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import SearchTypeSelector from './SearchTypeSelector';

interface MobileSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({
  searchQuery,
  onSearchChange,
  onClose
}) => {
  const { currentTheme } = useMusic();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus input when mobile search is opened
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  // Background style based on current theme with improved blur effect
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

  return (
    <motion.div 
      className="fixed inset-0 z-50 px-4 py-16 flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Enhanced backdrop with stronger blur effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b backdrop-blur-2xl",
          getBackgroundStyle()
        )}
        onClick={onClose}
      />
      
      {/* Search UI for mobile with improved visual clarity */}
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
            onClick={onClose}
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
            onChange={onSearchChange}
            className={cn(
              "w-full pl-10 pr-4 h-12 text-base rounded-xl transition-colors shadow-lg",
              {
                "bg-midnight-secondary/40 placeholder:text-midnight-text/60 border-midnight-accent/30 focus-visible:ring-midnight-accent/50": currentTheme === 'midnight',
                "bg-ocean-secondary/40 placeholder:text-ocean-text/60 border-ocean-accent/30 focus-visible:ring-ocean-accent/50": currentTheme === 'ocean',
                "bg-sunset-secondary/40 placeholder:text-sunset-text/60 border-sunset-accent/30 focus-visible:ring-sunset-accent/50": currentTheme === 'sunset',
                "bg-forest-secondary/40 placeholder:text-forest-text/60 border-forest-accent/30 focus-visible:ring-forest-accent/50": currentTheme === 'forest',
                "bg-candy-secondary/40 placeholder:text-candy-text/60 border-candy-accent/30 focus-visible:ring-candy-accent/50": currentTheme === 'candy',
              },
              "backdrop-blur-md border-[1.5px]"
            )}
          />
        </div>
        
        <SearchTypeSelector />
      </motion.div>
    </motion.div>
  );
};

export default MobileSearch;
