
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';

const AlbumCover: React.FC = () => {
  const { currentSong, isPlaying, currentTheme } = useMusic();

  if (!currentSong) return null;

  // Fallback to placeholder image if cover not available
  // In a real app, we would use actual album art
  const coverSrc = currentSong.cover || '/placeholder.svg';

  return (
    <div className="w-full aspect-square overflow-hidden rounded-lg relative">
      <div
        className={cn(
          "w-full h-full transition-all duration-500",
          isPlaying ? "scale-105" : "scale-100",
          {
            "shadow-lg shadow-midnight-accent/30": currentTheme === 'midnight',
            "shadow-lg shadow-ocean-accent/30": currentTheme === 'ocean',
            "shadow-lg shadow-sunset-accent/30": currentTheme === 'sunset',
            "shadow-lg shadow-forest-accent/30": currentTheme === 'forest',
            "shadow-lg shadow-candy-accent/30": currentTheme === 'candy',
          }
        )}
      >
        <img
          src={coverSrc}
          alt={`${currentSong.title} by ${currentSong.artist}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AlbumCover;
