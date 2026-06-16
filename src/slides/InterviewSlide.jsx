import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function InterviewSlide() {
  const [openQ, setOpenQ] = useState(0);

  const questions = [
    {
      q: "Why did you choose this approach over Centroid Decomposition?",
      a: "While Centroid Decomposition is academically elegant for tree path problems (O(N log² N)), the BFS Pruning method is strictly faster (O(N) total), requires significantly less memory, and is much simpler to implement bug-free in a high-pressure interview or contest setting."
    },
    {
      q: "Can the space complexity be further optimized?",
      a: "The space complexity is currently O(N) for the adjacency list and the distance array. This is the absolute theoretical minimum for storing a tree. Space cannot be optimized below O(N)."
    },
    {
      q: "What if the constraints increase? Say N = 10^7?",
      a: "At N = 10^7, O(N log N) methods like Centroid Decomposition would almost certainly hit Time Limit Exceeded (TLE) or Memory Limit Exceeded (MLE). Our BFS Pruning method runs in true O(N) time and space, making it the ONLY viable solution for such massive constraints."
    },
    {
      q: "Can we remove recursion to prevent stack overflow?",
      a: "Yes! Our optimal BFS Pruning method is already 100% iterative! It uses a std::queue. Unlike DFS or Centroid Decomposition which rely heavily on the call stack, our BFS guarantees no stack overflows, no matter how deep the tree is (e.g., a line graph)."
    },
    {
      q: "Why not use DFS instead of BFS?",
      a: "BFS guarantees that we find the SHORTEST paths level by level. If we used DFS, we might explore a very long path (say, depth 1000) before finding a shorter path (depth 2), rendering our pruning condition completely ineffective. BFS is mandatory for optimal pruning."
    }
  ];

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Interviewer Questions</h1>
      <p className="text-center text-[var(--text-muted)] mb-8">How to defend your solution in a FAANG interview.</p>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {questions.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`content-box m-0 overflow-hidden transition-all duration-300 ${openQ === idx ? 'border-accent-color shadow-[0_0_20px_rgba(0,240,255,0.15)]' : 'border-[color:var(--border-color)]'}`}
            >
              <button 
                onClick={() => setOpenQ(openQ === idx ? -1 : idx)}
                className="w-full text-left flex items-center justify-between outline-none"
              >
                <h3 className={`text-xl font-bold flex items-center gap-3 ${openQ === idx ? 'text-[var(--text-color)]' : 'text-[var(--text-muted)]'}`}>
                  <HelpCircle className={openQ === idx ? "text-accent-color" : "text-[var(--text-muted)]"} />
                  {item.q}
                </h3>
                <motion.div animate={{ rotate: openQ === idx ? 180 : 0 }}>
                  <ChevronDown className="text-[var(--text-muted)]" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openQ === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-[color:var(--border-color)] text-lg text-[var(--text-muted)] leading-relaxed pl-9 border-l-2 border-l-accent-color ml-2">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}