import React, { createContext, useContext, useEffect, useState } from 'react';
import { Song, Theme, Language } from '@/types/music';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlaylist } from '@/hooks/usePlaylist';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { songs } from '@/data/songs';

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
  showFavoritesOnly: boolean;
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
  playSongsByArtist: (artist: string) => void;
  toggleFavoritesView: () => void;
  downloadCurrentSong: () => void;
  shareCurrentSong: () => void;
  resetToDefaultSong: () => void;
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
    searchType,
    setSearchQuery,
    setSearchType,
    filteredSongs,
    nextSong,
    prevSong,
    playSong: selectSong,
    filterSongsByArtist,
    clearFilters,
  } = usePlaylist();

  const {
    currentTheme,
    currentLanguage,
    setTheme,
    setLanguage,
  } = useTheme();
  
  const { toast } = useToast();
  
  // State for liked songs
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  // State for showing favorites only
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  
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

  // Toggle favorites view
  const toggleFavoritesView = () => {
    setShowFavoritesOnly(prev => !prev);
  };

  // Download current song
  const downloadCurrentSong = () => {
    if (!currentSong || !currentSong.audioUrl) {
      toast({
        title: "Download error",
        description: "No song available for download",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.href = currentSong.audioUrl;
    link.download = `${currentSong.title} - ${currentSong.artist}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: `Downloading ${currentSong.title} by ${currentSong.artist}`,
    });
  };

  // Share current song using Web Share API or fallback
  const shareCurrentSong = async () => {
    if (!currentSong) return;
    
    // Create the share URL with song_id parameter
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?type=song_id&data=${currentSong.id}`;
    const shareTitle = `${currentSong.title} by ${currentSong.artist}`;
    const shareText = `Check out this song: ${currentSong.title} by ${currentSong.artist}`;
    
    // Try to use the Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        
        toast({
          title: "Shared successfully",
          description: "Song shared successfully",
        });
      } catch (error) {
        console.error('Share failed:', error);
        
        // Fallback to clipboard if share is cancelled or fails
        navigator.clipboard.writeText(shareUrl).then(
          () => {
            toast({
              title: "Link copied!",
              description: "Share URL has been copied to clipboard",
            });
          },
          () => {
            toast({
              title: "Copy failed",
              description: "Failed to copy the URL to clipboard",
              variant: "destructive"
            });
          }
        );
      }
    } else {
      // Fallback to clipboard if Web Share API is not available
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          toast({
            title: "Link copied!",
            description: "Share URL has been copied to clipboard",
          });
        },
        () => {
          toast({
            title: "Copy failed",
            description: "Failed to copy the URL to clipboard",
            variant: "destructive"
          });
        }
      );
    }
  };

  // Reset to the default song (first song in the list)
  const resetToDefaultSong = () => {
    const defaultSong = songs[0];
    if (defaultSong) {
      selectSong(defaultSong.id);
      updateAudioSource(defaultSong, true);
    }
    // Clear any artist filters
    filterSongsByArtist('');
    setSearchQuery('');
    // Ensure we're not in favorites-only mode
    setShowFavoritesOnly(false);
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

  // New function to filter songs by artist
  const playSongsByArtist = (artist: string) => {
    if (artist) {
      filterSongsByArtist(artist);
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
    showFavoritesOnly,
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
    playSongsByArtist,
    toggleFavoritesView,
    downloadCurrentSong,
    shareCurrentSong,
    resetToDefaultSong,
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
