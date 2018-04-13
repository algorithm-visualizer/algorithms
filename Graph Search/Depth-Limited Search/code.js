var tracer = new GraphTracer();
var logger = new LogTracer();
tracer.log(logger);
var G = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
tracer.set(G, GraphData.LAYOUT.TREE, 0);


// This is a sample DLS where
// we try to find number of descendant of root within some depth
function DLS (limit, node, parent) { // node = current node, parent = previous node
    tracer.visit(node, parent).wait();
    if (limit>0) { // cut off the search
        for (var i = 0; i < G[node].length; i++) {
            if (G[node][i]) { // if current node has the i-th node as a child
                DLS(limit-1, i, node); // recursively call DLS
            }
        }
    }
}
DLS(2,0);
