const { GraphTracer, LogTracer } = require('algorithm-visualizer');

const tracer = new GraphTracer();
const logger = new LogTracer();
tracer.log(logger);
// G[i][j] indicates whether the path from the i-th node to the j-th node exists or not. NOTE: The graph must be Directed-Acyclic
const G = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 0],
];
tracer.set(G).delay();

const inDegrees = Array(...Array(G.length)).map(Number.prototype.valueOf, 0); // create an Array of G.length number of 0s
const Q = [];
let iter = 0;
let i;

logger.println('Calculating in-degrees for each Node...');
for (let currNode = 0; currNode < G.length; currNode++) {
  for (let currNodeNeighbor = 0; currNodeNeighbor < G.length; currNodeNeighbor++) {
    if (G[currNode][currNodeNeighbor]) {
      logger.println(`${currNodeNeighbor} has an incoming edge from ${currNode}`);
      tracer.visit(currNodeNeighbor, currNode).delay();
      inDegrees[currNodeNeighbor]++;
      tracer.leave(currNodeNeighbor, currNode).delay();
    }
  }
}
logger.println(`Done. In-Degrees are: [ ${String(inDegrees)} ]`);
logger.println('');

logger.println('Initializing queue with all the sources (nodes with no incoming edges)');
inDegrees.map((indegrees, node) => {
  tracer.visit(node).delay();
  if (!indegrees) {
    logger.println(`${node} is a source`);
    Q.push(node);
  }
  tracer.leave(node).delay();
});
logger.println(`Done. Initial State of Queue: [ ${String(Q)} ]`);
logger.println('');

// begin topological sort (kahn)
while (Q.length > 0) {
  logger.println(`Iteration #${iter}. Queue state: [ ${String(Q)} ]`);
  const currNode = Q.shift();
  tracer.visit(currNode).delay();

  for (i = 0; i < G.length; i++) {
    if (G[currNode][i]) {
      logger.println(`${i} has an incoming edge from ${currNode}. Decrementing ${i}'s in-degree by 1.`);
      tracer.visit(i, currNode).delay();
      inDegrees[i]--;
      tracer.leave(i, currNode).delay();

      if (!inDegrees[i]) {
        logger.println(`${i}'s in-degree is now 0. Enqueuing ${i}`);
        Q.push(i);
      }
    }
  }
  tracer.leave(currNode).delay();
  logger.println(`In-degrees are: [${String(inDegrees)} ]`);
  logger.println('-------------------------------------------------------------------');

  iter++;
}
