import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeSlide() {
  const [currentLine, setCurrentLine] = useState(0);

  const codeString = `#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, c0;
    cin >> n >> c0;
    
    vector<int> c(n - 1);
    for (int i = 0; i < n - 1; i++) cin >> c[i];
    
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    vector<int> min_dist_to_black(n + 1, n + 5);
    int ans = n + 5;
    
    auto update = [&](int start_node) {
        queue<int> q;
        q.push(start_node);
        min_dist_to_black[start_node] = 0;
        
        while (!q.empty()) {
            int u = q.front(); q.pop();
            
            if (min_dist_to_black[u] >= ans) continue;
            
            for (int v : adj[u]) {
                if (min_dist_to_black[u] + 1 < min_dist_to_black[v]) {
                    min_dist_to_black[v] = min_dist_to_black[u] + 1;
                    q.push(v);
                }
            }
        }
    };
    
    update(c0);
    
    for (int i = 0; i < n - 1; i++) {
        ans = min(ans, min_dist_to_black[c[i]]);
        update(c[i]);
        cout << ans << " ";
    }
    cout << "\\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t; cin >> t;
    while (t--) solve();
    return 0;
}`;

  const explanations = [
    { line: 1, text: "Includes all standard C++ libraries. Useful for competitive programming but adds compile time." },
    { line: 4, text: "The main solve function called for each testcase." },
    { line: 5, text: "n: number of vertices. c0: the initially black vertex." },
    { line: 8, text: "Read the sequence of nodes that will be colored black." },
    { line: 11, text: "Adjacency list to store the undirected tree." },
    { line: 12, text: "Read the n-1 edges and populate the bidirectional adjacency list." },
    { line: 18, text: "Crucial Data Structure! min_dist_to_black tracks the shortest known distance from any node to ANY black node. Initialized to Infinity (n+5)." },
    { line: 19, text: "Global ans tracking the minimum distance between any TWO black nodes." },
    { line: 21, text: "A lambda function that performs BFS starting from a newly colored black node." },
    { line: 24, text: "The distance from the starting node to a black node is exactly 0." },
    { line: 29, text: "CRITICAL PRUNING! If the distance to this node is already >= ans, then any path extending from this node to another black node will be > ans. No need to explore further!" },
    { line: 31, text: "Iterate through all adjacent neighbors in the tree." },
    { line: 32, text: "If the path through 'u' offers a SHORTER distance to a black node than 'v' currently knows..." },
    { line: 33, text: "Update min_dist_to_black[v] and push 'v' into the queue to explore its neighbors." },
    { line: 40, text: "Run the update BFS for the initially black node c0." },
    { line: 42, text: "For each operation (each new black node c[i])..." },
    { line: 43, text: "First, update our global 'ans' with the shortest distance FROM this new node TO any existing black node. Since we already populated min_dist_to_black with shortest distances to existing black nodes, min_dist_to_black[c[i]] exactly holds the shortest distance to a prior black node!" },
    { line: 44, text: "Then, run BFS from c[i] to update distances for other nodes in the tree." },
    { line: 45, text: "Print the current positivity." },
    { line: 51, text: "Fast I/O is mandatory in C++ to prevent Time Limit Exceeded when printing 200,000 integers." }
  ];

  const getExplanation = (lIndex) => {
    // Find highest explanation line <= lIndex + 1
    const match = explanations.slice().reverse().find(e => e.line <= lIndex + 1);
    return match ? match.text : "Standard syntax / curly brace.";
  };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Complete C++ Implementation</h1>
      <p className="text-center text-[var(--text-muted)] mb-6">Production-quality, highly optimized graph solution.</p>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-1 bg-[#0d1117] border border-[color:var(--border-color)] rounded-xl overflow-hidden relative flex flex-col">
          <div className="bg-gray-900 p-2 border-b border-[color:var(--border-color)] text-[var(--text-muted)] font-mono text-sm px-4">optimal.cpp</div>
          <div className="flex-1 overflow-auto">
            <SyntaxHighlighter
                language="cpp"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.9rem' }}
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

        <div className="w-1/3 flex flex-col gap-6">
          <div className="content-box m-0 flex-1 relative overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-accent-color">Line By Line Breakdown</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">(Click on any line in the code to see its explanation)</p>
            
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] rounded-lg text-lg text-[var(--text-muted)]"
            >
              <div className="mb-2">
                <span className="bg-accent-color text-black px-2 py-1 rounded font-mono text-sm font-bold">
                  Line {currentLine + 1}
                </span>
              </div>
              {getExplanation(currentLine)}
            </motion.div>
          </div>

          <div className="content-box m-0 p-6 border-accent-secondary">
            <h3 className="text-xl font-bold mb-2 text-accent-secondary">Data Structure Choices</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-muted)]">
              <li><span className="highlight">std::vector</span>: Faster than lists/arrays for dynamic sizes, perfect cache locality.</li>
              <li><span className="highlight">std::queue</span>: Standard choice for BFS. We don't need a priority_queue because edge weights are exactly 1.</li>
              <li><span className="highlight">Lambda Function</span>: Used to capture local variables like <code>min_dist_to_black</code> and <code>ans</code> by reference automatically.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}