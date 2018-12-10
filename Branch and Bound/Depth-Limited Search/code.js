import { GraphTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new GraphTracer();
const logger = new LogTracer();
tracer.log(logger);
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

// This is a sample DLS where
// we try to find number of descendant of root within some depth
function DLS(limit, node, parent) { // node = current node, parent = previous node
  tracer.visit(node, parent).delay();
  if (limit > 0) { // cut off the search
    for (let i = 0; i < G[node].length; i++) {
      if (G[node][i]) { // if current node has the i-th node as a child
        DLS(limit - 1, i, node); // recursively call DLS
      }
    }
  }
}
DLS(2, 0);
