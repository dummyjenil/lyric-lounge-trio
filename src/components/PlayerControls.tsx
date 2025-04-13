
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';

const PlayerControls: React.FC = () => {
  const { 
    isPlaying, 
    playPause, 
    nextSong, 
    prevSong, 
    currentTime, 
    duration, 
    seek,
    volume,
    setVolume,
    currentTheme
  } = useMusic();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="w-full py-4">
      {/* Progress bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={(values) => seek(values[0])}
          className={cn({
            "[&>.SliderTrack]:bg-midnight-secondary [&>.SliderRange]:bg-midnight-accent": currentTheme === 'midnight',
            "[&>.SliderTrack]:bg-ocean-secondary [&>.SliderRange]:bg-ocean-accent": currentTheme === 'ocean',
            "[&>.SliderTrack]:bg-sunset-secondary [&>.SliderRange]:bg-sunset-accent": currentTheme === 'sunset',
            "[&>.SliderTrack]:bg-forest-secondary [&>.SliderRange]:bg-forest-accent": currentTheme === 'forest',
            "[&>.SliderTrack]:bg-candy-secondary [&>.SliderRange]:bg-candy-accent": currentTheme === 'candy',
          })}
        />
        <div className="flex justify-between text-sm mt-1 text-gray-300">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prevSong}
          className={cn(
            "p-2 rounded-full transition-colors",
            {
              "text-midnight-text hover:bg-midnight-secondary": currentTheme === 'midnight',
              "text-ocean-text hover:bg-ocean-secondary": currentTheme === 'ocean',
              "text-sunset-text hover:bg-sunset-secondary": currentTheme === 'sunset',
              "text-forest-text hover:bg-forest-secondary": currentTheme === 'forest',
              "text-candy-text hover:bg-candy-secondary": currentTheme === 'candy',
            }
          )}
          aria-label="Previous song"
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={playPause}
          className={cn(
            "p-4 rounded-full transition-all",
            {
              "bg-midnight-accent text-midnight-text hover:opacity-90": currentTheme === 'midnight',
              "bg-ocean-accent text-ocean-text hover:opacity-90": currentTheme === 'ocean',
              "bg-sunset-accent text-sunset-text hover:opacity-90": currentTheme === 'sunset',
              "bg-forest-accent text-forest-text hover:opacity-90": currentTheme === 'forest',
              "bg-candy-accent text-candy-text hover:opacity-90": currentTheme === 'candy',
            }
          )}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button
          onClick={nextSong}
          className={cn(
            "p-2 rounded-full transition-colors",
            {
              "text-midnight-text hover:bg-midnight-secondary": currentTheme === 'midnight',
              "text-ocean-text hover:bg-ocean-secondary": currentTheme === 'ocean',
              "text-sunset-text hover:bg-sunset-secondary": currentTheme === 'sunset',
              "text-forest-text hover:bg-forest-secondary": currentTheme === 'forest',
              "text-candy-text hover:bg-candy-secondary": currentTheme === 'candy',
            }
          )}
          aria-label="Next song"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-2 mt-4 px-4">
        <button className="text-gray-300">
          {getVolumeIcon()}
        </button>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(values) => setVolume(values[0] / 100)}
          className={cn(
            "max-w-[120px]",
            {
              "[&>.SliderTrack]:bg-midnight-secondary [&>.SliderRange]:bg-midnight-accent": currentTheme === 'midnight',
              "[&>.SliderTrack]:bg-ocean-secondary [&>.SliderRange]:bg-ocean-accent": currentTheme === 'ocean',
              "[&>.SliderTrack]:bg-sunset-secondary [&>.SliderRange]:bg-sunset-accent": currentTheme === 'sunset',
              "[&>.SliderTrack]:bg-forest-secondary [&>.SliderRange]:bg-forest-accent": currentTheme === 'forest',
              "[&>.SliderTrack]:bg-candy-secondary [&>.SliderRange]:bg-candy-accent": currentTheme === 'candy',
            }
          )}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
