var tracer = new GraphTracer({ directed: true, weighted: true });
var logger = new LogTracer();
tracer.log(logger);
var G = Randomize.graph(5, { directed: true, weighted: true, ratio: .5, min: -2, max: 5 });
tracer.set(G);


function BELLMAN_FORD(src, dest) {
  var weights = new Array(G.length), i, j;

  for (i = 0; i < G.length; i++) {
    weights[i] = MAX_VALUE;
    tracer.weight(i, weights[i]);
  }
  weights[src] = 0;
  tracer.weight(src, 0);

  logger.print('Initializing weights to: [' + weights + ']');
  logger.print('');

  //begin BF algorithm execution
  var k = G.length;
  while (k--) {
    logger.print('Iteration: ' + (G.length - k));
    logger.print('------------------------------------------------------------------');

    for (i = 0; i < G.length; i++) {
      for (j = 0; j < G.length; j++) {
        if (G[i][j]) {	//proceed to relax Edges only if a particular weight != 0 (0 represents no edge)
          if (weights[j] > (weights[i] + G[i][j])) {
            weights[j] = weights[i] + G[i][j];
            logger.print('weights[' + j + '] = weights[' + i + '] + ' + G[i][j]);
          }
          tracer.visit(j, i, weights[j]).wait();
          tracer.leave(j, i).wait();
        }
      }
    }

    logger.print('updated weights: [' + weights.join(', ') + ']');
    logger.print('');
  }

  //check for cycle
  logger.print('checking for cycle');
  for (i = 0; i < G.length; i++) {
    for (j = 0; j < G.length; j++) {
      if (G[i][j]) {
        if (weights[j] > (weights[i] + G[i][j])) {
          logger.print('A cycle was detected: weights[' + j + '] > weights[' + i + '] + ' + G[i][j]);
          return (MAX_VALUE);
        }
      }
    }
  }

  logger.print('No cycles detected. Final weights for the source ' + src + ' are: [' + weights + ']');

  return weights[dest];
}

var src = Randomize.integer(0, G.length - 1), dest;
var MAX_VALUE = Infinity;
var minWeight;

/*
 src = start node
 dest = start node (but will eventually at as the end node)
 */

do {
  dest = Randomize.integer(0, G.length - 1);
}
while (src === dest);

logger.print('finding the shortest path from ' + src + ' to ' + dest);

minWeight = BELLMAN_FORD(src, dest);

if (minWeight === MAX_VALUE) {
  logger.print('there is no path from ' + src + ' to ' + dest);
} else {
  logger.print('the shortest path from ' + src + ' to ' + dest + ' is ' + minWeight);
}