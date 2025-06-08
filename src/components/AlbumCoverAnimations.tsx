
import React from 'react';
import { cn } from '@/lib/utils';
import { Theme } from '@/types/music';

interface AlbumCoverAnimationsProps {
  showLikeAnimation: boolean;
  showShareAnimation: boolean;
  isLiked: boolean;
  currentTheme: Theme;
}

const AlbumCoverAnimations: React.FC<AlbumCoverAnimationsProps> = ({
  showLikeAnimation,
  showShareAnimation,
  isLiked,
  currentTheme
}) => {
  return (
    <>
      {/* Like Animation Overlay */}
      {showLikeAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={cn(
              "text-6xl animate-bounce",
              {
                "text-midnight-accent": currentTheme === 'midnight',
                "text-ocean-accent": currentTheme === 'ocean',
                "text-sunset-accent": currentTheme === 'sunset',
                "text-forest-accent": currentTheme === 'forest',
                "text-candy-accent": currentTheme === 'candy',
              }
            )}
          >
            {isLiked ? '💖' : '💔'}
          </div>
        </div>
      )}

      {/* Share Animation Overlay */}
      {showShareAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={cn(
              "text-4xl animate-pulse",
              {
                "text-midnight-accent": currentTheme === 'midnight',
                "text-ocean-accent": currentTheme === 'ocean',
                "text-sunset-accent": currentTheme === 'sunset',
                "text-forest-accent": currentTheme === 'forest',
                "text-candy-accent": currentTheme === 'candy',
              }
            )}
          >
            📤
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumCoverAnimations;
