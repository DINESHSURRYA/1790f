import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Database, Zap } from 'lucide-react';

export default function ComplexitySlide() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const methods = [
    { name: "Brute Force", time: "O(N²)", space: "O(N)", height: 100, color: "#ff0055" },
    { name: "Tree (Centroid)", time: "O(N log² N)", space: "O(N log N)", height: 40, color: "#7000ff" },
    { name: "Optimal (Graph BFS)", time: "O(N)", space: "O(N)", height: 10, color: "#00f0ff" }
  ];

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Complexity Analysis</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">Comparing the performance of different approaches.</p>

      <div className="flex-1 flex gap-8">
        {/* Left Column: Bar Chart */}
        <div className="flex-1 flex flex-col">
          <div className="content-box flex-1 flex flex-col justify-end p-8 relative overflow-hidden">
            <h3 className="absolute top-6 left-6 text-xl font-bold flex items-center gap-2 text-[var(--text-color)]">
              <BarChart3 className="text-accent-color" /> Operations Growth (N = 200,000)
            </h3>
            
            <div className="flex justify-around items-end h-[70%] w-full border-b-2 border-l-2 border-gray-600 pb-2 pl-4">
              {methods.map((m, i) => (
                <div key={i} className="flex flex-col justify-end items-center gap-4 w-1/4 h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={animate ? { height: `${m.height}%` } : { height: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.3 }}
                    className="w-full rounded-t-md opacity-80"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 15px ${m.color}80` }}
                  />
                  <div className="text-center">
                    <p className="font-bold text-[var(--text-color)] text-lg">{m.name}</p>
                    <p className="text-accent-color font-mono">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-2 top-[30%] -rotate-90 text-[var(--text-muted)] text-sm tracking-widest uppercase">
              Operations (Log Scale visual)
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div className="w-[40%] flex flex-col gap-6">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="content-box m-0 p-6 border-accent-color"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-color"><Clock /> Time Complexity</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[var(--text-muted)] font-bold">Best Case: <span className="font-mono text-accent-color">O(1)</span> per query</p>
                <p className="text-sm text-[var(--text-muted)]">If the newly colored node is immediately adjacent to an existing black node, BFS stops instantly.</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] font-bold">Average Case: <span className="font-mono text-accent-color">O(1)</span> amortized</p>
                <p className="text-sm text-[var(--text-muted)]">Due to the pruning condition, the BFS rarely explores far.</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] font-bold">Worst Case (Overall): <span className="font-mono text-accent-tertiary">O(N)</span> total</p>
                <p className="text-sm text-[var(--text-muted)]">The sum of all BFS queue pushes across ALL n-1 operations is bounded by N. Every node's <code>min_dist_to_black</code> strictly decreases, and it can only decrease from N down to 0.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="content-box m-0 p-6 border-accent-secondary"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-secondary"><Database /> Space Complexity</h3>
            <p className="text-[var(--text-muted)] text-lg mb-2">
              Total Space: <span className="font-mono text-accent-secondary font-bold">O(N)</span>
            </p>
            <ul className="list-disc pl-5 text-[var(--text-muted)] text-sm space-y-1">
              <li>Adjacency list <code>adj</code>: O(N)</li>
              <li>Array <code>min_dist_to_black</code>: O(N)</li>
              <li>BFS <code>queue</code>: O(N) in worst case</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}