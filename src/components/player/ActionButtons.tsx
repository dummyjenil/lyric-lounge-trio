
import React from 'react';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LikeButton from '@/components/LikeButton';
import { useMusic } from '@/components/MusicContext';

interface ActionButtonsProps {
  currentTheme: string;
  songId: string | undefined;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentTheme,
  songId
}) => {
  const { toast } = useToast();
  const { isLiked } = useMusic();

  const handleShare = () => {
    if (!songId) return;
    
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

  if (!songId) return null;

  return (
    <div className="flex justify-center items-center mt-3 mb-2 gap-5">
      {/* Like button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="transform hover:scale-110 transition-all duration-200">
            <LikeButton songId={songId} size={24} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLiked(songId) ? "Unlike" : "Like"} this song</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Share button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleShare}
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
            <Share2 size={22} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this song</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
