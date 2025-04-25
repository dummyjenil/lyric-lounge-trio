
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, Theme, Language } from '@/types/music';
import { songs } from '@/data/songs';
import { useToast } from '@/hooks/use-toast';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTheme: Theme;
  currentLanguage: Language;
  songs: Song[];
  playPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
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
  const [currentTheme, setCurrentTheme] = useState<Theme>('midnight');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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

  const setTheme = (theme: Theme) => {
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
        currentTheme,
        currentLanguage,
        songs,
        playPause,
        nextSong,
        prevSong,
        seek,
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
