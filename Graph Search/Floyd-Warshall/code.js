const tracer = new GraphTracer({ directed: true, weighted: true });
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, {
  directed: true, weighted: true, ratio: 1, min: 1, max: 9,
});
tracer.set(G);

function FloydWarshall() {
  // Finds the shortest path between all nodes
  const S = new Array(G.length);
  for (var i = 0; i < G.length; i++) S[i] = new Array(G.length);
  for (i = 0; i < G.length; i++) {
    for (var j = 0; j < G.length; j++) {
      // Distance to self is always 0
      if (i == j) S[i][i] = 0;
      // Distance between connected nodes is their weight
      else if (G[i][j] > 0) {
        S[i][j] = G[i][j];
      }// Else we don't know the distance and we set it to infinity
      else S[i][j] = MAX_VALUE;
    }
  }
  // If there is a shorter path using k, use it instead
  for (let k = 0; k < G.length; k++) {
    for (i = 0; i < G.length; i++) {
      if (k === i) continue;
      tracer.visit(k, i).wait();
      for (j = 0; j < G.length; j++) {
        if (i === j || j === k) continue;
        tracer.visit(j, k).wait();
        if (S[i][j] > S[i][k] + S[k][j]) {
          tracer.visit(j, i, S[i][j]).wait();
          S[i][j] = S[i][k] + S[k][j];
          tracer.leave(j, i, S[i][j]);
        }
        tracer.leave(j, k);
      }
      tracer.leave(k, i).wait();
    }
  }
  for (i = 0; i < G.length; i++) {
    for (j = 0; j < G.length; j++) {
      if (S[i][j] === MAX_VALUE) logger.print(`there is no path from ${i} to ${j}`);
      else logger.print(`the shortest path from ${i} to ${j} is ${S[i][j]}`);
    }
  }
}
var MAX_VALUE = Infinity;
logger.print('finding the shortest paths from and to all nodes');
FloydWarshall();
