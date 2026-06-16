import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, CheckSquare } from 'lucide-react';

export default function ProofSlide() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Rigorous Proof of Correctness</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">Why does this BFS pruning guarantee the absolute shortest path without missing anything?</p>

      <motion.div variants={container} initial="hidden" animate="show" className="flex-1 grid grid-cols-2 gap-8">
        <motion.div variants={item} className="content-box m-0 border-accent-secondary">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-secondary"><CheckSquare /> Why it NEVER misses a valid answer</h3>
          <p className="text-[var(--text-muted)] mb-4">
            Suppose there exists a pair of black nodes <span className="font-mono">A</span> and <span className="font-mono">B</span> with distance <span className="font-mono">d &lt; ans</span>.
          </p>
          <p className="text-[var(--text-muted)]">
            When <span className="font-mono">B</span> is colored black, we BFS from <span className="font-mono">B</span>. 
            Will the BFS reach <span className="font-mono">A</span>? Yes! Because every node <span className="font-mono">x</span> on the shortest path between <span className="font-mono">B</span> and <span className="font-mono">A</span> has a distance to <span className="font-mono">A</span> less than <span className="font-mono">d</span>. 
            Since <span className="font-mono">d &lt; ans</span>, no node on the path will trigger the pruning condition <span className="font-mono">dist[x] &gt;= ans</span>. Thus, the BFS explores the entire path and successfully updates <span className="font-mono">ans</span>.
          </p>
        </motion.div>

        <motion.div variants={item} className="content-box m-0 border-accent-color">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-color"><ShieldAlert /> Why it NEVER produces a wrong answer</h3>
          <p className="text-[var(--text-muted)] mb-4">
            Could the algorithm report a distance smaller than the true minimum?
          </p>
          <p className="text-[var(--text-muted)]">
            No. The <span className="highlight">min_dist_to_black</span> array is strictly updated by BFS levels (+1 per step). By definition, BFS on an unweighted graph yields the true shortest path. The algorithm only takes the minimum of valid BFS paths.
          </p>
        </motion.div>

        <motion.div variants={item} className="content-box m-0 border-accent-tertiary">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-tertiary"><Fingerprint /> Boundary & Edge Case Proof</h3>
          <ul className="list-disc pl-5 space-y-3 text-[var(--text-muted)]">
            <li><strong>Line Graph (Path Graph):</strong> Pruning limits BFS to exactly <span className="font-mono">O(ans)</span> nodes, which drops exponentially. Valid.</li>
            <li><strong>Star Graph:</strong> BFS depth is max 2. All nodes are updated in <span className="font-mono">O(1)</span> operations. Pruning hits immediately. Valid.</li>
            <li><strong>Two adjacent black nodes initially:</strong> <span className="font-mono">ans</span> drops to 1. Future BFS operations are immediately pruned at depth 1. <span className="font-mono">O(N)</span> total. Valid.</li>
          </ul>
        </motion.div>
        
        <motion.div variants={item} className="content-box m-0 bg-[rgba(255,255,255,0.02)] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center mb-4 border border-accent-color glow-effect">
            <span className="text-4xl">Q.E.D.</span>
          </div>
          <p className="text-accent-color font-bold text-xl">The algorithm is rigorously proven.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}