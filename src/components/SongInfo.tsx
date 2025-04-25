
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';

const SongInfo: React.FC = () => {
  const { currentSong, currentTheme } = useMusic();

  if (!currentSong) return null;

  return (
    <div className="text-center py-4 animate-slide-up">
      <h2 
        className={cn(
          "text-2xl font-bold mb-2 transition-colors flex items-center justify-center gap-2",
          {
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          }
        )}
      >
        <Music 
          size={20} 
          className={cn(
            {
              "text-midnight-accent": currentTheme === 'midnight',
              "text-ocean-accent": currentTheme === 'ocean',
              "text-sunset-accent": currentTheme === 'sunset',
              "text-forest-accent": currentTheme === 'forest',
              "text-candy-accent": currentTheme === 'candy',
            }
          )} 
        />
        {currentSong.title}
      </h2>
      <p 
        className={cn(
          "text-lg opacity-80 transition-colors",
          {
            "text-midnight-text/80": currentTheme === 'midnight',
            "text-ocean-text/80": currentTheme === 'ocean',
            "text-sunset-text/80": currentTheme === 'sunset',
            "text-forest-text/80": currentTheme === 'forest',
            "text-candy-text/80": currentTheme === 'candy',
          }
        )}
      >
        {currentSong.artist}
      </p>
    </div>
  );
};

export default SongInfo;
