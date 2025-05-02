
import React, { createContext, useContext, useEffect } from 'react';

interface ShareContextType {
  handleSharedUrl: () => void;
}

const ShareContext = createContext<ShareContextType | undefined>(undefined);

export const ShareProvider: React.FC<{ 
  children: React.ReactNode;
  onPlaySong: (songId: string) => void;
}> = ({ children, onPlaySong }) => {
  // Check URL parameters for shared song
  const handleSharedUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const data = params.get('data');
    
    if (type === 'song_id' && data) {
      onPlaySong(data);
    }
  };

  // Run once on component mount
  useEffect(() => {
    handleSharedUrl();
  }, []);

  return (
    <ShareContext.Provider value={{ handleSharedUrl }}>
      {children}
    </ShareContext.Provider>
  );
};

export const useShare = () => {
  const context = useContext(ShareContext);
  if (context === undefined) {
    throw new Error('useShare must be used within a ShareProvider');
  }
  return context;
};
