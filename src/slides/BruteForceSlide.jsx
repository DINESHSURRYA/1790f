import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, SkipForward, RotateCcw } from 'lucide-react';

export default function BruteForceSlide() {
  const [currentLine, setCurrentLine] = useState(0);

  const codeString = `int min_dist = INF;

void solve() {
    for (int i = 1; i < n; i++) {
        int newly_black = c[i];
        
        // BFS to find the closest black node
        queue<int> q;
        vector<int> dist(n + 1, INF);
        q.push(newly_black);
        dist[newly_black] = 0;
        
        while (!q.empty()) {
            int u = q.front(); q.pop();
            
            if (is_black[u] && u != newly_black) {
                min_dist = min(min_dist, dist[u]);
                break;
            }
            
            for (int v : adj[u]) {
                if (dist[v] == INF) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        
        is_black[newly_black] = true;
        cout << min_dist << " ";
    }
}`;

  const explanations = [
    { line: 1, text: "We maintain a global min_dist tracking the minimum distance across all pairs." },
    { line: 3, text: "For each operation (each newly colored black node):" },
    { line: 4, text: "We get the node id that is being colored black." },
    { line: 6, text: "We prepare for a Breadth-First Search (BFS)." },
    { line: 7, text: "Initialize a queue for the BFS traversal." },
    { line: 8, text: "Create a distance array to track distances from the newly_black node, all initially Infinity." },
    { line: 9, text: "Push the starting node into the queue." },
    { line: 10, text: "Set the distance to itself as 0." },
    { line: 12, text: "Process nodes level by level until the queue is empty." },
    { line: 13, text: "Pop the front node u." },
    { line: 15, text: "If we hit a node that is ALREADY black, we found the closest black node!" },
    { line: 16, text: "Update our global min_dist. The new answer is the minimum of the old answer and this newly found distance." },
    { line: 17, text: "Since BFS guarantees shortest path, we can safely break early." },
    { line: 20, text: "Otherwise, traverse all adjacent nodes v." },
    { line: 21, text: "If we haven't visited node v yet (distance is INF)..." },
    { line: 22, text: "Update its distance to distance of u + 1." },
    { line: 23, text: "Push node v into the queue." },
    { line: 28, text: "After completing BFS, we officially mark the node as black." },
    { line: 29, text: "Print the answer for this operation." }
  ];

  const currentExplanation = explanations.find(e => e.line <= currentLine + 1 && (explanations.findIndex(x => x.line === e.line) === explanations.length - 1 || explanations[explanations.findIndex(x => x.line === e.line) + 1].line > currentLine + 1));

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Brute Force Approach</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Let's look at the naive solution. Why do most beginners think of this?</p>
      
      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Code Block */}
        <div className="flex-1 flex flex-col bg-[#0d1117] border border-[color:var(--border-color)] rounded-xl overflow-hidden relative">
          <div className="bg-gray-900 p-2 border-b border-[color:var(--border-color)] flex justify-between items-center px-4">
            <span className="text-[var(--text-muted)] font-mono text-sm">brute_force.cpp</span>
            <div className="flex gap-2">
              <button className="btn-icon w-8 h-8" onClick={() => setCurrentLine(0)}><RotateCcw size={14}/></button>
              <button className="btn-icon w-8 h-8" onClick={() => setCurrentLine(l => Math.min(l + 1, 31))}><SkipForward size={14}/></button>
            </div>
          </div>
          <div className="flex-1 overflow-auto relative">
             <SyntaxHighlighter
                language="cpp"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={lineNumber => {
                  let style = { display: "block", cursor: "pointer" };
                  if (lineNumber === currentLine + 1) {
                    style.backgroundColor = "rgba(0, 240, 255, 0.2)";
                    style.borderLeft = "4px solid #00f0ff";
                  }
                  return {
                    style,
                    onClick: () => setCurrentLine(lineNumber - 1)
                  };
                }}
              >
                {codeString}
              </SyntaxHighlighter>
          </div>
        </div>

        {/* Explanations & Visuals */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="content-box m-0 p-6 border-accent-secondary">
            <h3 className="text-xl font-bold mb-4 text-accent-secondary">Line-by-Line Explanation</h3>
            {currentExplanation ? (
              <motion.div
                key={currentExplanation.line}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg leading-relaxed text-[var(--text-muted)]"
              >
                <span className="bg-[rgba(112,0,255,0.3)] text-accent-secondary px-2 py-1 rounded font-mono text-sm mr-2 border border-accent-secondary">
                  Line {currentExplanation.line}
                </span>
                <br/><br/>
                {currentExplanation.text}
              </motion.div>
            ) : (
              <p className="text-[var(--text-muted)] italic">Click next or select a line to see its explanation.</p>
            )}
          </div>

          <div className="content-box m-0 p-6">
            <h3 className="text-xl font-bold mb-2 text-accent-tertiary">Why is it inefficient?</h3>
            <p className="text-[var(--text-muted)] mb-2">For every new black node, we might traverse the entire tree.</p>
            <p className="text-[var(--text-muted)] mb-2">Time per operation: <span className="font-mono text-accent-tertiary font-bold">O(N)</span></p>
            <p className="text-[var(--text-muted)]">Total Time Complexity: <span className="font-mono text-accent-tertiary font-bold">O(N²)</span></p>
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200">
              <strong className="text-red-400">Verdict: Time Limit Exceeded (TLE).</strong> N is up to 2·10⁵, meaning N² operations ≈ 4·10¹⁰, which takes ~40 seconds! We only have 4 seconds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}