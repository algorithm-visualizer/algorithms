const tracer = new GraphTracer({ directed: false, weighted: true });
const logger = new LogTracer();
tracer.log(logger);
/* let G = [ // G[i][j] indicates the weight of the path from the i-th node to the j-th node
 [0, 3, 0, 1, 0],
 [5, 0, 1, 2, 4],
 [1, 0, 0, 2, 0],
 [0, 2, 0, 0, 1],
 [0, 1, 3, 0, 0]
 ]; */
const G = Randomize.graph(10, {
  directed: false, weighted: true, ratio: 0.4, min: 1, max: 9,
});
tracer.set(G);

function prim() {
  // Finds a tree so that there exists a path between
  // every two nodes while keeping the cost minimal
  let minD,
    minI,
    minJ,
    sum = 0,
    D = [];
  for (let i = 0; i < G.length; i++) D.push(0);
  D[0] = 1; // First node is visited
  for (let k = 0; k < G.length - 1; k++) { // Searching for k edges
    minD = Infinity;
    for (i = 0; i < G.length; i++) {
      if (D[i]) // First node in an edge must be visited
      {
        for (let j = 0; j < G.length; j++) {
          if (!D[j] && G[i][j]) {
            tracer.visit(i, j).wait();
            // Second node must not be visited and must be connected to first node
            if (G[i][j] < minD) {
            // Searching for cheapest edge which satisfies requirements
              minD = G[i][j];
              minI = i;
              minJ = j;
            }
            tracer.leave(i, j).wait();
          }
        }
      }
    }
    tracer.visit(minI, minJ).wait();
    D[minJ] = 1; // Visit second node and insert it into or tree
    sum += G[minI][minJ];
  }
  logger.print(`The sum of all edges is: ${sum}`);
}

logger.print('nodes that belong to minimum spanning tree are: ');
prim();
