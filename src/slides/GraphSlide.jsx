import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function GraphSlide() {
  const [activeTab, setActiveTab] = useState('visual');

  const codeString = `// Graph Interpretation (BFS Pruning)
void solve() {
    vector<int> min_dist_to_black(n + 1, INF);
    int ans = INF;
    
    // lambda for the BFS pruning operation
    auto update = [&](int start_node) {
        queue<int> q;
        q.push(start_node);
        min_dist_to_black[start_node] = 0;
        
        while (!q.empty()) {
            int u = q.front(); q.pop();
            
            // Critical Pruning Condition!
            if (min_dist_to_black[u] >= ans) continue;
            
            for (int v : adj[u]) {
                if (min_dist_to_black[u] + 1 < min_dist_to_black[v]) {
                    min_dist_to_black[v] = min_dist_to_black[u] + 1;
                    q.push(v);
                }
            }
        }
    };
    
    update(c[0]); // initially black node
    for (int i = 1; i < n; i++) {
        ans = min(ans, min_dist_to_black[c[i]]);
        update(c[i]);
        cout << ans << " ";
    }
}`;

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Graph Interpretation</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Viewing the tree as an undirected graph, we can use Multi-Source BFS with pruning.</p>

      <div className="flex gap-4 justify-center mb-6">
        <button onClick={() => setActiveTab('visual')} className={`btn ${activeTab === 'visual' ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}>Visual Explanation</button>
        <button onClick={() => setActiveTab('code')} className={`btn ${activeTab === 'code' ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}>Graph BFS Code</button>
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
              <div className="content-box flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 text-accent-color z-10">BFS Pruning Visualized</h3>
                <div className="flex items-center justify-center w-full max-w-2xl gap-8 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-black border-4 border-accent-color flex items-center justify-center text-[var(--text-color)] font-bold shadow-[0_0_15px_rgba(0,240,255,0.8)]">New</div>
                    <span className="text-[var(--text-muted)]">New Black</span>
                  </div>
                  
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "200px" }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 bg-gradient-to-r from-accent-color to-accent-tertiary relative"
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[var(--text-color)] whitespace-nowrap">BFS Expansion</span>
                  </motion.div>

                  <div className="flex flex-col items-center gap-2 relative">
                    <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-600 flex items-center justify-center text-[var(--text-color)] font-bold">Node</div>
                    <span className="text-[var(--text-muted)]">dist = 3</span>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute -right-20 top-0 text-red-400 font-bold bg-red-900/30 px-2 py-1 rounded border border-red-500/50"
                    >
                      STOP! dist ≥ ans
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-12 text-lg text-[var(--text-muted)] max-w-3xl text-center z-10">
                  We expand outward from the new node. If we hit a node that already has a <span className="highlight">min_dist_to_black</span> shorter or equal to our current path length, we completely halt expansion in that direction!
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
                  <h3 className="text-xl font-bold mb-4 text-accent-secondary">Graph Interpretation Advantages</h3>
                  <ul className="list-disc pl-5 space-y-3 text-[var(--text-muted)]">
                    <li><strong className="text-accent-color">No Tree Specifics:</strong> Doesn't rely on Lowest Common Ancestor (LCA) or Centroids.</li>
                    <li><strong className="text-accent-color">Clean Logic:</strong> Simple BFS queue.</li>
                    <li><strong className="text-accent-color">Cache Friendly:</strong> BFS access patterns are generally cache-friendly.</li>
                  </ul>
                </div>
                <div className="content-box m-0 p-6 border-accent-tertiary">
                  <h3 className="text-xl font-bold mb-2 text-accent-tertiary">Drawbacks</h3>
                  <p className="text-[var(--text-muted)]">
                    The time complexity relies heavily on the "average" case of the early stopping condition. While amortized it is O(N), proving the worst-case O(N) requires a careful amortization argument.
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