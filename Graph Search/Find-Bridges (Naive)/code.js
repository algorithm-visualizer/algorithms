import { GraphTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new GraphTracer({ directed: false });
const logger = new LogTracer();
const G = [
  [0, 1, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
];

tracer.set(G).wait();

// Depth First Search Exploration Algorithm to test connectedness of the Graph (see Graph Algorithms/DFS/exploration), without the tracer & logger commands
function DFSExplore(graph, source) {
  const stack = [[source, null]];
  const visited = {};
  let node;
  let prev;
  let i;
  let temp;

  while (stack.length > 0) {
    temp = stack.pop();
    node = temp[0];
    prev = temp[1];

    if (!visited[node]) {
      visited[node] = true;
      // logger.print (node);

      /*
      if (prev !== undefined && graph [node] [prev]) { tracer.visit (node, prev).wait (); console.log ('tracer ' + prev + ', ' + node); }
      else { tracer.visit (node).wait (); console.log ('tracer ' + node); }
      */

      for (i = 0; i < graph.length; i++) {
        if (graph[node][i]) {
          stack.push([i, node]);
        }
      }
    }
  }

  return visited;
}

function findBridges(graph) {
  let tempGraph;
  const bridges = [];
  let visited;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      if (graph[i][j]) { // check if an edge exists
        logger.print(`Deleting edge ${i}->${j} and calling DFSExplore ()`);
        tracer.visit(j, i).wait();
        tracer.leave(j, i).wait();

        tempGraph = JSON.parse(JSON.stringify(graph));
        tempGraph[i][j] = 0;
        tempGraph[j][i] = 0;
        visited = DFSExplore(tempGraph, 0);

        if (Object.keys(visited).length === graph.length) {
          logger.print('Graph is CONNECTED. Edge is NOT a bridge');
        } else {
          logger.print('Graph is DISCONNECTED. Edge IS a bridge');
          bridges.push([i, j]);
        }
      }
    }
  }

  return bridges;
}

const bridges = findBridges(G);

logger.print('The bridges are: ');
for (const i in bridges) {
  logger.print(`${bridges[i][0]} to ${bridges[i][1]}`);
}
logger.print('NOTE: A bridge is both ways, i.e., from A to B and from B to A, because this is an Undirected Graph');
