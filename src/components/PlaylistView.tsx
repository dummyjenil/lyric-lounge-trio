
import React, { useState } from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music, Play, Share2, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LikeButton from '@/components/LikeButton';
import { Button } from '@/components/ui/button';

const PlaylistView: React.FC = () => {
  const { filteredSongs, currentSong, playSong, currentTheme, setSearchQuery, likedSongs } = useMusic();
  const { toast } = useToast();
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  
  const displayedSongs = showLikedOnly 
    ? filteredSongs.filter(song => likedSongs.includes(song.id))
    : filteredSongs;

  if (displayedSongs.length === 0) {
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
          {showLikedOnly ? "No liked songs" : "No songs found"}
        </h3>
        {showLikedOnly && (
          <Button 
            onClick={() => setShowLikedOnly(false)}
            className={cn(
              "mt-2",
              {
                "bg-midnight-accent hover:bg-midnight-accent/90": currentTheme === 'midnight',
                "bg-ocean-accent hover:bg-ocean-accent/90": currentTheme === 'ocean',
                "bg-sunset-accent hover:bg-sunset-accent/90": currentTheme === 'sunset',
                "bg-forest-accent hover:bg-forest-accent/90": currentTheme === 'forest',
                "bg-candy-accent hover:bg-candy-accent/90": currentTheme === 'candy',
              }
            )}
          >
            Show All Songs
          </Button>
        )}
      </div>
    );
  }

  const handleArtistClick = (artist: string) => {
    setSearchQuery(artist);
  };
  
  const handleShareSong = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create the share URL with song_id parameter
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?type=song_id&data=${songId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast({
          title: "Link copied!",
          description: "Share URL has been copied to clipboard",
        });
      },
      (err) => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy failed",
          description: "Failed to copy the URL to clipboard",
          variant: "destructive"
        });
      }
    );
  };

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h3 
          className={cn(
            "text-xl font-semibold",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          {displayedSongs.length === 1 ? '1 Song' : `${displayedSongs.length} Songs`}
        </h3>
        <Button 
          variant="outline"
          onClick={() => setShowLikedOnly(!showLikedOnly)}
          className={cn(
            "flex items-center gap-2 text-sm py-1 px-3",
            {
              "border-midnight-accent text-midnight-accent": showLikedOnly && currentTheme === 'midnight',
              "border-ocean-accent text-ocean-accent": showLikedOnly && currentTheme === 'ocean',
              "border-sunset-accent text-sunset-accent": showLikedOnly && currentTheme === 'sunset',
              "border-forest-accent text-forest-accent": showLikedOnly && currentTheme === 'forest',
              "border-candy-accent text-candy-accent": showLikedOnly && currentTheme === 'candy',
            }
          )}
        >
          <Heart size={16} className={showLikedOnly ? "fill-current" : ""} />
          {showLikedOnly ? "All Songs" : "Liked Only"}
        </Button>
      </div>
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
        {displayedSongs.map((song) => (
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
            
            {/* Action buttons */}
            <div className="ml-auto flex items-center gap-2">
              <LikeButton songId={song.id} size={16} />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => handleShareSong(song.id, e)}
                    className={cn(
                      "p-1.5 rounded-full transition-all duration-200 hover:bg-opacity-20",
                      {
                        "text-midnight-accent hover:bg-midnight-secondary": currentTheme === 'midnight',
                        "text-ocean-accent hover:bg-ocean-secondary": currentTheme === 'ocean',
                        "text-sunset-accent hover:bg-sunset-secondary": currentTheme === 'sunset',
                        "text-forest-accent hover:bg-forest-secondary": currentTheme === 'forest',
                        "text-candy-accent hover:bg-candy-secondary": currentTheme === 'candy',
                      }
                    )}
                    aria-label="Share song"
                  >
                    <Share2 size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this song</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistView;
