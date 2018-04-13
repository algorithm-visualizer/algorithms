function DFS(node, parent) { // node = current node, parent = previous node
    tracer.visit(node, parent).wait();
    for (var i = 0; i < G[node].length; i++) {
        if (G[node][i]) { // if current node has the i-th node as a child
            DFS(i, node); // recursively call DFS
        }
    }
}
DFS(0);