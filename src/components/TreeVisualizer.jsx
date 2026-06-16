import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ZoomIn, ZoomOut } from 'lucide-react';
import { audio } from '../utils/audioEngine';

export default function TreeVisualizer({ nodes, edges, sequence }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [graphZoom, setGraphZoom] = useState(1);

  useEffect(() => {
    let timer;
    if (isPlaying && step < sequence.length - 1) {
      timer = setTimeout(() => setStep(s => s + 1), 1500);
    } else if (step >= sequence.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, sequence]);

  const currentBlackNodes = sequence[step].blackNodes;
  const currentPositivity = sequence[step].positivity;
  const description = sequence[step].description;

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex gap-4 mb-4">
        <button 
          className="btn-icon" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playSimulationSound(); setStep(0); setIsPlaying(false); }} 
          disabled={step === 0}
        >
          <SkipBack size={20} />
        </button>
        <button 
          className="btn-icon" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playSimulationSound(); setStep(s => Math.max(0, s - 1)); }} 
          disabled={step === 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
        </button>
        <button 
          className="btn-icon" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playSimulationSound(); setIsPlaying(!isPlaying); }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          className="btn-icon" 
          onMouseEnter={() => audio.playHoverSound()}
          onClick={() => { audio.playSimulationSound(); setStep(s => Math.min(sequence.length - 1, s + 1)); }} 
          disabled={step === sequence.length - 1}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
        </button>
      </div>

      <div className="flex gap-8 w-full">
        <div className="flex-1 rounded-xl relative overflow-hidden" style={{ minHeight: '400px', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <div className="absolute top-2 right-2 flex gap-1 p-1 rounded-lg z-10" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
            <button 
              className="btn-icon w-8 h-8" 
              onMouseEnter={() => audio.playHoverSound()}
              onClick={() => { audio.playClickSound(); setGraphZoom(z => Math.max(0.2, z - 0.2)); }} 
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <button 
              className="btn-icon w-8 h-8" 
              onMouseEnter={() => audio.playHoverSound()}
              onClick={() => { audio.playClickSound(); setGraphZoom(z => z + 0.2); }} 
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          <svg width="100%" height="100%" viewBox="-150 -150 300 300">
            <g transform={`scale(${graphZoom})`}>
              {/* Edges */}
            {edges.map((edge, i) => {
              const u = nodes.find(n => n.id === edge[0]);
              const v = nodes.find(n => n.id === edge[1]);
              return (
                <line 
                  key={i} 
                  x1={u.x} y1={u.y} x2={v.x} y2={v.y} 
                  stroke="var(--text-muted)" 
                  strokeWidth="3" 
                />
              );
            })}
            
            {/* Nodes */}
            {nodes.map(node => {
              const isBlack = currentBlackNodes.includes(node.id);
              const isNewlyBlack = isBlack && step > 0 && !sequence[step-1].blackNodes.includes(node.id);
              
              return (
                <motion.g key={node.id} animate={{ x: node.x, y: node.y }}>
                  <motion.circle 
                    r="18"
                    animate={{
                      fill: isBlack ? '#111' : '#fff',
                      stroke: isBlack ? '#00f0ff' : '#666',
                      strokeWidth: isNewlyBlack ? 4 : 2
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  {isNewlyBlack && (
                    <motion.circle 
                      r="25"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2"
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  )}
                  <text 
                    textAnchor="middle" 
                    dy=".3em" 
                    fill={isBlack ? '#fff' : '#000'}
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {node.id}
                  </text>
                </motion.g>
              );
            })}
            </g>
          </svg>
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          <div className="content-box m-0 p-4">
            <h3 className="text-xl font-bold mb-2">Operation {step}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{description}</p>
          </div>
          <div className="content-box m-0 p-4 border-accent-tertiary">
            <h3 className="text-xl font-bold mb-2 text-accent-tertiary">Current Positivity</h3>
            <div className="text-5xl font-mono font-bold text-center glow-effect py-4 rounded-lg" style={{ color: 'var(--accent-tertiary)', background: 'rgba(255,0,85,0.1)' }}>
              {currentPositivity === Infinity ? '∞' : currentPositivity}
            </div>
          </div>
          <div className="content-box m-0 p-4 border-accent-secondary">
            <h3 className="text-xl font-bold mb-2 text-accent-secondary">Output Array</h3>
            <div className="font-mono text-xl p-3 bg-[rgba(112,0,255,0.1)] rounded break-all font-bold tracking-widest" style={{ color: 'var(--text-color)', minHeight: '4rem' }}>
              {sequence.slice(1, step + 1).map(s => s.positivity === Infinity ? '∞' : s.positivity).join(' ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
