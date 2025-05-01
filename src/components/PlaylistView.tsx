
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music, Play } from 'lucide-react';

const PlaylistView: React.FC = () => {
  const { filteredSongs, currentSong, playSong, currentTheme, setSearchQuery } = useMusic();

  if (filteredSongs.length === 0) {
    return (
      <div className="mt-6 text-center p-8 animate-fade-in">
        <h3 
          className={cn(
            "text-xl font-semibold mb-3",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          No songs found
        </h3>
      </div>
    );
  }

  const handleArtistClick = (artist: string) => {
    setSearchQuery(artist);
  };

  return (
    <div className="mt-6 animate-fade-in">
      <h3 
        className={cn(
          "text-xl font-semibold mb-3",
          {
            "text-midnight-text": currentTheme === 'midnight',
            "text-ocean-text": currentTheme === 'ocean',
            "text-sunset-text": currentTheme === 'sunset',
            "text-forest-text": currentTheme === 'forest',
            "text-candy-text": currentTheme === 'candy',
          }
        )}
      >
        {filteredSongs.length === 1 ? '1 Song' : `${filteredSongs.length} Songs`}
      </h3>
      <div 
        className={cn(
          "flex flex-col gap-2 rounded-md overflow-hidden",
          {
            "divide-midnight-secondary": currentTheme === 'midnight',
            "divide-ocean-secondary": currentTheme === 'ocean',
            "divide-sunset-secondary": currentTheme === 'sunset',
            "divide-forest-secondary": currentTheme === 'forest',
            "divide-candy-secondary": currentTheme === 'candy',
          }
        )}
      >
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md transition-colors",
              {
                "bg-midnight-secondary/50 hover:bg-midnight-secondary": currentTheme === 'midnight',
                "bg-ocean-secondary/50 hover:bg-ocean-secondary": currentTheme === 'ocean',
                "bg-sunset-secondary/50 hover:bg-sunset-secondary": currentTheme === 'sunset',
                "bg-forest-secondary/50 hover:bg-forest-secondary": currentTheme === 'forest',
                "bg-candy-secondary/50 hover:bg-candy-secondary": currentTheme === 'candy',
                "ring-2": currentSong?.id === song.id,
                "ring-midnight-accent": currentSong?.id === song.id && currentTheme === 'midnight',
                "ring-ocean-accent": currentSong?.id === song.id && currentTheme === 'ocean',
                "ring-sunset-accent": currentSong?.id === song.id && currentTheme === 'sunset',
                "ring-forest-accent": currentSong?.id === song.id && currentTheme === 'forest',
                "ring-candy-accent": currentSong?.id === song.id && currentTheme === 'candy',
              }
            )}
          >
            <div 
              className="w-10 h-10 flex-shrink-0 rounded overflow-hidden relative cursor-pointer"
              onClick={() => playSong(song.id)}
            >
              {song.cover ? (
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className={cn(
                    "w-full h-full flex items-center justify-center",
                    {
                      "bg-midnight-primary": currentTheme === 'midnight',
                      "bg-ocean-primary": currentTheme === 'ocean',
                      "bg-sunset-primary": currentTheme === 'sunset',
                      "bg-forest-primary": currentTheme === 'forest',
                      "bg-candy-primary": currentTheme === 'candy',
                    }
                  )}
                >
                  <Music size={16} className="text-white" />
                </div>
              )}
              {currentSong?.id === song.id && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play size={16} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-grow cursor-pointer" onClick={() => playSong(song.id)}>
              <h4 
                className={cn(
                  "font-medium text-sm",
                  {
                    "text-midnight-text": currentTheme === 'midnight',
                    "text-ocean-text": currentTheme === 'ocean',
                    "text-sunset-text": currentTheme === 'sunset',
                    "text-forest-text": currentTheme === 'forest',
                    "text-candy-text": currentTheme === 'candy',
                  }
                )}
              >
                {song.title}
              </h4>
              <p 
                className={cn(
                  "text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer",
                  {
                    "text-midnight-text": currentTheme === 'midnight',
                    "text-ocean-text": currentTheme === 'ocean',
                    "text-sunset-text": currentTheme === 'sunset',
                    "text-forest-text": currentTheme === 'forest',
                    "text-candy-text": currentTheme === 'candy',
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleArtistClick(song.artist);
                }}
              >
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistView;
