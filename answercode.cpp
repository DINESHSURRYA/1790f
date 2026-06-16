#include <bits/stdc++.h>
using namespace std;

#define FAST ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0); cerr.tie(0);
#define pb push_back

void src() {
    int n, c0;
    cin >> n >> c0;
    
    vector<int> c(n - 1);
    for (int i = 0; i < n - 1; i++) cin >> c[i];
    
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].pb(v);
        adj[v].pb(u);
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
    cout << "\n";
}

int main() {
    FAST;
    int t; cin >> t;
    while (t--) src();
    return 0;
}