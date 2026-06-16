import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, FastForward, Info, ZoomIn, ZoomOut, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { audio } from './utils/audioEngine';
import IntroSlide from './slides/IntroSlide';
import PlaygroundSlide from './slides/PlaygroundSlide';
import BruteForceSlide from './slides/BruteForceSlide';
import ObservationSlide from './slides/ObservationSlide';
import GraphSlide from './slides/GraphSlide';
import TreeSlide from './slides/TreeSlide';
import OptimalSlide from './slides/OptimalSlide';
import CodeSlide from './slides/CodeSlide';
import ComplexitySlide from './slides/ComplexitySlide';
import ProofSlide from './slides/ProofSlide';
import UniqueSlide from './slides/UniqueSlide';
import SummarySlide from './slides/SummarySlide';

const SLIDES = [
  IntroSlide,
  PlaygroundSlide,
  BruteForceSlide,
  ObservationSlide,
  GraphSlide,
  TreeSlide,
  OptimalSlide,
  CodeSlide,
  ComplexitySlide,
  ProofSlide,
  UniqueSlide,
  SummarySlide
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [zoom, setZoom] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  
  const activeKeys = useRef({});

  const toggleAudio = () => {
    audio.playClickSound();
    audio.init();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.setMuted(newMuted);
  };

  const toggleTheme = () => {
    audio.playClickSound();
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(c => c + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(c => c - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      activeKeys.current[e.key] = true;

      // Chorded key logic
      if (activeKeys.current['1'] && e.key === '0') {
        setCurrentSlide(9); // Page 10
      } else if (activeKeys.current['1'] && e.key === '1') {
        setCurrentSlide(10); // Page 11
      } else if (activeKeys.current['1'] && e.key === '2') {
        setCurrentSlide(11); // Page 12
      } else if (e.key >= '1' && e.key <= '9' && Object.keys(activeKeys.current).length === 1) {
        setCurrentSlide(parseInt(e.key) - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    const handleKeyUp = (e) => {
      delete activeKeys.current[e.key];
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentSlide]);

  const getVibeForSlide = (index) => {
    if (index === 0) return 0; // Page 1: Intro
    if (index >= 1 && index <= 3) return 1; // Page 2: Problem Statement / BruteForce
    if (index >= 4 && index <= 5) return 2; // Page 3: Intuition (Graph/Tree)
    if (index >= 6 && index <= 10) return 3; // Page 4: Algorithm / Deep Tech
    return 4; // Page 5: Summary
  };

  useEffect(() => {
    const vibe = getVibeForSlide(currentSlide);
    audio.setVibe(vibe);
    audio.playTransitionSound(vibe);
  }, [currentSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide];
  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  const renderPagination = () => {
    const total = SLIDES.length;
    const current = currentSlide + 1;
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', total);
      } else if (current >= total - 3) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }

    return pages.map((p, i) => {
      if (p === '...') {
        return <span key={`ellipsis-${i}`} className="px-1 text-[var(--text-muted)] font-bold tracking-widest">...</span>;
      }
      const isCurrent = p === current;
      return (
        <button
          key={p}
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playClickSound(); setCurrentSlide(p - 1); }}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
            isCurrent 
              ? 'bg-accent-color text-black shadow-[0_0_10px_rgba(0,240,255,0.5)] scale-110' 
              : 'text-[var(--text-color)] hover:bg-[var(--border-color)]'
          }`}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <div className="presentation-container">
      <div className="grid-bg"></div>
      
      <div className="absolute top-4 right-4 z-[100] flex gap-2 items-center bg-[var(--card-bg)] p-2 rounded-xl border border-[var(--border-color)] shadow-lg backdrop-blur-md">
        <button 
          className="btn-icon" 
          onClick={() => { audio.playClickSound(); setZoom(z => Math.max(0.5, z - 0.1)); }} 
          onMouseEnter={() => audio.playHoverSound()}
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <div className="flex-center font-mono text-sm px-1 w-12">{Math.round(zoom * 100)}%</div>
        <button 
          className="btn-icon" 
          onClick={() => { audio.playClickSound(); setZoom(z => Math.min(2, z + 0.1)); }} 
          onMouseEnter={() => audio.playHoverSound()}
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <div className="w-px h-6 bg-[var(--border-color)] mx-1"></div>
        <button 
          className="btn-icon" 
          onClick={toggleAudio} 
          onMouseEnter={() => audio.playHoverSound()}
          title={isMuted ? "Unmute & Play BGM" : "Mute Audio"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button 
          className="btn-icon" 
          onClick={toggleTheme} 
          onMouseEnter={() => audio.playHoverSound()}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="slide-wrapper" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="controls flex items-center gap-2">
        <button 
          className="btn flex items-center gap-1" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playClickSound(); prevSlide(); }} 
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={18} /> Prev
        </button>
        <div className="flex items-center gap-1 mx-2">
          {renderPagination()}
        </div>
        <button 
          className="btn flex items-center gap-1" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playClickSound(); nextSlide(); }} 
          disabled={currentSlide === SLIDES.length - 1}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default App;
