
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Song, Theme, Language } from '@/types/music';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlaylist } from '@/hooks/usePlaylist';
import { useTheme } from '@/hooks/useTheme';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTheme: Theme;
  currentLanguage: Language;
  songs: Song[];
  searchQuery: string;
  filteredSongs: Song[];
  likedSongs: string[];
  setSearchQuery: (query: string) => void;
  playPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  playSong: (songId: string) => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    isPlaying, 
    currentTime, 
    duration, 
    playPause, 
    seek, 
    updateAudioSource 
  } = useAudioPlayer();

  const {
    currentSong,
    searchQuery,
    setSearchQuery,
    filteredSongs,
    nextSong,
    prevSong,
    playSong: selectSong,
  } = usePlaylist();

  const {
    currentTheme,
    currentLanguage,
    setTheme,
    setLanguage,
  } = useTheme();
  
  // State for liked songs
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

  // Handle song changes and playback
  const handleNextSong = () => {
    const next = nextSong();
    updateAudioSource(next, isPlaying);
  };

  const handlePrevSong = () => {
    const prev = prevSong();
    updateAudioSource(prev, isPlaying);
  };

  const handlePlaySong = (songId: string) => {
    const song = selectSong(songId);
    if (song) {
      updateAudioSource(song, true);
    }
  };

  // Update audio source when current song changes
  React.useEffect(() => {
    updateAudioSource(currentSong);
  }, [currentSong]);
  
  // Check URL parameters for shared song
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const data = params.get('data');
    
    if (type === 'song_id' && data) {
      handlePlaySong(data);
    }
  }, []);

  const contextValue = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    currentTheme,
    currentLanguage,
    songs: filteredSongs,
    searchQuery,
    filteredSongs,
    likedSongs,
    setSearchQuery,
    playPause,
    nextSong: handleNextSong,
    prevSong: handlePrevSong,
    seek,
    setTheme,
    setLanguage,
    playSong: handlePlaySong,
    toggleLike,
    isLiked,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
