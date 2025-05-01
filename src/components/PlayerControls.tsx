
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { TooltipProvider } from '@/components/ui/tooltip';

// Import refactored components
import ProgressBar from '@/components/player/ProgressBar';
import PlaybackControls from '@/components/player/PlaybackControls';
import ActionButtons from '@/components/player/ActionButtons';
import MusicAnimation from '@/components/player/MusicAnimation';

const PlayerControls: React.FC = () => {
  const { 
    isPlaying, 
    playPause, 
    nextSong, 
    prevSong, 
    currentTime, 
    duration, 
    seek,
    currentTheme,
    currentSong
  } = useMusic();

  return (
    <div className="w-full py-4 transition-all duration-300">
      <TooltipProvider>
        {/* Progress bar with enhanced styling and animations */}
        <ProgressBar 
          currentTime={currentTime}
          duration={duration}
          seek={seek}
          currentTheme={currentTheme}
        />

        {/* Playback controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          currentTheme={currentTheme}
          onPrevClick={prevSong}
          onPlayPauseClick={playPause}
          onNextClick={nextSong}
        />
        
        {/* Action buttons (like & share) */}
        <ActionButtons
          currentTheme={currentTheme}
          songId={currentSong?.id}
        />
        
        {/* Music animation when playing */}
        <MusicAnimation
          isPlaying={isPlaying}
          currentTheme={currentTheme}
        />
      </TooltipProvider>
    </div>
  );
};

export default PlayerControls;
