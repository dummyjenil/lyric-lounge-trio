import React from 'react';
import { useMusic } from '@/components/MusicContext';
import { Theme } from '@/types/music';
import { cn } from '@/lib/utils';

const ThemeSelector: React.FC = () => {
  const { currentTheme } = useMusic();

  return (
    <div className="mt-6 animate-fade-in">
    </div>
  );
};

export default ThemeSelector;
