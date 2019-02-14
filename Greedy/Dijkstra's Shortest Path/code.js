const { Tracer, Array1DTracer, GraphTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().directed(false).weighted();
const tracerS = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, tracerS, logger]));
tracer.log(logger);
const G = new Randomize.Graph(5, 1).directed(false).weighted().create();
tracer.set(G);
const MAX_VALUE = Infinity;
const S = []; // S[end] returns the distance from start node to end node
for (let i = 0; i < G.length; i++) S[i] = MAX_VALUE;
tracerS.set(S);
Tracer.delay();

function Dijkstra(start, end) {
  let minIndex;
  let minDistance;
  const D = []; // D[i] indicates whether the i-th node is discovered or not
  for (let i = 0; i < G.length; i++) D.push(false);
  S[start] = 0; // Starting node is at distance 0 from itself
  tracerS.patch(start, S[start]);
  Tracer.delay();
  tracerS.depatch(start);
  tracerS.select(start);
  let k = G.length;
  while (k--) {
    // Finding a node with the shortest distance from S[minIndex]
    minDistance = MAX_VALUE;
    for (let i = 0; i < G.length; i++) {
      if (S[i] < minDistance && !D[i]) {
        minDistance = S[i];
        minIndex = i;
      }
    }
    if (minDistance === MAX_VALUE) break; // If there is no edge from current node, jump out of loop
    D[minIndex] = true;
    tracerS.select(minIndex);
    tracer.visit(minIndex);
    Tracer.delay();
    // For every unvisited neighbour of current node, we check
    // whether the path to it is shorter if going over the current node
    for (let i = 0; i < G.length; i++) {
      if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
        S[i] = S[minIndex] + G[minIndex][i];
        tracerS.patch(i, S[i]);
        tracer.visit(i, minIndex, S[i]);
        Tracer.delay();
        tracerS.depatch(i);
        tracer.leave(i, minIndex);
        Tracer.delay();
      }
    }
    tracer.leave(minIndex);
    Tracer.delay();
  }
  if (S[end] === MAX_VALUE) {
    logger.println(`there is no path from ${start} to ${end}`);
  } else {
    logger.println(`the shortest path from ${start} to ${end} is ${S[end]}`);
  }
}

const s = new Randomize.Integer(0, G.length - 1).create(); // s = start node
let e; // e = end node
do {
  e = new Randomize.Integer(0, G.length - 1).create();
} while (s === e);
logger.println(`finding the shortest path from ${s} to ${e}`);
Tracer.delay();
Dijkstra(s, e);
