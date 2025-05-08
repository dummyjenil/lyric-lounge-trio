
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music, Share2, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LikeButton from '@/components/LikeButton';

const SongInfo: React.FC = () => {
  const { 
    currentSong, 
    currentTheme, 
    playSongsByArtist,
    shareCurrentSong,
    downloadCurrentSong
  } = useMusic();

  if (!currentSong) return null;

  const handleArtistClick = () => {
    playSongsByArtist(currentSong.artist);
  };

  return (
    <div className="relative py-4 animate-slide-up">
      {/* Song information */}
      <div className="text-center">
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
      
      {/* Action buttons positioned like Instagram Shorts */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-1">
        {/* Like button */}
        {currentSong && (
          <LikeButton songId={currentSong.id} size={24} />
        )}
        
        {/* Download button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={downloadCurrentSong}
              className={cn(
                "p-2 rounded-full transition-all duration-200 hover:scale-110",
                {
                  "text-midnight-accent hover:bg-midnight-secondary/30": currentTheme === 'midnight',
                  "text-ocean-accent hover:bg-ocean-secondary/30": currentTheme === 'ocean',
                  "text-sunset-accent hover:bg-sunset-secondary/30": currentTheme === 'sunset',
                  "text-forest-accent hover:bg-forest-secondary/30": currentTheme === 'forest',
                  "text-candy-accent hover:bg-candy-secondary/30": currentTheme === 'candy',
                }
              )}
              aria-label="Download song"
            >
              <Download size={24} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download this song</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Share button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={shareCurrentSong}
              className={cn(
                "p-2 rounded-full transition-all duration-200 hover:scale-110",
                {
                  "text-midnight-accent hover:bg-midnight-secondary/30": currentTheme === 'midnight',
                  "text-ocean-accent hover:bg-ocean-secondary/30": currentTheme === 'ocean',
                  "text-sunset-accent hover:bg-sunset-secondary/30": currentTheme === 'sunset',
                  "text-forest-accent hover:bg-forest-secondary/30": currentTheme === 'forest',
                  "text-candy-accent hover:bg-candy-secondary/30": currentTheme === 'candy',
                }
              )}
              aria-label="Share song"
            >
              <Share2 size={24} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this song</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default SongInfo;
