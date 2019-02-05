const { GraphTracer, LogTracer } = require('algorithm-visualizer');

const tracer = new GraphTracer().log(new LogTracer());
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

function BFS(s) { // s = start node
  const Q = [];
  Q.push(s); // add start node to queue
  tracer.visit(s).delay();
  while (Q.length > 0) {
    const node = Q.shift(); // dequeue
    for (let i = 0; i < G[node].length; i++) {
      if (G[node][i]) { // if current node has the i-th node as a child
        Q.push(i); // add child node to queue
        tracer.visit(i, node).delay();
      }
    }
  }
}
BFS(0);
