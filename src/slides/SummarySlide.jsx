import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Terminal } from 'lucide-react';

export default function SummarySlide() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const item = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Final Summary</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">The complete journey from naive to optimal.</p>

      <div className="flex-1 flex gap-8 max-w-5xl mx-auto w-full">
        <div className="flex-1 flex flex-col gap-6">
          <motion.div variants={container} initial="hidden" animate="show" className="content-box m-0 flex-1 border-accent-secondary">
            <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)] flex items-center gap-2"><Award className="text-accent-color" /> Key Takeaways</h3>
            
            <motion.div variants={item} className="flex items-start gap-4 mb-4">
              <CheckCircle className="text-accent-secondary mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[var(--text-color)] text-xl mb-1">The Problem</h4>
                <p className="text-[var(--text-muted)]">Codeforces 1790F: Maintain the minimum distance between any two black nodes in a tree as new nodes are sequentially colored black.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-start gap-4 mb-4">
              <CheckCircle className="text-accent-secondary mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[var(--text-color)] text-xl mb-1">The Intuition</h4>
                <p className="text-[var(--text-muted)]">The minimum distance (positivity) NEVER increases. It is monotonic.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-start gap-4 mb-4">
              <CheckCircle className="text-accent-color mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[var(--text-color)] text-xl mb-1">The Algorithm</h4>
                <p className="text-[var(--text-muted)]">Multi-Source BFS with strict depth-pruning based on the current minimum distance and previous node discoveries.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-start gap-4">
              <CheckCircle className="text-accent-tertiary mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[var(--text-color)] text-xl mb-1">The Complexity</h4>
                <p className="text-[var(--text-muted)]">Time: <span className="font-mono px-2 py-0.5 mx-1 bg-[var(--border-color)] rounded text-[var(--text-color)]">O(N)</span> &nbsp;&nbsp;Space: <span className="font-mono px-2 py-0.5 mx-1 bg-[var(--border-color)] rounded text-[var(--text-color)]">O(N)</span>. Strictly faster than Centroid or Square Root Decomposition.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-1/3 flex flex-col gap-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 1, type: "spring" }}
             className="content-box m-0 flex-1 flex flex-col items-center justify-center text-center border-accent-color bg-[rgba(0,240,255,0.05)] glow-effect"
           >
             <Terminal size={64} className="text-accent-color mb-6" />
             <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4">Ready to Code?</h2>
             <p className="text-[var(--text-muted)] text-lg mb-8">You now have the absolute optimal intuition to solve this in under 10 minutes.</p>
             <button className="btn-primary w-full max-w-[200px]">Start Contest</button>
           </motion.div>
        </div>
      </div>
    </div>
  );
}