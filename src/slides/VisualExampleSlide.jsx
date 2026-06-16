import React from 'react';
import { motion } from 'framer-motion';
import TreeVisualizer from '../components/TreeVisualizer';

export default function VisualExampleSlide() {
  const nodes = [
    { id: 1, x: -100, y: -40 },
    { id: 3, x: -20, y: 0 },
    { id: 5, x: 60, y: 40 },
    { id: 6, x: 140, y: 80 },
    { id: 4, x: 20, y: -80 },
    { id: 2, x: 80, y: -140 },
  ];

  const edges = [
    [2, 4], [6, 5], [5, 3], [3, 4], [1, 3]
  ];

  const sequence = [
    {
      blackNodes: [6],
      positivity: Infinity,
      description: "Initial state. Only vertex 6 is black. Since there is only 1 black vertex, the minimum distance between any pair is Infinity."
    },
    {
      blackNodes: [6, 4],
      positivity: 3,
      description: "Operation 1: Paint vertex 4 black. Distance between 6 and 4 is 3 (6-5-3-4). Positivity becomes 3."
    },
    {
      blackNodes: [6, 4, 1],
      positivity: 2,
      description: "Operation 2: Paint vertex 1 black. Distances: d(1,4)=2, d(1,6)=3, d(4,6)=3. Minimum distance is 2. Positivity becomes 2."
    },
    {
      blackNodes: [6, 4, 1, 3],
      positivity: 1,
      description: "Operation 3: Paint vertex 3 black. Distance between 1 and 3 is 1. Positivity drops to 1."
    },
    {
      blackNodes: [6, 4, 1, 3, 5],
      positivity: 1,
      description: "Operation 4: Paint vertex 5 black. Minimum distance remains 1 (e.g., between 1 and 3)."
    },
    {
      blackNodes: [6, 4, 1, 3, 5, 2],
      positivity: 1,
      description: "Operation 5: Paint vertex 2 black. Minimum distance remains 1. Output is: 3 2 1 1 1."
    }
  ];

  return (
    <div className="slide">
      <h1 className="title text-center">Visual Understanding</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">Let's walk through an interactive example to understand how the state updates.</p>
      
      <div className="flex-1">
        <TreeVisualizer nodes={nodes} edges={edges} sequence={sequence} />
      </div>
    </div>
  );
}