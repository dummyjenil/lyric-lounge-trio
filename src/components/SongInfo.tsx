
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music, Heart } from 'lucide-react';

const SongInfo: React.FC = () => {
  const { currentSong, currentTheme, toggleLike, isLiked, playSongsByArtist } = useMusic();

  if (!currentSong) return null;

  const handleArtistClick = () => {
    playSongsByArtist(currentSong.artist);
  };

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
        <button 
          onClick={() => toggleLike(currentSong.id)}
          className="ml-2 hover-scale"
        >
          <Heart 
            size={20} 
            fill={isLiked(currentSong.id) ? 'currentColor' : 'none'}
            className={cn(
              "transition-all hover:animate-heart-beat",
              {
                "text-midnight-accent": currentTheme === 'midnight',
                "text-ocean-accent": currentTheme === 'ocean',
                "text-sunset-accent": currentTheme === 'sunset',
                "text-forest-accent": currentTheme === 'forest',
                "text-candy-accent": currentTheme === 'candy',
              }
            )} 
          />
        </button>
      </h2>
      <p 
        onClick={handleArtistClick}
        className={cn(
          "text-lg opacity-80 transition-colors cursor-pointer hover:underline inline-block",
          {
            "text-midnight-text/80 hover:text-midnight-accent": currentTheme === 'midnight',
            "text-ocean-text/80 hover:text-ocean-accent": currentTheme === 'ocean',
            "text-sunset-text/80 hover:text-sunset-accent": currentTheme === 'sunset',
            "text-forest-text/80 hover:text-forest-accent": currentTheme === 'forest',
            "text-candy-text/80 hover:text-candy-accent": currentTheme === 'candy',
          }
        )}
      >
        {currentSong.artist}
      </p>
    </div>
  );
};

export default SongInfo;
