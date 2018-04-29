import { GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new GraphTracer({ directed: false, weighted: true });
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, { directed: false, weighted: true, ratio: 1 });
tracer.set(G).wait();

let D; // D[i] indicates whether the i-th node is discovered or not

function DFS(node, parent, weight) { // node = current node, parent = previous node
  tracer.visit(node, parent, weight).wait();
  D[node] = true; // label current node as discovered
  for (let i = 0; i < G[node].length; i++) {
    if (G[node][i]) { // if the edge from current node to the i-th node exists
      if (!D[i]) { // if the i-th node is not labeled as discovered
        DFS(i, node, weight + G[node][i]); // recursively call DFS
      }
    }
  }
  D[node] = false; // label current node as undiscovered
  tracer.leave(node, parent, 0).wait();
}

for (let i = 0; i < G.length; i++) { // start from every node
  logger.print(`start from ${i}`);
  D = [];
  for (let j = 0; j < G.length; j++) D.push(false);
  DFS(i, undefined, 0);
}
