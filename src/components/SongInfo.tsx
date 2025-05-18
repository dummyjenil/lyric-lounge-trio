
import React, { useState, useRef } from 'react';
import { useMusic } from '@/components/MusicContext';
import { cn } from '@/lib/utils';
import { Music, Share2, Download, CheckCircle, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LikeButton from '@/components/LikeButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type FormatOption = 'mp3' | 'opus';

const SongInfo: React.FC = () => {
  const { 
    currentSong, 
    currentTheme, 
    playSongsByArtist,
    shareCurrentSong,
    downloadCurrentSong
  } = useMusic();
  
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('mp3');
  const formatMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(formatMenuRef, () => setShowFormatOptions(false));

  if (!currentSong) return null;

  const handleArtistClick = () => {
    playSongsByArtist(currentSong.artist);
  };
  
  const handleDownloadClick = () => {
    setShowFormatOptions(true);
  };
  
  const handleFormatSelect = (format: FormatOption) => {
    setSelectedFormat(format);
    downloadCurrentSong();
    setShowFormatOptions(false);
  };

  return (
    <div className="relative py-4 animate-slide-up">
      {/* Song information */}
      <div className="text-center">
        <h2 
          className={cn(
            "text-2xl font-bold mb-2 transition-colors flex items-center justify-center gap-2",
            {
              "text-midnight-text": currentTheme === 'midnight',
              "text-ocean-text": currentTheme === 'ocean',
              "text-sunset-text": currentTheme === 'sunset',
              "text-forest-text": currentTheme === 'forest',
              "text-candy-text": currentTheme === 'candy',
            }
          )}
        >
          <Music 
            size={20} 
            className={cn(
              {
                "text-midnight-accent": currentTheme === 'midnight',
                "text-ocean-accent": currentTheme === 'ocean',
                "text-sunset-accent": currentTheme === 'sunset',
                "text-forest-accent": currentTheme === 'forest',
                "text-candy-accent": currentTheme === 'candy',
              }
            )} 
          />
          {currentSong.title}
        </h2>
        <p 
          onClick={handleArtistClick}
          className={cn(
            "text-lg opacity-80 transition-colors cursor-pointer hover:underline inline-block",
            {
              "text-midnight-text/80 hover:text-midnight-accent": currentTheme === 'midnight',
              "text-ocean-text/80 hover:text-ocean-accent": currentTheme === 'ocean',
              "text-sunset-text/80 hover:text-sunset-accent": currentTheme === 'sunset',
              "text-forest-text/80 hover:text-forest-accent": currentTheme === 'forest',
              "text-candy-text/80 hover:text-candy-accent": currentTheme === 'candy',
            }
          )}
        >
          {currentSong.artist}
        </p>
        
        {/* Download button and format options */}
        <div className="relative mt-3 inline-block">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleDownloadClick}
                className={cn(
                  "flex items-center justify-center bg-black/20 backdrop-blur-sm p-2 rounded-full transition-transform hover:scale-110",
                  {
                    "text-midnight-text hover:bg-midnight-secondary/50": currentTheme === 'midnight',
                    "text-ocean-text hover:bg-ocean-secondary/50": currentTheme === 'ocean',
                    "text-sunset-text hover:bg-sunset-secondary/50": currentTheme === 'sunset',
                    "text-forest-text hover:bg-forest-secondary/50": currentTheme === 'forest',
                    "text-candy-text hover:bg-candy-secondary/50": currentTheme === 'candy',
                  }
                )}
                aria-label="Download song"
              >
                <Download size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download this song</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Animated download format options */}
          <AnimatePresence>
            {showFormatOptions && (
              <motion.div
                ref={formatMenuRef}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className={cn(
                  "absolute z-50 bottom-12 left-50 -translate-x-1/2 w-48 p-2 rounded-xl shadow-xl",
                  {
                    "bg-midnight-primary/90 border border-midnight-accent/30": currentTheme === 'midnight',
                    "bg-ocean-primary/90 border border-ocean-accent/30": currentTheme === 'ocean',
                    "bg-sunset-primary/90 border border-sunset-accent/30": currentTheme === 'sunset',
                    "bg-forest-primary/90 border border-forest-accent/30": currentTheme === 'forest',
                    "bg-candy-primary/90 border border-candy-accent/30": currentTheme === 'candy',
                  },
                  "backdrop-blur-lg"
                )}
              >
                <div className="flex justify-between items-center mb-2 px-2">
                  <h3 className={cn(
                    "text-sm font-semibold",
                    {
                      "text-midnight-accent": currentTheme === 'midnight',
                      "text-ocean-accent": currentTheme === 'ocean',
                      "text-sunset-accent": currentTheme === 'sunset',
                      "text-forest-accent": currentTheme === 'forest',
                      "text-candy-accent": currentTheme === 'candy',
                    }
                  )}>
                    Download Format
                  </h3>
                  <button 
                    onClick={() => setShowFormatOptions(false)}
                    className="text-gray-400 hover:text-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-1">
                  {['mp3', 'opus'].map((format) => (
                    <motion.button
                      key={format}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFormatSelect(format as FormatOption)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg flex justify-between items-center",
                        {
                          "bg-midnight-accent/20 text-midnight-text": currentTheme === 'midnight' && selectedFormat === format,
                          "bg-ocean-accent/20 text-ocean-text": currentTheme === 'ocean' && selectedFormat === format,
                          "bg-sunset-accent/20 text-sunset-text": currentTheme === 'sunset' && selectedFormat === format,
                          "bg-forest-accent/20 text-forest-text": currentTheme === 'forest' && selectedFormat === format,
                          "bg-candy-accent/20 text-candy-text": currentTheme === 'candy' && selectedFormat === format,
                          "hover:bg-white/10": selectedFormat !== format
                        }
                      )}
                    >
                      <span className="font-medium capitalize">{format}</span>
                      {selectedFormat === format && (
                        <CheckCircle size={16} className={cn(
                          {
                            "text-midnight-accent": currentTheme === 'midnight',
                            "text-ocean-accent": currentTheme === 'ocean',
                            "text-sunset-accent": currentTheme === 'sunset',
                            "text-forest-accent": currentTheme === 'forest',
                            "text-candy-accent": currentTheme === 'candy',
                          }
                        )} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SongInfo;
