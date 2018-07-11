import { Array1DTracer, GraphTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const graphTracer = new GraphTracer({ directed: false });
const visitedTracer = new Array1DTracer('visited');
const logger = new LogTracer();
graphTracer.log(logger);
const G = Randomize.graph(8, { directed: false, ratio: 0.3 });
graphTracer.set(G).delay();

function DFSExplore(graph, source) {
  const stack = [[source, null]];
  const visited = [];
  let node;
  let prev;
  let i;
  let temp;
  for (i = 0; i < graph.length; i++) {
    visited.push(false);
  }
  visitedTracer.set(visited);

  while (stack.length > 0) {
    temp = stack.pop();
    node = temp[0];
    prev = temp[1];

    if (!visited[node]) {
      visited[node] = true;
      visitedTracer.patch(node, visited[node]);

      if (prev !== undefined && graph[node][prev]) {
        graphTracer.visit(node, prev).delay();
      } else {
        graphTracer.visit(node).delay();
      }

      for (i = 0; i < graph.length; i++) {
        if (graph[node][i]) {
          stack.push([i, node]);
        }
      }
    }
  }

  return visited;
}

const visited = DFSExplore(G, 0);
let check = true;
for (let i = 0; i < visited.length; i++) check &= visited[i];
if (check) {
  logger.print('The Graph is CONNECTED');
} else {
  logger.print('The Graph is NOT CONNECTED');
}
