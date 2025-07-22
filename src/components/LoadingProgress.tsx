import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader2, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProgressProps {
  isOpen: boolean;
  progress: number;
  loadingType: 'initial' | 'search';
  searchQuery?: string;
  theme: string;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  isOpen,
  progress,
  loadingType,
  searchQuery,
  theme
}) => {
  const getLoadingMessage = () => {
    if (loadingType === 'search' && searchQuery) {
      return `Searching for "${searchQuery}"...`;
    }
    return 'Loading songs...';
  };

  const getLoadingDescription = () => {
    if (loadingType === 'search') {
      return 'Finding matching songs in your library';
    }
    return 'Preparing your music library';
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        className={cn(
          "sm:max-w-md mx-auto [&>button]:hidden",
          {
            "bg-midnight-card border-midnight-accent/20": theme === 'midnight',
            "bg-ocean-card border-ocean-accent/20": theme === 'ocean',
            "bg-sunset-card border-sunset-accent/20": theme === 'sunset',
            "bg-forest-card border-forest-accent/20": theme === 'forest',
            "bg-lavender-card border-lavender-accent/20": theme === 'lavender',
            "bg-card border-border": theme === 'light'
          }
        )}
      >
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="flex items-center justify-center gap-3">
            <div className="relative">
              <Music 
                className={cn(
                  "h-6 w-6",
                  {
                    "text-midnight-accent": theme === 'midnight',
                    "text-ocean-accent": theme === 'ocean',
                    "text-sunset-accent": theme === 'sunset',
                    "text-forest-accent": theme === 'forest',
                    "text-lavender-accent": theme === 'lavender',
                    "text-primary": theme === 'light'
                  }
                )}
              />
              <Loader2 
                className={cn(
                  "h-4 w-4 absolute -top-1 -right-1 animate-spin",
                  {
                    "text-midnight-accent": theme === 'midnight',
                    "text-ocean-accent": theme === 'ocean',
                    "text-sunset-accent": theme === 'sunset',
                    "text-forest-accent": theme === 'forest',
                    "text-lavender-accent": theme === 'lavender',
                    "text-primary": theme === 'light'
                  }
                )}
              />
            </div>
            <span className="text-lg font-semibold">
              {getLoadingMessage()}
            </span>
          </DialogTitle>
          
          <div className="space-y-3">
            <p 
              className={cn(
                "text-sm",
                {
                  "text-midnight-text/70": theme === 'midnight',
                  "text-ocean-text/70": theme === 'ocean',
                  "text-sunset-text/70": theme === 'sunset',
                  "text-forest-text/70": theme === 'forest',
                  "text-lavender-text/70": theme === 'lavender',
                  "text-muted-foreground": theme === 'light'
                }
              )}
            >
              {getLoadingDescription()}
            </p>
            
            <div className="space-y-2">
              <Progress 
                value={progress}
                className={cn(
                  "h-3",
                  {
                    "bg-midnight-surface": theme === 'midnight',
                    "bg-ocean-surface": theme === 'ocean',
                    "bg-sunset-surface": theme === 'sunset',
                    "bg-forest-surface": theme === 'forest',
                    "bg-lavender-surface": theme === 'lavender',
                    "bg-secondary": theme === 'light'
                  }
                )}
              />
              
              <div className="flex justify-between items-center">
                <span 
                  className={cn(
                    "text-xs font-medium",
                    {
                      "text-midnight-accent": theme === 'midnight',
                      "text-ocean-accent": theme === 'ocean',
                      "text-sunset-accent": theme === 'sunset',
                      "text-forest-accent": theme === 'forest',
                      "text-lavender-accent": theme === 'lavender',
                      "text-primary": theme === 'light'
                    }
                  )}
                >
                  {Math.round(progress)}%
                </span>
                
                {progress < 100 && (
                  <span 
                    className={cn(
                      "text-xs",
                      {
                        "text-midnight-text/50": theme === 'midnight',
                        "text-ocean-text/50": theme === 'ocean',
                        "text-sunset-text/50": theme === 'sunset',
                        "text-forest-text/50": theme === 'forest',
                        "text-lavender-text/50": theme === 'lavender',
                        "text-muted-foreground/70": theme === 'light'
                      }
                    )}
                  >
                    Please wait...
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingProgress;