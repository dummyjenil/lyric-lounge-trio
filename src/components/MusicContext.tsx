
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, Theme, Language } from '@/types/music';
import { songs } from '@/data/songs';
import { useToast } from '@/hooks/use-toast';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTheme: Theme;
  currentLanguage: Language;
  songs: Song[];
  isAdmin: boolean;
  playPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  playSong: (songId: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTheme, setCurrentTheme] = useState<Theme>('midnight');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [isAdmin, setIsAdmin] = useState(false); // Default to non-admin user
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // For demo purposes, we'll add a useEffect to set admin status based on a URL parameter
  useEffect(() => {
    // Check for admin status in URL or localStorage (for demo purposes)
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === 'true') {
      setIsAdmin(true);
      localStorage.setItem('musicPlayerIsAdmin', 'true');
    } else {
      const storedAdminStatus = localStorage.getItem('musicPlayerIsAdmin');
      setIsAdmin(storedAdminStatus === 'true');
    }
  }, []);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.volume = volume;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      // In a real app, we would use real audio files
      // For this demo, we'll simulate audio playback
      audioRef.current.src = currentSong.audioUrl;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
          toast({
            title: "Playback Error",
            description: "Could not play the audio file.",
            variant: "destructive"
          });
        });
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playPause = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    
    // If currently playing, auto-play the next song
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      }, 100);
    }
  };

  const prevSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    
    // If currently playing, auto-play the previous song
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      }, 100);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const setTheme = (theme: Theme) => {
    // Only allow theme changes if admin (additional check)
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can change themes.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentTheme(theme);
    toast({
      title: "Theme Changed",
      description: `Theme set to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
    });
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    toast({
      title: "Language Changed",
      description: `Lyrics now displayed in ${language.charAt(0).toUpperCase() + language.slice(1)}`,
    });
  };

  const playSong = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      }, 100);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        currentTheme,
        currentLanguage,
        songs,
        isAdmin,
        playPause,
        nextSong,
        prevSong,
        seek,
        setVolume,
        setTheme,
        setLanguage,
        playSong,
      }}
    >
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
