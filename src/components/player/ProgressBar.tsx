
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
  currentTheme: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  seek,
  currentTheme,
}) => {
  const [seekHover, setSeekHover] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Animation for progress transitions
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [currentTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="mb-6 relative" 
      onMouseEnter={() => setSeekHover(true)}
      onMouseLeave={() => setSeekHover(false)}
    >
      <div className="relative">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={(values) => {
            seek(values[0]);
            setIsChanging(true);
          }}
          className={cn(
            "h-3 cursor-pointer z-10 transition-all duration-300",
            seekHover ? "scale-y-[1.2]" : "",
            {
              "[&_.SliderTrack]:bg-midnight-secondary/40 [&_.SliderRange]:bg-midnight-accent [&_.SliderThumb]:border-midnight-accent [&_.SliderThumb]:bg-midnight-text": currentTheme === 'midnight',
              "[&_.SliderTrack]:bg-ocean-secondary/40 [&_.SliderRange]:bg-ocean-accent [&_.SliderThumb]:border-ocean-accent [&_.SliderThumb]:bg-ocean-text": currentTheme === 'ocean',
              "[&_.SliderTrack]:bg-sunset-secondary/40 [&_.SliderRange]:bg-sunset-accent [&_.SliderThumb]:border-sunset-accent [&_.SliderThumb]:bg-sunset-text": currentTheme === 'sunset',
              "[&_.SliderTrack]:bg-forest-secondary/40 [&_.SliderRange]:bg-forest-accent [&_.SliderThumb]:border-forest-accent [&_.SliderThumb]:bg-forest-text": currentTheme === 'forest',
              "[&_.SliderTrack]:bg-candy-secondary/40 [&_.SliderRange]:bg-candy-accent [&_.SliderThumb]:border-candy-accent [&_.SliderThumb]:bg-candy-text": currentTheme === 'candy',
            }
          )}
        />
        
        {/* Enhanced glow effect on slider track */}
        <div 
          className={cn(
            "absolute bottom-0 h-1 opacity-70 blur-[3px] rounded-full transition-all duration-500 ease-out",
            {
              "bg-midnight-accent": currentTheme === 'midnight',
              "bg-ocean-accent": currentTheme === 'ocean',
              "bg-sunset-accent": currentTheme === 'sunset',
              "bg-forest-accent": currentTheme === 'forest',
              "bg-candy-accent": currentTheme === 'candy',
            }
          )} 
          style={{ 
            width: `${progressPercentage}%`,
            opacity: seekHover ? 0.9 : 0.5,
            height: seekHover ? '8px' : '4px',
            transform: `translateY(${seekHover ? '-2px' : '0px'})`,
          }}
        />
      </div>
      
      <div className={cn(
        "flex justify-between text-sm mt-2 font-medium transition-all duration-300",
        isChanging ? "animate-fade-in" : ""
      )}>
        <span className={cn(
          "transition-all duration-300",
          {
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          }
        )}>{formatTime(currentTime)}</span>
        <span className={cn(
          "transition-all duration-300",
          {
            "text-midnight-text/70": currentTheme === 'midnight',
            "text-ocean-text/70": currentTheme === 'ocean',
            "text-sunset-text/70": currentTheme === 'sunset',
            "text-forest-text/70": currentTheme === 'forest',
            "text-candy-text/70": currentTheme === 'candy',
          }
        )}>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
