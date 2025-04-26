
import { useState, useRef, useEffect } from 'react';
import { Song } from '@/types/music';
import { useToast } from '@/hooks/use-toast';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    audioRef.current = new Audio();
    
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.pause();
      }
    };
  }, []);

  const playPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const updateAudioSource = (song: Song | null, shouldPlay: boolean = false) => {
    if (song && audioRef.current) {
      audioRef.current.src = song.audioUrl;
      
      if (shouldPlay) {
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
  };

  return {
    isPlaying,
    currentTime,
    duration,
    playPause,
    seek,
    updateAudioSource,
  };
};
