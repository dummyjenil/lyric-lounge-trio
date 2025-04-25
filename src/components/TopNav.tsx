
import React from 'react';
import ThemeSelector from './ThemeSelector';

const TopNav: React.FC = () => {
  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 fixed top-0 left-0 right-0 border-b">
      <div className="container flex items-center justify-end h-14 max-w-screen-2xl mx-auto px-4">
        <ThemeSelector />
      </div>
    </div>
  );
};

export default TopNav;
