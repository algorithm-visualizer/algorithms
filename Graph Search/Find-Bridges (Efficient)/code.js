const graphTracer = new UndirectedGraphTracer();
const logger = new LogTracer();
const G = [
  [0, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
];

graphTracer.set(G);

/*
	NOTE: Code assumes NO parallel edges
*/

let timer = 0,
  bridges = [],
  adj = [];	// adj keeps track of the neighbors of each node

var util = function (u, disc, low, parent) {
  // u is the node that is currently being processed in the DFS (depth-first search)
  // disc is the numbering of the vertices in the DFS, starting at 0
  // low[v] is the lowest numbered vertex that can be reached from vertex v along the DFS
  // parent is the node that u came from
  logger.print('');
  logger.print(`Visiting node ${u}`);
  graphTracer.visit(u).wait();
  graphTracer.leave(u).wait();

  // visited [u] = true;
  disc[u] = low[u] = timer++;

  logger.print(`Nodes adjacent to ${u} are: [ ${adj[u]} ]`);
  /* adj [u].forEach (function (v) {
		graphTracer.visit (v, u).wait ();
		graphTracer.leave (v, u).wait ();
	}); */
  const trace = function (v) {
    graphTracer.visit(v, u).wait();
    graphTracer.leave(v, u).wait();
  };

  adj[u].forEach((v) => {
    if (disc[v] > -1 && v === parent) {
      trace(v);
      logger.print(`${u}'s neighbor ${v} is u's parent. Not visiting it.`);
    } else if (disc[v] > -1 && v != parent) {
      trace(v);
		    logger.print(`${u}'s neighbor ${v} is not u's parent. Comparing low[u] with disc[v]`);
		    if (low[u] > disc[v]) {
		        logger.print(`low[${u}] is greater than disc[${v}]. Setting low[${u}] to disc[${v}]`);
		        low[u] = disc[v];
		    }
    }

    if (disc[v] === -1) {
      trace(v);
      logger.print(`${u}'s neighbor ${v} has not been visited yet`);

      logger.print(`recursively calling util (${v}, [${disc}], [${low}],${u})`);
      util(v, disc, low, u);

      logger.print('--------------------------------------------------------------------');

      logger.print(`Setting low [${u}] to ${Math.min(low[u], low[v])}`);
      low[u] = Math.min(low[u], low[v]);

      if (low[v] === disc[v]) {
        logger.print(`low [${v}] == disc [${v}], low[${v}]=${low[v]}, disc[${v}]=${disc[v]}`);
        logger.print(`${u} -> ${v} is a bridge. Adding ${u}->${v}to the set of bridges found`);
        bridges.push([u, v]);
      }
    }
  });
};

(function findBridges(graph) {
  const disc = filledArray(graph.length, -1);
  const low = filledArray(graph.length, -1);

  function filledArray(length, value) {
    return Array(...Array(length)).map(Number.prototype.valueOf, value);
  }

  // PRECOMPUTATION: store every node's neighbor info in auxiliary array for efficient retrieval later
  (function computeAdj() {
    graph.forEach((config) => {
      const temp = [];
      config.forEach((isEdge, i) => {
        isEdge && temp.push(i);
      });
      adj.push(temp);
    });
  }());

  logger.print(`Initializing: <b>disc</b>: ${disc} <b>low</b>: ${low}`);
  logger.print('');
  logger.print('Beginning efficient Bridge Finding');
  logger.print('NOTE: call to util () follows pattern: util (nodeToVisit, disc, low, parent). See code for clarity');
  logger.print('');

  logger.print('Starting the main for loop (for each node)');
  for (let v = 0; v < graph.length; v++) {
    if (disc[v] === -1) {
      logger.print(`${v} has not been visited yet. Calling util (${v},  [${disc}], [${low}],${v}) from the for loop`);
      util(v, disc, low, v);
      logger.print(`Returned in for loop after util (${v}, [${disc}], [${low}], [${v}])`);
    }
  }
}(G));

logger.print(`There are ${bridges.length} bridges in the Graph`);
for (let i = 0; i < bridges.length; i++) {
  logger.print(`${bridges[i][0]}-->${bridges[i][1]}`);
}
logger.print('NOTE: All bridges are both ways (just like in the Naive Algorithm) because the Graph is undirected. So, edge A->B and B->A, both are bridges');
