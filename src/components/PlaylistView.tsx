
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Song } from '@/types/music';

interface PlaylistViewProps {
  songs?: Song[];
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ songs }) => {
  const { currentSong, currentTheme, playSong, toggleLike, isLiked, showFavoritesOnly } = useMusic();

  // Display a message if there are no songs in the playlist
  if (songs?.length === 0) {
    return (
      <div className="py-8 text-center">
        <h3 
          className={cn(
            "text-xl font-bold mb-4 transition-colors",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          {showFavoritesOnly ? "Favorites" : "Playlist"}
        </h3>
        <p
          className={cn(
            "text-md transition-colors",
            {
              "text-midnight-text/70": currentTheme === 'midnight',
              "text-ocean-text/70": currentTheme === 'ocean',
              "text-sunset-text/70": currentTheme === 'sunset',
              "text-forest-text/70": currentTheme === 'forest',
              "text-candy-text/70": currentTheme === 'candy',
            }
          )}
        >
          {showFavoritesOnly 
            ? "No favorite songs yet. Click the heart icon on songs to add them to your favorites." 
            : "No songs match your search criteria."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 
        className={cn(
          "text-xl font-bold mb-4 transition-colors",
          {
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          }
        )}
      >
        {showFavoritesOnly ? "Favorites" : "Playlist"}
      </h3>
      <ul>
        {songs?.map(song => (
          <li 
            key={song.id} 
            className={cn(
              "py-2 px-4 rounded-md cursor-pointer hover:bg-black/5 transition-colors flex items-center justify-between",
              {
                "bg-black/5": currentSong?.id === song.id,
                "text-midnight-text hover:bg-midnight-secondary/20": currentTheme === 'midnight',
                "text-ocean-text hover:bg-ocean-secondary/20": currentTheme === 'ocean',
                "text-sunset-text hover:bg-sunset-secondary/20": currentTheme === 'sunset',
                "text-forest-text hover:bg-forest-secondary/20": currentTheme === 'forest',
                "text-candy-text hover:bg-candy-secondary/20": currentTheme === 'candy',
              }
            )}
            onClick={() => playSong(song.id)}
          >
            <span className="truncate">{song.title} - {song.artist}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent song from playing when like is toggled
                toggleLike(song.id);
              }}
              className="hover-scale"
            >
              <Heart 
                size={20} 
                fill={isLiked(song.id) ? 'currentColor' : 'none'}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;
