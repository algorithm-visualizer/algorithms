import { GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new GraphTracer({ directed: false, weighted: true });
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, {
  directed: false, weighted: true, ratio: 1, min: 1, max: 9,
});
tracer.set(G).wait();

function DFS(node, parent, weight) { // node = current node, parent = previous node
  if (minWeight < weight) return;
  if (node === e) {
    tracer.visit(node, parent, weight).wait();
    if (minWeight > weight) {
      minWeight = weight;
    }
    tracer.leave(node, parent, minWeight).wait();
    return;
  }
  D[node] = true; // label current node as discovered
  tracer.visit(node, parent, weight).wait();
  for (let i = 0; i < G[node].length; i++) {
    if (G[node][i]) { // if the path from current node to the i-th node exists
      if (!D[i]) { // if the i-th node is not labeled as discovered
        DFS(i, node, weight + G[node][i]); // recursively call DFS
      }
    }
  }
  D[node] = false; // label current node as undiscovered
  tracer.leave(node, parent, 0).wait();
}
const s = Randomize.integer(0, G.length - 1); // s = start node
let e; // e = end node
do {
  e = Randomize.integer(0, G.length - 1);
} while (s === e);
const MAX_VALUE = Infinity;
let minWeight = MAX_VALUE;
logger.print(`finding the shortest path from ${s} to ${e}`);
let D = []; // D[i] indicates whether the i-th node is discovered or not
for (let i = 0; i < G.length; i++) D.push(false);
DFS(s, undefined, 0);
if (minWeight === MAX_VALUE) {
  logger.print(`there is no path from ${s} to ${e}`);
} else {
  logger.print(`the shortest path from ${s} to ${e} is ${minWeight}`);
}
