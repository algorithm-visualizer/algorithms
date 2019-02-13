const { GraphTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().log(new LogTracer());
Layout.setRoot(new VerticalLayout([tracer]));
const G = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
tracer.set(G).layoutTree(0).delay();

function DFS(node, parent) { // node = current node, parent = previous node
  tracer.visit(node, parent).delay();
  for (let i = 0; i < G[node].length; i++) {
    if (G[node][i]) { // if current node has the i-th node as a child
      DFS(i, node); // recursively call DFS
    }
  }
}
DFS(0);
