
import { useState, useEffect } from 'react';
import { Song } from '@/types/music';
import { songs } from '@/data/songs';

export const usePlaylist = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'title' | 'artist' | 'lyrics'>('all');
  const [filterArtist, setFilterArtist] = useState<string | null>(null);
  
  // Listen for search type changes from SearchBar component
  useEffect(() => {
    const handleSearchTypeChange = (event: CustomEvent) => {
      setSearchType(event.detail as 'all' | 'title' | 'artist' | 'lyrics');
    };

    document.addEventListener('setSearchType', handleSearchTypeChange as EventListener);
    
    return () => {
      document.removeEventListener('setSearchType', handleSearchTypeChange as EventListener);
    };
  }, []);
  
  const filteredSongs = songs.filter(song => {
    // First, apply artist filter if present
    if (filterArtist && song.artist.toLowerCase() !== filterArtist.toLowerCase()) {
      return false;
    }
    
    if (!searchQuery.trim()) return true; // Show all songs if search query is empty
    
    const query = searchQuery.toLowerCase().trim();
    
    // Then apply search filter based on type
    switch (searchType) {
      case 'title':
        return song.title.toLowerCase().includes(query);
      case 'artist':
        return song.artist.toLowerCase().includes(query);
      case 'lyrics':
        // Fix: Check if lyrics is an array before using .some
        return Array.isArray(song.lyrics) ? 
          song.lyrics.some(line => line.toLowerCase().includes(query)) : 
          Object.values(song.lyrics || {}).some(text => 
            typeof text === 'string' && text.toLowerCase().includes(query)
          );
      case 'all':
      default:
        return song.title.toLowerCase().includes(query) || 
               song.artist.toLowerCase().includes(query) ||
               (Array.isArray(song.lyrics) ? 
                song.lyrics.some(line => line.toLowerCase().includes(query)) : 
                Object.values(song.lyrics || {}).some(text => 
                  typeof text === 'string' && text.toLowerCase().includes(query)
                ));
    }
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

  const filterSongsByArtist = (artist: string) => {
    setFilterArtist(artist);
  };

  const clearFilters = () => {
    setFilterArtist(null);
  };

  return {
    currentSong,
    searchQuery,
    searchType,
    setSearchQuery,
    setSearchType,
    filteredSongs,
    nextSong,
    prevSong,
    playSong,
    filterSongsByArtist,
    clearFilters,
  };
};
