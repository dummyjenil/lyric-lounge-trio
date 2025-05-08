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
    // Get the active playlist based on current filters
    const activePlaylist = filteredSongs;
    
    if (activePlaylist.length === 0) {
      return null; // No songs in the filtered playlist
    }
    
    // Find current song index in the filtered playlist
    const currentIndex = activePlaylist.findIndex(song => song.id === currentSong?.id);
    
    // If current song is not in the filtered list, play the first song
    if (currentIndex === -1) {
      setCurrentSong(activePlaylist[0]);
      return activePlaylist[0];
    }
    
    // Otherwise, get the next song in the filtered list
    const nextIndex = (currentIndex + 1) % activePlaylist.length;
    setCurrentSong(activePlaylist[nextIndex]);
    return activePlaylist[nextIndex];
  };

  const prevSong = () => {
    // Get the active playlist based on current filters
    const activePlaylist = filteredSongs;
    
    if (activePlaylist.length === 0) {
      return null; // No songs in the filtered playlist
    }
    
    // Find current song index in the filtered playlist
    const currentIndex = activePlaylist.findIndex(song => song.id === currentSong?.id);
    
    // If current song is not in the filtered list, play the last song
    if (currentIndex === -1) {
      const lastSong = activePlaylist[activePlaylist.length - 1];
      setCurrentSong(lastSong);
      return lastSong;
    }
    
    // Otherwise, get the previous song in the filtered list
    const prevIndex = (currentIndex - 1 + activePlaylist.length) % activePlaylist.length;
    setCurrentSong(activePlaylist[prevIndex]);
    return activePlaylist[prevIndex];
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
