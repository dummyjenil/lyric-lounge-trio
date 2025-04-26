
import { useState } from 'react';
import { Song } from '@/types/music';
import { songs } from '@/data/songs';

export const usePlaylist = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = songs.filter(song => {
    const query = searchQuery.toLowerCase().trim();
    return song.title.toLowerCase().includes(query) || 
           song.artist.toLowerCase().includes(query);
  });

  const nextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    return songs[nextIndex];
  };

  const prevSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    return songs[prevIndex];
  };

  const playSong = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      setCurrentSong(song);
      return song;
    }
    return null;
  };

  return {
    currentSong,
    searchQuery,
    setSearchQuery,
    filteredSongs,
    nextSong,
    prevSong,
    playSong,
  };
};
