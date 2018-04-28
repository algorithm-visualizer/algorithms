const tracer = new GraphTracer({ directed: false });
const logger = new LogTracer();
tracer.log(logger);

const G = [
  [0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0], // <-- replace latest 0 with 1 to make G not biparted
  [1, 0, 0, 0, 0],
];
tracer.set(G, 0);

const colorsTracer = new Array1DTracer('Colors');

function BFSCheckBipartiteness(s) {
  const Q = [];

  // Create a new matrix to set colors (0,1)
  const Colors = [];
  for (let _i = 0; _i < G.length; _i++) Colors[_i] = -1;
  colorsTracer.set(Colors);

  Colors[s] = 1;
  colorsTracer.notify(s, 1);

  Q.push(s); // add start node to queue

  while (Q.length > 0) {
    const node = Q.shift(); // dequeue
    tracer.visit(node).wait();

    for (let i = 0; i < G[node].length; i++) {
        	if (G[node][i]) {
        		if (Colors[i] === -1) {
        			Colors[i] = 1 - Colors[node];
        			colorsTracer.notify(i, 1 - Colors[node]);

        			Q.push(i);
        			tracer.visit(i, node).wait();
        		} else if (Colors[i] == Colors[node]) {
        			logger.print('Graph is not biparted');
        			return false;
        		}
        	}
    }
  }

  logger.print('Graph is biparted');
  return true;
}

BFSCheckBipartiteness(0);
