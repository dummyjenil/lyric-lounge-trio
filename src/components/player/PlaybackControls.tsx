
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTheme: string;
  onPrevClick: () => void;
  onPlayPauseClick: () => void;
  onNextClick: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  currentTheme,
  onPrevClick,
  onPlayPauseClick,
  onNextClick
}) => {
  const [buttonPress, setButtonPress] = useState('');

  // Button press animation
  useEffect(() => {
    if (buttonPress) {
      const timer = setTimeout(() => {
        setButtonPress('');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [buttonPress]);

  const handleControlClick = (action: 'prev' | 'play' | 'next') => {
    setButtonPress(action);
    if (action === 'prev') onPrevClick();
    if (action === 'play') onPlayPauseClick();
    if (action === 'next') onNextClick();
  };

  return (
    <div className="flex items-center justify-center gap-8 mb-4 relative">
      <button
        onClick={() => handleControlClick('prev')}
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          buttonPress === 'prev' ? "scale-90" : "hover:scale-110",
          {
            "text-midnight-text hover:bg-midnight-secondary/30": currentTheme === 'midnight',
            "text-ocean-text hover:bg-ocean-secondary/30": currentTheme === 'ocean',
            "text-sunset-text hover:bg-sunset-secondary/30": currentTheme === 'sunset',
            "text-forest-text hover:bg-forest-secondary/30": currentTheme === 'forest',
            "text-candy-text hover:bg-candy-secondary/30": currentTheme === 'candy',
          }
        )}
        aria-label="Previous song"
      >
        <SkipBack size={28} className="transition-transform duration-200" />
      </button>
      
      <button
        onClick={() => handleControlClick('play')}
        className={cn(
          "p-5 rounded-full transition-all duration-200 shadow-lg flex items-center justify-center relative",
          buttonPress === 'play' ? "scale-90" : "hover:scale-105",
          {
            "bg-midnight-accent text-midnight-text hover:bg-midnight-accent/90": currentTheme === 'midnight',
            "bg-ocean-accent text-ocean-text hover:bg-ocean-accent/90": currentTheme === 'ocean',
            "bg-sunset-accent text-sunset-text hover:bg-sunset-accent/90": currentTheme === 'sunset',
            "bg-forest-accent text-forest-text hover:bg-forest-accent/90": currentTheme === 'forest',
            "bg-candy-accent text-candy-text hover:bg-candy-accent/90": currentTheme === 'candy',
          }
        )}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? 
          <Pause size={32} className="animate-fade-in transition-transform duration-200" /> : 
          <Play size={32} className="ml-1 animate-fade-in transition-transform duration-200" />
        }

        {/* Enhanced pulsing animation ring */}
        {isPlaying && (
          <div 
            className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-30",
              {
                "bg-midnight-accent": currentTheme === 'midnight',
                "bg-ocean-accent": currentTheme === 'ocean',
                "bg-sunset-accent": currentTheme === 'sunset',
                "bg-forest-accent": currentTheme === 'forest',
                "bg-candy-accent": currentTheme === 'candy',
              }
            )}
            style={{ animationDuration: '2s' }}
          />
        )}
      </button>
      
      <button
        onClick={() => handleControlClick('next')}
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          buttonPress === 'next' ? "scale-90" : "hover:scale-110",
          {
            "text-midnight-text hover:bg-midnight-secondary/30": currentTheme === 'midnight',
            "text-ocean-text hover:bg-ocean-secondary/30": currentTheme === 'ocean',
            "text-sunset-text hover:bg-sunset-secondary/30": currentTheme === 'sunset',
            "text-forest-text hover:bg-forest-secondary/30": currentTheme === 'forest',
            "text-candy-text hover:bg-candy-secondary/30": currentTheme === 'candy',
          }
        )}
        aria-label="Next song"
      >
        <SkipForward size={28} className="transition-transform duration-200" />
      </button>
    </div>
  );
};

export default PlaybackControls;
