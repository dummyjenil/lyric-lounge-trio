
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LikesContextType {
  likedSongs: string[];
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  
  // Load liked songs from localStorage on mount
  useEffect(() => {
    const storedLikedSongs = localStorage.getItem('likedSongs');
    if (storedLikedSongs) {
      setLikedSongs(JSON.parse(storedLikedSongs));
    }
  }, []);
  
  // Save liked songs to localStorage when changed
  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Toggle like status for a song
  const toggleLike = (songId: string) => {
    setLikedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };
  
  // Check if a song is liked
  const isLiked = (songId: string) => {
    return likedSongs.includes(songId);
  };

  return (
    <LikesContext.Provider value={{ likedSongs, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};
