import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, GitCommit, Star } from 'lucide-react';

export default function EdgeCasesSlide() {
  const [activeCase, setActiveCase] = useState('line');

  const cases = {
    line: {
      icon: <GitCommit size={24} />,
      title: "Line Graph (Path Graph)",
      desc: "N nodes connected in a single straight line. Depth can reach O(N).",
      input: "N=5. Edges: 1-2, 2-3, 3-4, 4-5. Black ops: 5, 1, 3, 2, 4.",
      execution: "BFS from 1 reaches depth 4. Later BFS operations are pruned INSTANTLY because min_dist_to_black is already very small.",
      output: "4 2 1 1"
    },
    star: {
      icon: <Star size={24} />,
      title: "Star Graph",
      desc: "1 central node connected to N-1 leaves. Depth is max 2.",
      input: "N=5. Edges: 1-2, 1-3, 1-4, 1-5. Black ops: 2, 3, 4, 5, 1.",
      execution: "Since max distance is 2, BFS never exceeds depth 2. All operations take O(1) time.",
      output: "2 2 2 1"
    }
  };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Extreme Edge Cases</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">How does our pruning handle the absolute worst possible inputs?</p>

      <div className="flex justify-center gap-4 mb-8">
        {Object.keys(cases).map(key => (
          <button
            key={key}
            onClick={() => setActiveCase(key)}
            className={`btn flex items-center gap-2 ${activeCase === key ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}
          >
            {cases[key].icon} {cases[key].title}
          </button>
        ))}
      </div>

      <div className="flex-1 flex justify-center items-start pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <div className="content-box m-0 border-accent-tertiary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-accent-tertiary">
                <AlertTriangle size={200} />
              </div>
              
              <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4">{cases[activeCase].title}</h2>
              <p className="text-xl text-[var(--text-muted)] mb-8">{cases[activeCase].desc}</p>
              
              <div className="grid grid-cols-3 gap-6 relative z-10">
                <div className="bg-[rgba(255,255,255,0.05)] border border-[color:var(--border-color)] rounded-lg p-6">
                  <h4 className="text-accent-secondary font-bold font-mono mb-2">INPUT</h4>
                  <p className="text-[var(--text-muted)]">{cases[activeCase].input}</p>
                </div>
                
                <div className="bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.3)] rounded-lg p-6">
                  <h4 className="text-accent-color font-bold font-mono mb-2">EXECUTION</h4>
                  <p className="text-[var(--text-muted)]">{cases[activeCase].execution}</p>
                </div>
                
                <div className="bg-[rgba(112,0,255,0.1)] border border-accent-secondary rounded-lg p-6">
                  <h4 className="text-accent-secondary font-bold font-mono mb-2">OUTPUT</h4>
                  <p className="text-[var(--text-color)] font-mono text-xl">{cases[activeCase].output}</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <span className="inline-block bg-green-900/40 text-green-400 border border-green-500/50 px-4 py-2 rounded-full font-bold">
                  Verdict: Passed (O(N) Time Maintained)
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}