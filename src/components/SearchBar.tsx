
import React, { useState, useCallback } from 'react';
import { useMusic } from '@/components/MusicContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';
import MobileSearchButton from './search/MobileSearchButton';
import MobileSearch from './search/MobileSearch';
import DesktopSearch from './search/DesktopSearch';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMusic();
  const isMobile = useIsMobile();
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Debounce the search query updates to the global state
  const debouncedQuery = useDebounce(localSearchQuery, 300);
  
  // Update global search query when debounced value changes
  React.useEffect(() => {
    console.log('SearchBar: updating global search query to', debouncedQuery);
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('SearchBar: local search input changed to', e.target.value);
    setLocalSearchQuery(e.target.value);
  }, []);

  return (
    <AnimatePresence>
      {(isMobile && showSearchOnMobile) ? (
        <MobileSearch 
          searchQuery={localSearchQuery}
          onSearchChange={handleSearchChange}
          onClose={() => setShowSearchOnMobile(false)}
        />
      ) : isMobile ? (
        <MobileSearchButton onClick={() => setShowSearchOnMobile(true)} />
      ) : (
        <DesktopSearch 
          searchQuery={localSearchQuery}
          onSearchChange={handleSearchChange}
        />
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
