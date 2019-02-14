const { Tracer, GraphTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().directed(false).weighted();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
tracer.log(logger);
const G = new Randomize.Graph(5, 1).directed(false).weighted().create();
tracer.set(G);
Tracer.delay();

let D; // D[i] indicates whether the i-th node is discovered or not

function DFS(node, parent, weight) { // node = current node, parent = previous node
  tracer.visit(node, parent, weight);
  Tracer.delay();
  D[node] = true; // label current node as discovered
  for (let i = 0; i < G[node].length; i++) {
    if (G[node][i]) { // if the edge from current node to the i-th node exists
      if (!D[i]) { // if the i-th node is not labeled as discovered
        DFS(i, node, weight + G[node][i]); // recursively call DFS
      }
    }
  }
  D[node] = false; // label current node as undiscovered
  tracer.leave(node, parent, 0);
  Tracer.delay();
}

for (let i = 0; i < G.length; i++) { // start from every node
  logger.println(`start from ${i}`);
  D = [];
  for (let j = 0; j < G.length; j++) D.push(false);
  DFS(i, undefined, 0);
}
