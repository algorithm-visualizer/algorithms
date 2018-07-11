import { Array1DTracer, GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new GraphTracer({ directed: false, weighted: true });
const tracerS = new Array1DTracer();
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, {
  directed: false, weighted: true, ratio: 1, min: 1, max: 9,
});
tracer.set(G);
const MAX_VALUE = Infinity;
const S = []; // S[end] returns the distance from start node to end node
for (let i = 0; i < G.length; i++) S[i] = MAX_VALUE;
tracerS.set(S).delay();

function Dijkstra(start, end) {
  let minIndex;
  let minDistance;
  const D = []; // D[i] indicates whether the i-th node is discovered or not
  for (let i = 0; i < G.length; i++) D.push(false);
  S[start] = 0; // Starting node is at distance 0 from itself
  tracerS.patch(start, S[start]).delay().depatch(start);
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
    tracer.visit(minIndex).delay();
    // For every unvisited neighbour of current node, we check
    // whether the path to it is shorter if going over the current node
    for (let i = 0; i < G.length; i++) {
      if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
        S[i] = S[minIndex] + G[minIndex][i];
        tracerS.patch(i, S[i]);
        tracer.visit(i, minIndex, S[i]).delay();
        tracerS.depatch(i);
        tracer.leave(i, minIndex).delay();
      }
    }
    tracer.leave(minIndex).delay();
  }
  if (S[end] === MAX_VALUE) {
    logger.print(`there is no path from ${start} to ${end}`);
  } else {
    logger.print(`the shortest path from ${start} to ${end} is ${S[end]}`);
  }
}

const s = Randomize.integer(0, G.length - 1); // s = start node
let e; // e = end node
do {
  e = Randomize.integer(0, G.length - 1);
} while (s === e);
logger.print(`finding the shortest path from ${s} to ${e}`).delay();
Dijkstra(s, e);
