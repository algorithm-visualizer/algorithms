import { GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new GraphTracer().weighted();
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, {
  directed: true, weighted: true, ratio: 0.5, min: -2, max: 5,
});
tracer.set(G).delay();

function BELLMAN_FORD(src, dest) {
  const weights = new Array(G.length);
  let i;
  let j;

  for (i = 0; i < G.length; i++) {
    weights[i] = MAX_VALUE;
    tracer.weight(i, weights[i]);
  }
  weights[src] = 0;
  tracer.weight(src, 0);

  logger.print(`Initializing weights to: [${weights}]`);
  logger.print('');

  // begin BF algorithm execution
  let k = G.length;
  while (k--) {
    logger.print(`Iteration: ${G.length - k}`);
    logger.print('------------------------------------------------------------------');

    for (i = 0; i < G.length; i++) {
      for (j = 0; j < G.length; j++) {
        if (G[i][j]) { // proceed to relax Edges only if a particular weight !== 0 (0 represents no edge)
          if (weights[j] > (weights[i] + G[i][j])) {
            weights[j] = weights[i] + G[i][j];
            logger.print(`weights[${j}] = weights[${i}] + ${G[i][j]}`);
          }
          tracer.visit(j, i, weights[j]).delay();
          tracer.leave(j, i).delay();
        }
      }
    }

    logger.print(`updated weights: [${weights.join(', ')}]`);
    logger.print('');
  }

  // check for cycle
  logger.print('checking for cycle');
  for (i = 0; i < G.length; i++) {
    for (j = 0; j < G.length; j++) {
      if (G[i][j]) {
        if (weights[j] > (weights[i] + G[i][j])) {
          logger.print(`A cycle was detected: weights[${j}] > weights[${i}] + ${G[i][j]}`);
          return (MAX_VALUE);
        }
      }
    }
  }

  logger.print(`No cycles detected. Final weights for the source ${src} are: [${weights}]`);

  return weights[dest];
}

const src = Randomize.integer(0, G.length - 1);
let dest;
let MAX_VALUE = Infinity;
let minWeight;

/*
 src = start node
 dest = start node (but will eventually at as the end node)
 */

do {
  dest = Randomize.integer(0, G.length - 1);
}
while (src === dest);

logger.print(`finding the shortest path from ${src} to ${dest}`);

minWeight = BELLMAN_FORD(src, dest);

if (minWeight === MAX_VALUE) {
  logger.print(`there is no path from ${src} to ${dest}`);
} else {
  logger.print(`the shortest path from ${src} to ${dest} is ${minWeight}`);
}
