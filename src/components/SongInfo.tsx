
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import LikeButton from '@/components/LikeButton';

const SongInfo = () => {
  const { currentSong, currentTheme, setSearchQuery } = useMusic();
  
  const handleArtistClick = () => {
    if (currentSong) {
      setSearchQuery(currentSong.artist);
    }
  };

  if (!currentSong) {
    return (
      <div className="w-full text-center mt-4 mb-6 animate-fade-in">
        <h3 className="text-lg font-semibold opacity-60">No song selected</h3>
        <p className="text-sm opacity-40">Choose a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mt-4 mb-6 space-y-1 animate-fade-in">
      <div className="w-full flex items-center justify-center gap-2">
        <h3 
          className={cn(
            "text-xl font-semibold text-center",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          {currentSong.title}
        </h3>
        <LikeButton songId={currentSong.id} size={20} className="mt-0.5" />
      </div>
      
      <p 
        onClick={handleArtistClick}
        className={cn(
          "text-base cursor-pointer transition-all duration-200 hover:underline",
          {
            "text-midnight-accent hover:text-midnight-accent/80": currentTheme === 'midnight',
            "text-ocean-accent hover:text-ocean-accent/80": currentTheme === 'ocean',
            "text-sunset-accent hover:text-sunset-accent/80": currentTheme === 'sunset',
            "text-forest-accent hover:text-forest-accent/80": currentTheme === 'forest',
            "text-candy-accent hover:text-candy-accent/80": currentTheme === 'candy',
          }
        )}
      >
        {currentSong.artist}
      </p>
    </div>
  );
};

export default SongInfo;
