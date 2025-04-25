
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useMusic();

  const themes: { value: Theme; label: string }[] = [
    { value: 'midnight', label: 'Midnight' },
    { value: 'ocean', label: 'Ocean' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'forest', label: 'Forest' },
    { value: 'candy', label: 'Candy' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9">
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setTheme(theme.value)}
            className={cn(
              "cursor-pointer",
              {
                "bg-midnight-accent text-midnight-text": currentTheme === theme.value && theme.value === 'midnight',
                "bg-ocean-accent text-ocean-text": currentTheme === theme.value && theme.value === 'ocean',
                "bg-sunset-accent text-sunset-text": currentTheme === theme.value && theme.value === 'sunset',
                "bg-forest-accent text-forest-text": currentTheme === theme.value && theme.value === 'forest',
                "bg-candy-accent text-candy-text": currentTheme === theme.value && theme.value === 'candy',
              }
            )}
          >
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
