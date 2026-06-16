import React, { useState } from 'react';
import { Network, Database, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function TreeSlide() {
  const [activeTab, setActiveTab] = useState('visual');

  const codeString = `// Tree Interpretation (Centroid Decomposition)
void update(int u) {
    int v = u;
    while (v != 0) {
        // ans[v] stores min distance to any black node in v's centroid subtree
        ans[v] = min(ans[v], dist(u, v));
        v = parent_centroid[v];
    }
}

int query(int u) {
    int min_dist = INF;
    int v = u;
    while (v != 0) {
        min_dist = min(min_dist, ans[v] + dist(u, v));
        v = parent_centroid[v];
    }
    return min_dist;
}`;

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Tree Interpretation</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Exploiting the tree structure using Centroid Decomposition & Lowest Common Ancestor (LCA).</p>

      <div className="flex gap-4 justify-center mb-6">
        <button onClick={() => setActiveTab('visual')} className={`btn ${activeTab === 'visual' ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}>Visual Explanation</button>
        <button onClick={() => setActiveTab('code')} className={`btn ${activeTab === 'code' ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}>Tree Code</button>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'visual' && (
            <motion.div
              key="visual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col gap-6"
            >
              <div className="h-full flex flex-col gap-6 justify-center">
                <div className="text-center mb-4 z-10">
                  <h3 className="text-2xl font-bold text-[var(--text-color)]">How Centroid Decomposition solves 1790F</h3>
                  <p className="text-[var(--text-muted)] mt-2">Instead of BFS pruning, we can rigorously bound the tree depth.</p>
                </div>
                
                <div className="flex gap-6 w-full max-w-6xl mx-auto">
                  <motion.div 
                    className="content-box flex-1 flex flex-col items-center p-6 border-accent-secondary"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="mb-4 bg-[var(--bg-color)] p-4 rounded-full border-2 border-accent-secondary shadow-[0_0_15px_rgba(112,0,255,0.3)]">
                      <Network size={40} className="text-accent-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--text-color)] text-center">1. Centroid Tree</h3>
                    <p className="text-[var(--text-muted)] text-center text-sm leading-relaxed">
                      Recursively find the centroid of the tree to build a "Centroid Tree". This guarantees the maximum depth of the new tree is strictly <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">O(log N)</span>.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="content-box flex-1 flex flex-col items-center p-6 border-accent-color relative"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-2xl text-[var(--text-muted)]">➔</div>
                    <div className="mb-4 bg-[var(--bg-color)] p-4 rounded-full border-2 border-accent-color shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <Database size={40} className="text-accent-color" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--text-color)] text-center">2. State Maintenance</h3>
                    <p className="text-[var(--text-muted)] text-center text-sm leading-relaxed">
                      Each node <code>u</code> stores <code>min_dist[u]</code>: the minimum distance from <code>u</code> to any <strong className="text-[var(--text-color)]">black node</strong> that exists within its centroid subtree.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="content-box flex-1 flex flex-col items-center p-6 border-accent-tertiary relative"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-2xl text-[var(--text-muted)]">➔</div>
                    <div className="mb-4 bg-[var(--bg-color)] p-4 rounded-full border-2 border-accent-tertiary shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                      <Zap size={40} className="text-accent-tertiary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--text-color)] text-center">3. Fast Queries</h3>
                    <p className="text-[var(--text-muted)] text-center text-sm leading-relaxed">
                      When querying or coloring a node, we only need to climb its <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">O(log N)</span> centroid ancestors. The overall time mathematically drops to <span className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold">O(N log² N)</span>!
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex gap-6"
            >
              <div className="flex-1 bg-[#0d1117] border border-[color:var(--border-color)] rounded-xl overflow-auto">
                <SyntaxHighlighter
                  language="cpp"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                  showLineNumbers={true}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
              <div className="w-1/3 flex flex-col gap-4">
                <div className="content-box m-0 p-6">
                  <h3 className="text-xl font-bold mb-4 text-accent-secondary">Tree Interpretation Advantages</h3>
                  <ul className="list-disc pl-5 space-y-3 text-[var(--text-muted)]">
                    <li><strong className="text-accent-color">Strict Bounds:</strong> Depth is strictly bounded by <span className="font-mono text-accent-tertiary">O(log N)</span>.</li>
                    <li><strong className="text-accent-color">Versatile:</strong> Centroid Decomposition is a powerful, generic technique for path queries on trees.</li>
                  </ul>
                </div>
                <div className="content-box m-0 p-6 border-accent-tertiary">
                  <h3 className="text-xl font-bold mb-2 text-accent-tertiary">Drawbacks</h3>
                  <p className="text-[var(--text-muted)] mb-2">
                    Implementation is complex. Requires building the LCA table <span className="font-mono">O(N log N)</span>, finding centroids recursively <span className="font-mono">O(N log N)</span>, and then processing.
                  </p>
                  <p className="text-[var(--text-muted)]">
                    High constant factor compared to the graph (BFS pruning) approach.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}