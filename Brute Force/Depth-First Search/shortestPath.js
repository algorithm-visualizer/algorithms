const { Tracer, GraphTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().directed(false).weighted();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
tracer.log(logger);
const G = new Randomize.Graph(5, 1).directed(false).weighted().create();
tracer.set(G);
Tracer.delay();

function DFS(node, parent, weight) { // node = current node, parent = previous node
  if (minWeight < weight) return;
  if (node === e) {
    tracer.visit(node, parent, weight);
    Tracer.delay();
    if (minWeight > weight) {
      minWeight = weight;
    }
    tracer.leave(node, parent, minWeight);
    Tracer.delay();
    return;
  }
  D[node] = true; // label current node as discovered
  tracer.visit(node, parent, weight);
  Tracer.delay();
  for (let i = 0; i < G[node].length; i++) {
    if (G[node][i]) { // if the path from current node to the i-th node exists
      if (!D[i]) { // if the i-th node is not labeled as discovered
        DFS(i, node, weight + G[node][i]); // recursively call DFS
      }
    }
  }
  D[node] = false; // label current node as undiscovered
  tracer.leave(node, parent, 0);
  Tracer.delay();
}

const s = new Randomize.Integer(0, G.length - 1).create(); // s = start node
let e; // e = end node
do {
  e = new Randomize.Integer(0, G.length - 1).create();
} while (s === e);
const MAX_VALUE = Infinity;
let minWeight = MAX_VALUE;
logger.println(`finding the shortest path from ${s} to ${e}`);
let D = []; // D[i] indicates whether the i-th node is discovered or not
for (let i = 0; i < G.length; i++) D.push(false);
DFS(s, undefined, 0);
if (minWeight === MAX_VALUE) {
  logger.println(`there is no path from ${s} to ${e}`);
} else {
  logger.println(`the shortest path from ${s} to ${e} is ${minWeight}`);
}
