
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { CheckIcon, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ThemeSelector: React.FC = () => {
  const { setTheme, currentTheme, isAdmin } = useMusic();
  const { toast } = useToast();

  const themes: { name: Theme; label: string }[] = [
    { name: 'midnight', label: 'Midnight' },
    { name: 'ocean', label: 'Ocean' },
    { name: 'sunset', label: 'Sunset' },
    { name: 'forest', label: 'Forest' },
    { name: 'candy', label: 'Candy' },
  ];

  const getThemeColors = (theme: Theme) => {
    switch (theme) {
      case 'midnight':
        return "bg-gradient-to-br from-midnight-primary to-midnight-secondary border-midnight-accent";
      case 'ocean':
        return "bg-gradient-to-br from-ocean-primary to-ocean-secondary border-ocean-accent";
      case 'sunset':
        return "bg-gradient-to-br from-sunset-primary to-sunset-secondary border-sunset-accent";
      case 'forest':
        return "bg-gradient-to-br from-forest-primary to-forest-secondary border-forest-accent";
      case 'candy':
        return "bg-gradient-to-br from-candy-primary to-candy-secondary border-candy-accent";
    }
  };

  const handleThemeClick = (theme: Theme) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can change themes.",
        variant: "destructive"
      });
      return;
    }
    
    setTheme(theme);
  };

  return (
    <div className="mt-6">
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
        Themes
        {!isAdmin && (
          <span className="ml-2 text-sm font-normal opacity-70">(Admin only)</span>
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeClick(theme.name)}
            className={cn(
              "w-16 h-16 rounded-lg relative border-2 transition-all hover:scale-105",
              getThemeColors(theme.name),
              currentTheme === theme.name ? "border-opacity-100" : "border-opacity-0"
            )}
            title={isAdmin ? theme.label : `${theme.label} (Admin only)`}
            aria-label={`Set theme to ${theme.label}`}
            disabled={!isAdmin}
          >
            {currentTheme === theme.name && (
              <span className="absolute inset-0 flex items-center justify-center text-white">
                <CheckIcon size={20} />
              </span>
            )}
            {!isAdmin && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <LockIcon size={16} className="text-white/80" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
