import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Layers, Zap } from 'lucide-react';

export default function UniqueSlide() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">A Unique Alternative Method</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">What if we didn't use BFS Pruning or Centroid Decomposition? Let's explore Square Root Decomposition!</p>

      <div className="flex-1 flex gap-8">
        <div className="w-1/2 flex flex-col gap-6">
          <motion.div variants={container} initial="hidden" animate="show" className="content-box m-0 border-accent-secondary flex-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent-secondary"><Layers /> Square Root Decomposition</h3>
            
            <motion.p variants={item} className="text-[var(--text-muted)] text-lg mb-4">
              Instead of processing each operation individually, we group the <span className="font-mono">n-1</span> operations into blocks of size <span className="font-mono text-accent-color">√N</span>.
            </motion.p>
            
            <motion.div variants={item} className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg mb-4 border border-[color:var(--border-color)]">
              <h4 className="font-bold text-accent-color mb-2">Phase 1: Block Rebuild</h4>
              <p className="text-[var(--text-muted)]">
                At the start of every block, we run a single <strong>Multi-Source BFS</strong> from ALL currently black nodes to compute the true minimum distance for every node in the tree. <span className="text-[var(--text-muted)] font-mono text-sm">(Takes O(N) time)</span>
              </p>
            </motion.div>

            <motion.div variants={item} className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[color:var(--border-color)]">
              <h4 className="font-bold text-accent-color mb-2">Phase 2: Intra-block Queries</h4>
              <p className="text-[var(--text-muted)]">
                For a new black node <span className="font-mono">u</span> inside the block, its distance to existing black nodes is the minimum of:
              </p>
              <ul className="list-disc pl-6 mt-2 text-[var(--text-muted)]">
                <li>Its distance to any black node from the last rebuild (already computed).</li>
                <li>Its distance to any of the <span className="font-mono">≤ √N</span> nodes colored black <em>within the current block</em>. We find these distances using <strong>LCA (Lowest Common Ancestor)</strong> in <span className="font-mono text-accent-color">O(log N)</span> or <span className="font-mono text-accent-color">O(1)</span> time.</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="content-box m-0 border-accent-tertiary">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-tertiary"><Zap /> Complexity Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[color:var(--border-color)] pb-2">
                <span className="text-[var(--text-muted)]">Time Complexity</span>
                <span className="font-mono text-accent-tertiary font-bold">O(N √N log N)</span>
              </div>
              <div className="flex justify-between items-center border-b border-[color:var(--border-color)] pb-2">
                <span className="text-[var(--text-muted)]">Space Complexity</span>
                <span className="font-mono text-accent-color font-bold">O(N log N)</span> <span className="text-[var(--text-muted)] text-sm">(for LCA)</span>
              </div>
            </div>

            <h4 className="font-bold mt-6 mb-2 text-[var(--text-color)]">When is this useful?</h4>
            <p className="text-[var(--text-muted)]">
              While our BFS Pruning method <span className="font-mono">(O(N))</span> is strictly faster, Square Root Decomposition is highly versatile. It doesn't rely on the "distance strictly decreasing" property. It can handle queries even if nodes were allowed to turn back to white (dynamic updates)!
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="content-box m-0 flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]">
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Lightbulb size={48} className="text-accent-color mb-4" />
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">Think Outside the Box</h3>
                <p className="text-[var(--text-muted)]">In interviews, providing an alternative paradigm (like chunking/blocks) shows deep algorithmic maturity.</p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}