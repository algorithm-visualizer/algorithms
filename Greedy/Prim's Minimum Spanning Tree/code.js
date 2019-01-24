import { GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new GraphTracer().directed(false).weighted();
const logger = new LogTracer();
tracer.log(logger);
/* let G = [ // G[i][j] indicates the weight of the path from the i-th node to the j-th node
 [0, 3, 0, 1, 0],
 [5, 0, 1, 2, 4],
 [1, 0, 0, 2, 0],
 [0, 2, 0, 0, 1],
 [0, 1, 3, 0, 0]
 ]; */
const G = new Randomize.Graph(10, .4).directed(false).weighted().create();
tracer.set(G).delay();

function prim() {
  // Finds a tree so that there exists a path between
  // every two nodes while keeping the cost minimal
  let minD;

  let minI;
  let minJ;
  let sum = 0;
  const D = [];
  for (let i = 0; i < G.length; i++) D.push(0);
  D[0] = 1; // First node is visited
  for (let k = 0; k < G.length - 1; k++) { // Searching for k edges
    minD = Infinity;
    for (let i = 0; i < G.length; i++) {
      if (D[i]) // First node in an edge must be visited
      {
        for (let j = 0; j < G.length; j++) {
          if (!D[j] && G[i][j]) {
            tracer.visit(i, j).delay();
            // Second node must not be visited and must be connected to first node
            if (G[i][j] < minD) {
              // Searching for cheapest edge which satisfies requirements
              minD = G[i][j];
              minI = i;
              minJ = j;
            }
            tracer.leave(i, j).delay();
          }
        }
      }
    }
    tracer.visit(minI, minJ).delay();
    D[minJ] = 1; // Visit second node and insert it into or tree
    sum += G[minI][minJ];
  }
  logger.println(`The sum of all edges is: ${sum}`);
}

logger.println('nodes that belong to minimum spanning tree are: ');
prim();
