import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ShieldCheck, Zap } from 'lucide-react';

export default function OptimalSlide() {
  const [sliderVal, setSliderVal] = useState(3);

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">The Optimal Solution</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Deriving the multi-source BFS with strict depth-pruning.</p>

      <div className="flex-1 flex gap-6">
        <div className="w-1/2 flex flex-col gap-6">
          <div className="content-box m-0 border-accent-color relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-accent-color"><Zap size={100} /></div>
            <h3 className="text-2xl font-bold mb-4 text-accent-color flex items-center gap-2"><TrendingDown /> Core Intuition</h3>
            <p className="text-[var(--text-muted)] text-lg mb-4">
              We maintain a global variable <span className="highlight">ans</span> representing the minimum distance between any two black vertices. 
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-4">
              When a node <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">v</span> turns black, we start a BFS from <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">v</span>. The goal is to update the shortest distance from every visited node to its nearest black node, stored in <span className="highlight">min_dist_to_black[]</span>.
            </p>
            <p className="text-[var(--text-color)] text-lg font-bold">
              Crucial Pruning: If during our BFS we are at distance <span className="font-mono text-accent-tertiary">d</span> from <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">v</span>, and <span className="font-mono text-accent-tertiary">d {'>='} ans</span> OR <span className="font-mono text-accent-tertiary">d {'>='} min_dist_to_black[u]</span>, we abort!
            </p>
          </div>

          <div className="content-box m-0 border-accent-secondary">
            <h3 className="text-2xl font-bold mb-4 text-accent-secondary flex items-center gap-2"><ShieldCheck /> Invariant Maintained</h3>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted)] text-lg">
              <li><span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">ans</span> is strictly non-increasing.</li>
              <li><span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">min_dist_to_black[u]</span> correctly stores the distance to the closest black node discovered <strong>so far</strong>.</li>
              <li>A path of length <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">≥ ans</span> can never become the new strict minimum, so exploring it is wasted computation.</li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <div className="content-box m-0 flex-1 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Interactive State Transition</h3>
            <p className="text-[var(--text-muted)] mb-8 text-center max-w-md">Adjust the global <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">ans</span> to see how deep the BFS is allowed to penetrate into the tree.</p>
            
            <div className="w-full max-w-md bg-[var(--card-bg)] p-6 rounded-xl border border-[color:var(--border-color)]">
              <div className="flex justify-between text-[var(--text-color)] font-bold mb-4">
                <span>Global <span className="text-accent-color">ans</span>: {sliderVal}</span>
                <span>Max Depth Allowed: {sliderVal - 1}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={sliderVal} 
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full cursor-pointer accent-accent-color"
              />
              
              <div className="mt-8 flex justify-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-black rounded-full border-4 border-accent-color z-10 relative flex items-center justify-center text-[var(--text-color)] font-bold">New</div>
                  {/* Concentric rings representing BFS expansion allowed by slider */}
                  {[...Array(sliderVal)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute top-1/2 left-1/2 rounded-full border-2 border-dashed border-accent-color"
                      style={{ 
                        width: `${(i+1) * 60}px`, 
                        height: `${(i+1) * 60}px`,
                        marginLeft: `-${(i+1) * 30}px`,
                        marginTop: `-${(i+1) * 30}px`,
                        opacity: 1 - (i * 0.15)
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 50, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="mt-auto text-center text-accent-tertiary font-bold pt-16">
              Notice how shrinking <span className="font-mono">ans</span> massively reduces the search space!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}