import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Square } from 'lucide-react';

export default function DryRunSlide() {
  const [step, setStep] = useState(0);

  const dryRunSteps = [
    {
      state: "Initial: ans = ∞, black = {6}",
      op: "Node 4 turns black",
      reason: "min_dist_to_black[4] = ∞ (≥ ∞ is false). Run BFS from 4.",
      update: "min_dist_to_black updated for all nodes. ans = min(∞, dist(4,6)) = 3",
      color: "border-accent-secondary"
    },
    {
      state: "ans = 3, black = {6, 4}",
      op: "Node 1 turns black",
      reason: "min_dist_to_black[1] = 2 (path 1-3-4). Since 2 < ans (3), we BFS from 1.",
      update: "BFS updates nodes closer to 1. ans = min(3, 2) = 2",
      color: "border-accent-color"
    },
    {
      state: "ans = 2, black = {6, 4, 1}",
      op: "Node 3 turns black",
      reason: "min_dist_to_black[3] = 1 (path 3-1). Since 1 < ans (2), BFS from 3.",
      update: "BFS from 3 updates neighbors. ans = min(2, 1) = 1",
      color: "border-accent-tertiary"
    },
    {
      state: "ans = 1, black = {6, 4, 1, 3}",
      op: "Node 5 turns black",
      reason: "min_dist_to_black[5] = 1 (path 5-6). Since 1 >= ans (1), BFS from 5 is severely pruned immediately!",
      update: "ans = min(1, 1) = 1. BFS stops at depth 1.",
      color: "border-yellow-400"
    }
  ];

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Full Dry Run</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Tracing the internal states step-by-step.</p>

      <div className="flex gap-4 justify-center mb-8">
        <button className="btn btn-primary" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous Step</button>
        <button className="btn btn-primary" onClick={() => setStep(s => Math.min(dryRunSteps.length - 1, s + 1))} disabled={step === dryRunSteps.length - 1}>Next Step</button>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-800 rounded"></div>
        
        <AnimatePresence>
          {dryRunSteps.map((s, idx) => (
            idx <= step && (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative pl-16 mb-8"
              >
                <div className={`absolute left-[26px] top-6 w-4 h-4 rounded-full bg-black border-4 ${s.color}`}></div>
                
                <div className={`content-box m-0 p-6 border-l-4 ${s.color}`}>
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <div className="text-sm text-[var(--text-muted)] font-mono mb-1">Current State</div>
                      <div className="font-bold text-[var(--text-color)] bg-gray-900 p-3 rounded border border-[color:var(--border-color)]">{s.state}</div>
                    </div>
                    
                    <ArrowRight className="text-[var(--text-muted)] shrink-0" size={32} />
                    
                    <div className="flex-1">
                      <div className="text-sm text-accent-color font-mono mb-1">Operation & Reason</div>
                      <div className="font-bold text-accent-color bg-[rgba(0,240,255,0.1)] p-3 rounded border border-[rgba(0,240,255,0.2)]">
                        {s.op}<br/>
                        <span className="text-sm font-normal text-[var(--text-muted)] mt-2 block">{s.reason}</span>
                      </div>
                    </div>

                    <ArrowRight className="text-[var(--text-muted)] shrink-0" size={32} />
                    
                    <div className="flex-1">
                      <div className="text-sm text-accent-secondary font-mono mb-1">Updated State</div>
                      <div className="font-bold text-[var(--text-color)] bg-[rgba(112,0,255,0.1)] p-3 rounded border border-[rgba(112,0,255,0.3)]">{s.update}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}