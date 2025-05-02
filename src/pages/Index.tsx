
import React from 'react';
import { MusicProvider } from '@/components/MusicContext';
import MusicPlayer from '@/components/MusicPlayer';

interface IndexProps {
  favorites?: boolean;
}

const Index = ({ favorites = false }: IndexProps) => {
  return (
    <MusicProvider>
      <MusicPlayer showFavorites={favorites} />
    </MusicProvider>
  );
};

export default Index;
