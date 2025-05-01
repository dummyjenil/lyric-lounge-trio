
import React from 'react';
import { cn } from '@/lib/utils';
import { Music2 } from 'lucide-react';

interface MusicAnimationProps {
  isPlaying: boolean;
  currentTheme: string;
}

const MusicAnimation: React.FC<MusicAnimationProps> = ({
  isPlaying,
  currentTheme
}) => {
  if (!isPlaying) return null;
  
  return (
    <div className="flex justify-center mt-1 opacity-70">
      <Music2 
        size={20} 
        className={cn(
          "animate-bounce",
          {
            "text-midnight-accent": currentTheme === 'midnight',
            "text-ocean-accent": currentTheme === 'ocean',
            "text-sunset-accent": currentTheme === 'sunset',
            "text-forest-accent": currentTheme === 'forest',
            "text-candy-accent": currentTheme === 'candy',
          }
        )} 
        style={{ animationDuration: '2s' }} 
      />
    </div>
  );
};

export default MusicAnimation;
