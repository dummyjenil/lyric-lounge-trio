
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useMusic();

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { 
      value: 'midnight', 
      label: 'Midnight', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-midnight-primary to-midnight-accent mr-2 border border-white/20" />
    },
    { 
      value: 'ocean', 
      label: 'Ocean', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ocean-primary to-ocean-accent mr-2 border border-white/20" />
    },
    { 
      value: 'sunset', 
      label: 'Sunset', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sunset-primary to-sunset-accent mr-2 border border-white/20" />
    },
    { 
      value: 'forest', 
      label: 'Forest', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-forest-primary to-forest-accent mr-2 border border-white/20" />
    },
    { 
      value: 'candy', 
      label: 'Candy', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-candy-primary to-candy-accent mr-2 border border-white/20" />
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-10 h-10 transition-all duration-300 hover:scale-110",
            {
              "text-midnight-accent hover:bg-midnight-secondary/20": currentTheme === 'midnight',
              "text-ocean-accent hover:bg-ocean-secondary/20": currentTheme === 'ocean',
              "text-sunset-accent hover:bg-sunset-secondary/20": currentTheme === 'sunset',
              "text-forest-accent hover:bg-forest-secondary/20": currentTheme === 'forest',
              "text-candy-accent hover:bg-candy-secondary/20": currentTheme === 'candy',
            }
          )}
        >
          <Palette className="h-5 w-5 animate-color-shift" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-fade-in p-2">
        <div className="mb-2 px-2 text-sm font-medium text-muted-foreground">
          Select Theme
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setTheme(theme.value)}
            className={cn(
              "cursor-pointer flex items-center transition-all duration-300 hover:scale-105 my-1",
              {
                "bg-midnight-accent/10 text-midnight-text font-medium": currentTheme === theme.value && theme.value === 'midnight',
                "bg-ocean-accent/10 text-ocean-text font-medium": currentTheme === theme.value && theme.value === 'ocean',
                "bg-sunset-accent/10 text-sunset-text font-medium": currentTheme === theme.value && theme.value === 'sunset',
                "bg-forest-accent/10 text-forest-text font-medium": currentTheme === theme.value && theme.value === 'forest',
                "bg-candy-accent/10 text-candy-text font-medium": currentTheme === theme.value && theme.value === 'candy',
              }
            )}
          >
            {theme.icon}
            <span>{theme.label}</span>
            {currentTheme === theme.value && (
              <span className="ml-auto text-xs font-medium opacity-70">Active</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
