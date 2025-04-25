
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';

const AlbumCover: React.FC = () => {
  const { currentSong, isPlaying, currentTheme } = useMusic();

  if (!currentSong) return null;

  // Fallback to placeholder image if cover not available
  const coverSrc = currentSong.cover || '/placeholder.svg';

  return (
    <div className="w-full aspect-square overflow-hidden rounded-2xl relative group">
      <div
        className={cn(
          "w-full h-full transition-all duration-700",
          isPlaying ? "scale-105 rotate-3" : "scale-100 rotate-0",
          "group-hover:scale-105",
          {
            "shadow-xl shadow-midnight-accent/30": currentTheme === 'midnight',
            "shadow-xl shadow-ocean-accent/30": currentTheme === 'ocean',
            "shadow-xl shadow-sunset-accent/30": currentTheme === 'sunset',
            "shadow-xl shadow-forest-accent/30": currentTheme === 'forest',
            "shadow-xl shadow-candy-accent/30": currentTheme === 'candy',
          }
        )}
      >
        <img
          src={coverSrc}
          alt={`${currentSong.title} by ${currentSong.artist}`}
          className="w-full h-full object-cover rounded-2xl transform transition-all duration-700"
        />
        
        {/* Animated overlay when playing */}
        {isPlaying && (
          <div 
            className={cn(
              "absolute inset-0 opacity-40 rounded-2xl",
              {
                "bg-gradient-to-br from-midnight-accent/20 to-transparent": currentTheme === 'midnight',
                "bg-gradient-to-br from-ocean-accent/20 to-transparent": currentTheme === 'ocean',
                "bg-gradient-to-br from-sunset-accent/20 to-transparent": currentTheme === 'sunset',
                "bg-gradient-to-br from-forest-accent/20 to-transparent": currentTheme === 'forest',
                "bg-gradient-to-br from-candy-accent/20 to-transparent": currentTheme === 'candy',
              }
            )}
          />
        )}
        
        {/* Playing indicator */}
        {isPlaying && (
          <div 
            className={cn(
              "absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse",
              {
                "bg-midnight-accent": currentTheme === 'midnight',
                "bg-ocean-accent": currentTheme === 'ocean',
                "bg-sunset-accent": currentTheme === 'sunset',
                "bg-forest-accent": currentTheme === 'forest',
                "bg-candy-accent": currentTheme === 'candy',
              }
            )}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumCover;
