
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from '@/components/MusicContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Favorites from '@/pages/Favorites';
import './App.css';

function App() {
  return (
    <TooltipProvider>
      <MusicProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </MusicProvider>
    </TooltipProvider>
  );
}

export default App;
