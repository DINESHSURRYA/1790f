import React, { useState } from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import TreeVisualizer from '../components/TreeVisualizer';

function generateTreeData(n, c0, cSeq, edgeLines) {
  const edges = [];
  const adj = Array.from({ length: n + 1 }, () => []);
  edgeLines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const u = parseInt(parts[0]);
      const v = parseInt(parts[1]);
      edges.push([u, v]);
      adj[u].push(v);
      adj[v].push(u);
    }
  });

  const root = 1;
  const depth = new Array(n + 1).fill(-1);
  depth[root] = 0;
  const q = [root];
  const depthGroups = [[root]];
  let head = 0;
  while (head < q.length) {
    const u = q[head++];
    for (const v of adj[u]) {
      if (depth[v] === -1) {
        depth[v] = depth[u] + 1;
        q.push(v);
        if (!depthGroups[depth[v]]) depthGroups[depth[v]] = [];
        depthGroups[depth[v]].push(v);
      }
    }
  }

  const nodes = [];
  depthGroups.forEach((group, d) => {
    if (!group) return;
    const y = d * 70 - 100;
    group.forEach((u, i) => {
      const x = (i - (group.length - 1) / 2) * 80;
      nodes.push({ id: u, x, y });
    });
  });

  for (let i = 1; i <= n; i++) {
    if (depth[i] === -1) {
      nodes.push({ id: i, x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100 });
    }
  }

  const minDist = new Array(n + 1).fill(1e9);
  let ans = 1e9;
  const sequence = [];
  const blackNodes = [c0];
  
  minDist[c0] = 0;
  sequence.push({
    blackNodes: [...blackNodes],
    positivity: ans === 1e9 ? Infinity : ans,
    description: `Initial state. Vertex ${c0} is black. Minimum distance is Infinity.`
  });

  for (let i = 0; i < cSeq.length; i++) {
    const startNode = cSeq[i];
    if (!startNode) continue;
    blackNodes.push(startNode);
    
    ans = Math.min(ans, minDist[startNode]);

    const q = [startNode];
    const dist = new Array(n + 1).fill(1e9);
    dist[startNode] = 0;
    let head = 0;

    while (head < q.length) {
      const u = q[head++];
      if (dist[u] >= ans || dist[u] >= minDist[u]) continue;
      
      minDist[u] = Math.min(minDist[u], dist[u]);
      
      for (const v of adj[u]) {
        if (dist[u] + 1 < dist[v]) {
          dist[v] = dist[u] + 1;
          q.push(v);
        }
      }
    }

    sequence.push({
      blackNodes: [...blackNodes],
      positivity: ans === 1e9 ? Infinity : ans,
      description: `Operation ${i+1}: Paint vertex ${startNode} black. Minimum distance is ${ans === 1e9 ? Infinity : ans}.`
    });
  }

  return { nodes, edges, sequence };
}

export default function PlaygroundSlide() {
  const [nc0, setNc0] = useState("6 6");
  const [cSeq, setCSeq] = useState("4 1 3 5 2");
  const [edgesInput, setEdgesInput] = useState("2 4\n6 5\n5 3\n3 4\n1 3");
  const [graphData, setGraphData] = useState(null);
  const [status, setStatus] = useState('Waiting for input...');

  const handleLoad = () => {
    try {
      const [nStr, c0Str] = nc0.trim().split(/\s+/);
      const n = parseInt(nStr);
      const c0 = parseInt(c0Str);
      const seq = cSeq.trim().split(/\s+/).filter(x => x).map(x => parseInt(x));
      const lines = edgesInput.trim().split('\n').filter(x => x);
      
      if (!n || !c0) throw new Error("Invalid N or C0");
      
      const data = generateTreeData(n, c0, seq, lines);
      setGraphData(data);
      setStatus('Simulation loaded. You can interact with it below.');
    } catch (err) {
      setStatus('Error parsing input!');
      setGraphData(null);
    }
  };

  return (
    <div className="slide flex flex-col">
      <h1 className="title text-center">Interactive Playground</h1>
      <p className="text-center text-[var(--text-muted)] mb-8" style={{ color: 'var(--text-muted)' }}>Test your own trees. Paste the Codeforces input and watch it run!</p>

      <div className="flex-1 flex gap-6 w-full">
        <div className="w-1/3 flex flex-col gap-4">
          <div className="content-box m-0 p-6 flex-1" style={{ borderColor: 'var(--accent-color)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>Custom Input</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Number of Nodes (N) & Initial Black (C0)</label>
                <input 
                  type="text" 
                  value={nc0} 
                  onChange={e => setNc0(e.target.value)} 
                  className="w-full rounded p-2 font-mono" 
                  style={{ background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }} 
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Coloring Sequence (C1 to Cn-1)</label>
                <input 
                  type="text" 
                  value={cSeq} 
                  onChange={e => setCSeq(e.target.value)} 
                  className="w-full rounded p-2 font-mono" 
                  style={{ background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }} 
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Edges (u v)</label>
                <textarea 
                  rows={5} 
                  value={edgesInput} 
                  onChange={e => setEdgesInput(e.target.value)} 
                  className="w-full rounded p-2 font-mono resize-none" 
                  style={{ background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}
                ></textarea>
              </div>
              
              <button className="btn-primary w-full mt-4" onClick={handleLoad}>
                Load Simulation
              </button>
              
              <div className="mt-4 font-mono text-sm font-bold" style={{ color: 'var(--accent-secondary)' }}>
                {status}
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-col">
          {graphData ? (
             <TreeVisualizer 
                key={Date.now()} // Force re-mount on new data
                nodes={graphData.nodes} 
                edges={graphData.edges} 
                sequence={graphData.sequence} 
             />
          ) : (
            <div className="content-box m-0 flex-1 relative overflow-hidden flex items-center justify-center flex-col h-full" style={{ background: 'var(--card-bg)' }}>
               <div className="grid-bg opacity-30"></div>
               <div className="text-center z-10 opacity-50">
                 <Play size={64} className="mx-auto mb-4 text-[var(--text-muted)]" />
                 <p style={{ color: 'var(--text-muted)' }}>Press Load Simulation to begin</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}