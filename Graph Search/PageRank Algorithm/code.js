import { Array1DTracer, Array2DTracer, GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

function filledArray(length, value) {
  return Array(...Array(length)).map(Number.prototype.valueOf, value);
}

const G = Randomize.graph(5, { ratio: 0.4 });
let ranks;
const outgoingEdgeCounts = filledArray(G.length, 0);
let incomingNodes;
const graphTracer = new GraphTracer('Web Page inter-connections');
const rankTracer = new Array1DTracer('Web Page Ranks');
const oecTracer = new Array1DTracer('Outgoing Edge Counts');
const inTracer = new Array2DTracer('Incoming Nodes');

const logger = new LogTracer();

graphTracer.set(G);
oecTracer.set(outgoingEdgeCounts);

for (incomingNodes = []; incomingNodes.length < G.length; incomingNodes.push(filledArray(G.length, -1)));
inTracer.set(incomingNodes).wait();

/*
  PageRank Algorithm Version 1
  Equation:
    PR (X) = (1 - D) + D (Summation i->X (PR (I) / Out (i)))
  NOTE: Algorithm uses the recommended damping factor (D). Number of iterations is small because only a small Web of 5 Pages is simulated
*/

function arraySum(array) {
  return array.reduce(
    (sum, curr) =>
      sum + (curr ? 1 : 0) // if curr is 0 (no edge) or undefined (loop not allowed), sum remains unchanged
    , 0,
  );
}

function showOutgoingEdges(i) {
  G[i].forEach((edgeExists, j) => {
    edgeExists && graphTracer.visit(j, i).wait() && graphTracer.leave(j, i).wait();
  });
}

// PRECOMPUTATIONS

logger.print('Calculate Outgoing Edge Count for each Node');
(function calculateOEC() {
  G.forEach((relations, i) => {
    outgoingEdgeCounts[i] = arraySum(relations);
    showOutgoingEdges(i);

    oecTracer.notify(i, outgoingEdgeCounts[i]).wait();
    oecTracer.denotify(i).wait();
  });
}());

logger.print('determine incoming nodes for each node');
(function determineIN() {
  for (let i = 0; i < G.length; i++) {
    for (let j = 0; j < G.length; j++) {
      if (G[i][j]) {
        // there's an edge FROM i TO j
        graphTracer.visit(j, i).wait();

        const nextPos = incomingNodes[j].indexOf(-1);
        incomingNodes[j][nextPos] = i;
        inTracer.notify(j, nextPos, i).wait();
        inTracer.denotify(j, nextPos).wait();

        graphTracer.leave(j, i).wait();
      }
    }
  }

  // logger.print ('All -1s will be removed from incoming node records, they are irrelevant');
  incomingNodes.forEach((arr) => {
    arr.splice(arr.indexOf(-1));
  });
}());

function updateRank(nodeIndex) {
  let inNodeSummation = 0;
  let result;

  logger.print(`Updating rank of ${nodeIndex}`);
  logger.print(`The incoming Nodes of ${nodeIndex} are being highlighted`);

  incomingNodes[nodeIndex].forEach((incoming, i) => {
    inTracer.select(nodeIndex, i).wait();
    logger.print(`Outgoing edge count of ${incoming} is ${outgoingEdgeCounts[incoming]}`);
    oecTracer.select(incoming).wait();

    inNodeSummation += (ranks[incoming] / outgoingEdgeCounts[incoming]);

    oecTracer.deselect(incoming).wait();
    inTracer.deselect(nodeIndex, i).wait();
  });
  logger.print(`In-Node summation of ${nodeIndex} = ${inNodeSummation}`);

  result = (1 - damping) + (damping * inNodeSummation);
  logger.print(`Therefore, using Equation, new rank of ${nodeIndex} = ${result}`);
  return result;
}

let damping = 0.85;
let iterations = 7;
const initialRank = 1.0;

logger.print(`Initialized all Page ranks to ${initialRank}`);
ranks = filledArray(G.length, initialRank);

rankTracer.set(ranks);
logger.print('Begin execution of PageRank Version #1');
logger.print('Equation used: PR (X) = (1 - D) + D (In-Node-Summation i->X (PR (I) / Out (i)))');
logger.print('D = Damping Factor, PR (X) = Page rank of Node X, i = the ith In-Node of X, Out (i) = outgoing Edge Count of i');
logger.print('');

while (iterations--) {
  for (let node = 0; node < ranks.length; node++) {
    ranks[node] = updateRank(node);
    rankTracer.notify(node, ranks[node]).wait();
    rankTracer.notify(node).wait();
  }
}

logger.print('Page Ranks have been converged to.');
ranks.forEach((rank, node) => {
  logger.print(`Rank of Node #${node} = ${rank}`);
});
logger.print('Done');
