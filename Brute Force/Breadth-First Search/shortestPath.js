const { Tracer, GraphTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().directed(false).weighted();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
tracer.log(logger);
const G = new Randomize.Graph(5, 1).directed(false).weighted().create();
tracer.set(G);
Tracer.delay();

function BFS() {
  const W = []; // W[i] indicates the length of the shortest path from start node to the i-th node
  const Q = [];
  let i;
  for (i = 0; i < G.length; i++) {
    W.push(MAX_VALUE);
    tracer.updateNode(i, MAX_VALUE);
  }
  W[s] = 0;
  Q.push(s); // add start node to queue
  tracer.visit(s, undefined, 0);
  Tracer.delay();
  while (Q.length > 0) {
    const node = Q.shift(); // dequeue
    for (i = 0; i < G[node].length; i++) {
      if (G[node][i]) { // if the edge from current node to the i-th node exists
        if (W[i] > W[node] + G[node][i]) { // if current path is shorter than the previously shortest path
          W[i] = W[node] + G[node][i]; // update the length of the shortest path
          Q.push(i); // add child node to queue
          tracer.visit(i, node, W[i]);
          Tracer.delay();
        }
      }
    }
  }
  return W[e];
}

let s = new Randomize.Integer(0, G.length - 1).create(); // s = start node
let e; // e = start node
do {
  e = new Randomize.Integer(0, G.length - 1).create();
} while (s === e);
let MAX_VALUE = 0x7fffffff;
logger.println(`finding the shortest path from ${s} to ${e}`);
const minWeight = BFS(s);
if (minWeight === MAX_VALUE) {
  logger.println(`there is no path from ${s} to ${e}`);
} else {
  logger.println(`the shortest path from ${s} to ${e} is ${minWeight}`);
}
