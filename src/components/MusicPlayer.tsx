
import React from 'react';
import { useMusic } from '@/components/MusicContext';
import AlbumCover from '@/components/AlbumCover';
import SongInfo from '@/components/SongInfo';
import PlayerControls from '@/components/PlayerControls';
import LyricsDisplay from '@/components/LyricsDisplay';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';
import PlaylistView from '@/components/PlaylistView';
import { cn } from '@/lib/utils';

const MusicPlayer: React.FC = () => {
  const { currentTheme } = useMusic();

  const getBackgroundStyle = () => {
    switch (currentTheme) {
      case 'midnight':
        return "bg-gradient-to-br from-midnight-primary to-midnight-secondary";
      case 'ocean':
        return "bg-gradient-to-br from-ocean-primary to-ocean-secondary";
      case 'sunset':
        return "bg-gradient-to-br from-sunset-primary to-sunset-secondary";
      case 'forest':
        return "bg-gradient-to-br from-forest-primary to-forest-secondary";
      case 'candy':
        return "bg-gradient-to-br from-candy-primary to-candy-secondary";
    }
  };

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col md:flex-row w-full p-4 md:p-8 lg:p-12 animate-fade-in transition-colors",
        getBackgroundStyle()
      )}
    >
      {/* Left column - Player controls */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-4 flex flex-col items-center">
        <div className="max-w-xs w-full">
          <AlbumCover />
          <SongInfo />
          <PlayerControls />
          <div className="md:hidden">
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </div>
      </div>
      
      {/* Right column - Lyrics and settings */}
      <div className="w-full md:w-1/2 lg:w-3/5 p-4 md:pl-8">
        <LyricsDisplay />
        <div className="hidden md:block">
          <ThemeSelector />
          <LanguageSelector />
        </div>
        <PlaylistView />
      </div>
    </div>
  );
};

export default MusicPlayer;
