import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, CheckCircle } from 'lucide-react';

export default function ObservationSlide() {
  const [step, setStep] = useState(0);

  const observations = [
    {
      title: "Observation 1: Monotonicity",
      text: "The answer (minimum distance) NEVER increases. It can only decrease or stay the same when a new node turns black. If our current answer is min_dist, we ONLY care about finding paths strictly shorter than min_dist."
    },
    {
      title: "Observation 2: Reversing the Search",
      text: "Instead of searching from all black nodes, we can just run a BFS starting ONLY from the newly colored black node to find if it forms a shorter path to any existing black node."
    },
    {
      title: "Observation 3: The Pruning Intuition (Part 1)",
      text: "During this BFS, if we reach a depth >= min_dist, we should STOP! Why? Because any path continuing from this depth will be ≥ min_dist, which won't improve our answer."
    },
    {
      title: "Observation 4: Remembering Past Searches",
      text: "What if we maintain an array min_dist_to_black[v] for every node v? This array stores the shortest distance from v to ANY black node we have seen so far."
    },
    {
      title: "Observation 5: The Ultimate Pruning Condition!",
      text: "When our BFS reaches node v at depth d, if d >= min_dist_to_black[v], we STOP! Why? Because we previously found a path to a black node that was shorter or equal. Continuing would be redundant. We update min_dist_to_black[v] = d and continue otherwise."
    }
  ];

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Building Intuition</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">Let's discover the optimal solution step-by-step. Don't look for the answer—build it.</p>
      
      <div className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="w-full space-y-4">
          <AnimatePresence>
            {observations.map((obs, idx) => (
              idx <= step && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={`content-box m-0 ${idx === observations.length - 1 ? 'border-accent-tertiary shadow-[0_0_30px_rgba(255,0,85,0.2)]' : 'border-accent-color'}`}
                >
                  <h3 className={`text-xl font-bold flex items-center gap-3 mb-2 ${idx === observations.length - 1 ? 'text-accent-tertiary' : 'text-accent-color'}`}>
                    {idx === observations.length - 1 ? <CheckCircle size={24} /> : <Search size={24} />}
                    {obs.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-lg leading-relaxed">{obs.text}</p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {step < observations.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setStep(s => s + 1)}
            className="mt-8 btn-primary flex items-center gap-2"
          >
            Reveal Next Observation <ChevronDown size={20} />
          </motion.button>
        )}

        {step === observations.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-[rgba(0,240,255,0.1)] border border-accent-color rounded-xl text-center glow-effect"
          >
            <h2 className="text-2xl font-bold text-[var(--text-color)] mb-2">We found the Optimal Strategy!</h2>
            <p className="text-[var(--text-muted)]">
              This pruning reduces the total sum of BFS operations across all steps to exactly <strong>O(N)</strong> in total!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}