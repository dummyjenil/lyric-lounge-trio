
export type Theme = 'midnight' | 'ocean' | 'sunset' | 'forest' | 'candy';
export type Language = 'english' | 'spanish' | 'french';

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
  lyrics: {
    english: string;
    spanish: string;
    french: string;
  };
}
