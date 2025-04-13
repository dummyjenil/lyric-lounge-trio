
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const PlayerControls: React.FC = () => {
  const { 
    isPlaying, 
    playPause, 
    nextSong, 
    prevSong, 
    currentTime, 
    duration, 
    seek,
    currentTheme
  } = useMusic();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full py-4">
      {/* Progress bar with enhanced styling */}
      <div className="mb-6">
        <div className="relative">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={(values) => seek(values[0])}
            className={cn(
              "h-2.5 cursor-pointer z-10",
              {
                "[&_.SliderTrack]:bg-midnight-secondary [&_.SliderRange]:bg-midnight-accent [&_.SliderThumb]:border-midnight-accent [&_.SliderThumb]:bg-midnight-text": currentTheme === 'midnight',
                "[&_.SliderTrack]:bg-ocean-secondary [&_.SliderRange]:bg-ocean-accent [&_.SliderThumb]:border-ocean-accent [&_.SliderThumb]:bg-ocean-text": currentTheme === 'ocean',
                "[&_.SliderTrack]:bg-sunset-secondary [&_.SliderRange]:bg-sunset-accent [&_.SliderThumb]:border-sunset-accent [&_.SliderThumb]:bg-sunset-text": currentTheme === 'sunset',
                "[&_.SliderTrack]:bg-forest-secondary [&_.SliderRange]:bg-forest-accent [&_.SliderThumb]:border-forest-accent [&_.SliderThumb]:bg-forest-text": currentTheme === 'forest',
                "[&_.SliderTrack]:bg-candy-secondary [&_.SliderRange]:bg-candy-accent [&_.SliderThumb]:border-candy-accent [&_.SliderThumb]:bg-candy-text": currentTheme === 'candy',
              }
            )}
          />
        </div>
        <div className="flex justify-between text-sm mt-1.5 text-opacity-90 font-medium">
          <span className={cn({
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          })}>{formatTime(currentTime)}</span>
          <span className={cn({
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          })}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Redesigned Controls */}
      <div className="flex items-center justify-center gap-8 mb-2 relative">
        <button
          onClick={prevSong}
          className={cn(
            "p-3 rounded-full transition-all hover:scale-110",
            {
              "text-midnight-text hover:bg-midnight-secondary/50": currentTheme === 'midnight',
              "text-ocean-text hover:bg-ocean-secondary/50": currentTheme === 'ocean',
              "text-sunset-text hover:bg-sunset-secondary/50": currentTheme === 'sunset',
              "text-forest-text hover:bg-forest-secondary/50": currentTheme === 'forest',
              "text-candy-text hover:bg-candy-secondary/50": currentTheme === 'candy',
            }
          )}
          aria-label="Previous song"
        >
          <SkipBack size={28} />
        </button>
        
        <button
          onClick={playPause}
          className={cn(
            "p-5 rounded-full transition-all hover:scale-105 shadow-lg flex items-center justify-center",
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
          {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        
        <button
          onClick={nextSong}
          className={cn(
            "p-3 rounded-full transition-all hover:scale-110",
            {
              "text-midnight-text hover:bg-midnight-secondary/50": currentTheme === 'midnight',
              "text-ocean-text hover:bg-ocean-secondary/50": currentTheme === 'ocean',
              "text-sunset-text hover:bg-sunset-secondary/50": currentTheme === 'sunset',
              "text-forest-text hover:bg-forest-secondary/50": currentTheme === 'forest',
              "text-candy-text hover:bg-candy-secondary/50": currentTheme === 'candy',
            }
          )}
          aria-label="Next song"
        >
          <SkipForward size={28} />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
