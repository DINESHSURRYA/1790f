#include <bits/stdc++.h>
using namespace std;

#define FAST ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0); cerr.tie(0);

#define pb push_back

void src() {
    // n: number of vertices. c0: the initially black vertex.
    int n, c0;
    cin >> n >> c0;
    
    // Read the sequence of nodes that will be colored black.
    vector<int> c(n - 1);
    for (int i = 0; i < n - 1; i++) cin >> c[i];
    
    // Adjacency list to store the undirected tree.
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        // Read the n-1 edges and populate the bidirectional adjacency list.
        int u, v; cin >> u >> v;
        adj[u].pb(v);
        adj[v].pb(u);
    }
    
    // Crucial Data Structure! min_dist_to_black tracks the shortest known distance 
    // from any node to ANY black node. Initialized to Infinity (n+5).
    vector<int> min_dist_to_black(n + 1, n + 5);
    
    // Global ans tracking the minimum distance between any TWO black nodes.
    int ans = n + 5;
    
    // A lambda function that performs BFS starting from a newly colored black node.
    auto update = [&](int start_node) {
        queue<int> q;
        q.push(start_node);
        // The distance from the starting node to a black node is exactly 0.
        min_dist_to_black[start_node] = 0;
        
        while (!q.empty()) {
            int u = q.front(); q.pop();
            
            // CRITICAL PRUNING! If the distance to this node is already >= ans, 
            // then any path extending from this node to another black node will be > ans. 
            // No need to explore further!
            if (min_dist_to_black[u] >= ans) continue;
            
            // Iterate through all adjacent neighbors in the tree.
            for (int v : adj[u]) {
                // If the path through 'u' offers a SHORTER distance to a black node 
                // than 'v' currently knows...
                if (min_dist_to_black[u] + 1 < min_dist_to_black[v]) {
                    // Update min_dist_to_black[v] and push 'v' into the queue 
                    // to explore its neighbors.
                    min_dist_to_black[v] = min_dist_to_black[u] + 1;
                    q.push(v);
                }
            }
        }
    };
    
    // Run the update BFS for the initially black node c0.
    update(c0);
    
    // For each operation (each new black node c[i])...
    for (int i = 0; i < n - 1; i++) {
        // First, update our global 'ans' with the shortest distance FROM this new node 
        // TO any existing black node.
        ans = min(ans, min_dist_to_black[c[i]]);
        
        // Then, run BFS from c[i] to update distances for other nodes in the tree.
        update(c[i]);
        
        // Print the current minimum distance.
        cout << ans << " ";
    }
    cout << "\n";
}

int main() {
    // Fast I/O is mandatory in C++ to prevent Time Limit Exceeded
    FAST;

    int t; cin >> t;

    // The main function called for each testcase.
    while (t--) src ();

    return 0;
}
