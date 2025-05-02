
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music, Play, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LikeButton from '@/components/LikeButton';

const Favorites: React.FC = () => {
  const { filteredSongs, currentSong, playSong, currentTheme, likedSongs } = useMusic();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter only liked songs
  const favoriteSongs = filteredSongs.filter(song => likedSongs.includes(song.id));

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
    <div 
      className={cn(
        "min-h-screen flex flex-col w-full animate-fade-in transition-all duration-700 pt-16",
        {
          "bg-gradient-to-br from-midnight-primary to-midnight-secondary": currentTheme === 'midnight',
          "bg-gradient-to-br from-ocean-primary to-ocean-secondary": currentTheme === 'ocean',
          "bg-gradient-to-br from-sunset-primary to-sunset-secondary": currentTheme === 'sunset',
          "bg-gradient-to-br from-forest-primary to-forest-secondary": currentTheme === 'forest',
          "bg-gradient-to-br from-candy-primary to-candy-secondary": currentTheme === 'candy',
        }
      )}
    >
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className={cn(
              "flex items-center gap-2 transition-all duration-200 hover:translate-x-1", 
              {
                "hover:bg-midnight-secondary/50 text-midnight-text": currentTheme === 'midnight',
                "hover:bg-ocean-secondary/50 text-ocean-text": currentTheme === 'ocean',
                "hover:bg-sunset-secondary/50 text-sunset-text": currentTheme === 'sunset',
                "hover:bg-forest-secondary/50 text-forest-text": currentTheme === 'forest',
                "hover:bg-candy-secondary/50 text-candy-text": currentTheme === 'candy',
              }
            )}
          >
            <ArrowLeft size={16} />
            <span>Back to Player</span>
          </Button>
        </div>

        <h1 
          className={cn(
            "text-2xl font-bold mb-6",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          Favorite Songs
        </h1>

        {favoriteSongs.length === 0 ? (
          <div className={cn(
            "p-8 rounded-lg text-center", 
            {
              "bg-midnight-secondary/30 text-midnight-text": currentTheme === 'midnight',
              "bg-ocean-secondary/30 text-ocean-text": currentTheme === 'ocean',
              "bg-sunset-secondary/30 text-sunset-text": currentTheme === 'sunset',
              "bg-forest-secondary/30 text-forest-text": currentTheme === 'forest',
              "bg-candy-secondary/30 text-candy-text": currentTheme === 'candy',
            }
          )}>
            <p className="text-lg mb-4">You haven't liked any songs yet.</p>
            <Button 
              onClick={() => navigate('/')}
              className={cn(
                {
                  "bg-midnight-accent hover:bg-midnight-accent/80": currentTheme === 'midnight',
                  "bg-ocean-accent hover:bg-ocean-accent/80": currentTheme === 'ocean',
                  "bg-sunset-accent hover:bg-sunset-accent/80": currentTheme === 'sunset',
                  "bg-forest-accent hover:bg-forest-accent/80": currentTheme === 'forest',
                  "bg-candy-accent hover:bg-candy-accent/80": currentTheme === 'candy',
                }
              )}
            >
              Browse Songs
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 animate-fade-in">
            {favoriteSongs.map((song) => (
              <div
                key={song.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-md transition-colors",
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
                  className="w-14 h-14 flex-shrink-0 rounded overflow-hidden relative cursor-pointer"
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
                      <Music size={24} className="text-white" />
                    </div>
                  )}
                  {currentSong?.id === song.id && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={24} className="text-white animate-pulse" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow cursor-pointer" onClick={() => playSong(song.id)}>
                  <h4 
                    className={cn(
                      "font-medium",
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
                      "text-sm opacity-70",
                      {
                        "text-midnight-text": currentTheme === 'midnight',
                        "text-ocean-text": currentTheme === 'ocean',
                        "text-sunset-text": currentTheme === 'sunset',
                        "text-forest-text": currentTheme === 'forest',
                        "text-candy-text": currentTheme === 'candy',
                      }
                    )}
                  >
                    {song.artist}
                  </p>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <LikeButton songId={song.id} size={20} />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => handleShareSong(song.id, e)}
                        className={cn(
                          "p-2 rounded-full transition-all duration-200 hover:scale-105",
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
                        <Share2 size={18} />
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
        )}
      </div>
    </div>
  );
};

export default Favorites;
