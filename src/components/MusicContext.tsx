
import React, { createContext, useContext } from 'react';
import { Song, Theme, Language } from '@/types/music';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlaylist } from '@/hooks/usePlaylist';
import { useTheme } from '@/hooks/useTheme';
import { LikesProvider, useLikes } from '@/contexts/LikesContext';
import { ShareProvider } from '@/contexts/ShareContext';

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

// Inner provider that depends on LikesProvider
const MusicProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  
  // Get likes functionality from LikesContext
  const { likedSongs, toggleLike, isLiked } = useLikes();

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
    return song;
  };

  // Update audio source when current song changes
  React.useEffect(() => {
    updateAudioSource(currentSong);
  }, [currentSong]);

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

// Combined provider that sets up all contexts
export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LikesProvider>
      <InnerWithShare>
        {children}
      </InnerWithShare>
    </LikesProvider>
  );
};

// Component to handle share functionality
const InnerWithShare: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // First render a basic MusicProviderInner
  return (
    <MusicProviderInner>
      <ShareIntegration>
        {children}
      </ShareIntegration>
    </MusicProviderInner>
  );
};

// Component that consumes the music context and provides share functionality
const ShareIntegration: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playSong } = useMusic();
  
  return (
    <ShareProvider onPlaySong={playSong}>
      {children}
    </ShareProvider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
