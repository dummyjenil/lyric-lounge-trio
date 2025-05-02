
import React, { useEffect } from 'react';
import { useMusic } from '@/components/MusicContext';
import AlbumCover from '@/components/AlbumCover';
import SongInfo from '@/components/SongInfo';
import PlayerControls from '@/components/PlayerControls';
import LyricsDisplay from '@/components/LyricsDisplay';
import LanguageSelector from '@/components/LanguageSelector';
import PlaylistView from '@/components/PlaylistView';
import TopNav from '@/components/TopNav';
import { cn } from '@/lib/utils';

const MusicPlayer: React.FC = () => {
  const { currentTheme } = useMusic();
  
  // Add smooth transition when theme changes
  useEffect(() => {
    document.body.classList.add('theme-transition');
    return () => {
      document.body.classList.remove('theme-transition');
    };
  }, []);

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

  const getOverlayStyle = () => {
    switch (currentTheme) {
      case 'midnight':
        return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iI2ZmZmZmZjA1IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-25";
      case 'ocean':
        return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIyOCI+CjxyZWN0IHdpZHRoPSI1NiIgaGVpZ2h0PSIyOCIgZmlsbD0iIzAwMDAwMDA1Ij48L3JlY3Q+CjxjaXJjbGUgY3g9IjE0IiBjeT0iMTQiIHI9IjEuNSIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIj48L2NpcmNsZT4KPC9zdmc+')] opacity-20";
      case 'sunset':
        return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMDAwMDA1Ij48L3JlY3Q+CjxyZWN0IHg9IjEwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmZmZmYwNSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-15";
      case 'forest':
        return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzAwMDAwMDA1Ij48L3JlY3Q+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjgiIGZpbGw9IiMwMDAwMDAwNSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-15";
      case 'candy':
        return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNSIgaGVpZ2h0PSIzNSI+CjxyZWN0IHdpZHRoPSIzNSIgaGVpZ2h0PSIzNSIgZmlsbD0iIzAwMDAwMDA1Ij48L3JlY3Q+CjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxNy41IiByPSIxMi41IiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-25";
    }
  };

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col w-full transition-all duration-700 animate-fade-in pt-16",
        getBackgroundStyle()
      )}
    >
      <div className={cn("absolute inset-0 z-0 pointer-events-none", getOverlayStyle())} />
      
      <TopNav />
      <div className="container mx-auto max-w-screen-xl relative z-10">
        <div className="flex flex-col md:flex-row w-full p-4 md:p-8 lg:p-12 gap-8">
          {/* Left column - Player controls */}
          <div className="w-full md:w-1/2 lg:w-2/5 p-4 flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="max-w-xs w-full">
              <AlbumCover />
              <SongInfo />
              <PlayerControls />
              <div className="md:hidden mt-6">
                <LanguageSelector />
              </div>
            </div>
          </div>
          
          {/* Right column - Lyrics and settings */}
          <div className="w-full md:w-1/2 lg:w-3/5 p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div 
              className={cn(
                "rounded-xl p-6 shadow-xl backdrop-blur-sm transition-all duration-500",
                {
                  "bg-midnight-secondary/30 shadow-glow-sm shadow-midnight-accent/20": currentTheme === 'midnight',
                  "bg-ocean-secondary/30 shadow-glow-sm shadow-ocean-accent/20": currentTheme === 'ocean',
                  "bg-sunset-secondary/30 shadow-glow-sm shadow-sunset-accent/20": currentTheme === 'sunset',
                  "bg-forest-secondary/30 shadow-glow-sm shadow-forest-accent/20": currentTheme === 'forest',
                  "bg-candy-secondary/30 shadow-glow-sm shadow-candy-accent/20": currentTheme === 'candy',
                }
              )}
            >
              <LyricsDisplay />
              <div className="hidden md:block">
                <LanguageSelector />
              </div>
              <PlaylistView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
