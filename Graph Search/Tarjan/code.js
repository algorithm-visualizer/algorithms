import { Array1DTracer, GraphTracer, LogTracer, Tracer } from 'algorithm-visualizer';

const G = [
  [0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0],
];

const graphTracer = new GraphTracer();
graphTracer.set(G);

const discTracer = new Array1DTracer('Disc');
const lowTracer = new Array1DTracer('Low');
const stackMemberTracer = new Array1DTracer('stackMember');
const stTracer = new Array1DTracer('st');

const logger = new LogTracer();

SCC();

function SCCVertex(u, disc, low, st, stackMember, carry) {
  graphTracer.visit(u).wait();

  disc[u] = ++carry.time;
  discTracer.notify(u, carry.time).wait();

  low[u] = carry.time;
  lowTracer.notify(u, carry.time).wait();

  st.push(u);
  stTracer.set(st).wait();

  stackMember[u] = true;
  stackMemberTracer.notify(u, true).wait();

  // Go through all vertices adjacent to this
  for (let v = 0; v < G[u].length; v++) {
    	if (G[u][v]) {
      // If v is not visited yet, then recur for it
      if (disc[v] === -1) {
            	SCCVertex(v, disc, low, st, stackMember, carry);

        // Check if the subtree rooted with 'v' has a
        // connection to one of the ancestors of 'u'
        low[u] = Math.min(low[u], low[v]);
        lowTracer.notify(u, low[u]);
      }

      // Update low value of 'u' only of 'v' is still in stack
      // (i.e. it's a back edge, not cross edge).
      else if (stackMember[v] === true) {
            	low[u] = Math.min(low[u], disc[v]);
            	lowTracer.notify(u, low[u]).wait();
      }
    }
  }

  // head node found, pop the stack and print an SCC
  let w = 0; // To store stack extracted vertices
  if (low[u] === disc[u]) {
    	while (st[st.length - 1] !== u) {
    		w = st.pop();
    		stTracer.set(st).wait();

    		logger.print(w).wait();

    		stackMember[w] = false;
    		stackMemberTracer.notify(w, false).wait();
    	}

    	w = st.pop();
    	stTracer.set(st).wait();

    	logger.print(w).wait();
    	logger.print('------');

    	stackMember[w] = false;
    	stackMemberTracer.notify(w, false).wait();
  }
}

function SCC() {
  const disc = new Array(G.length);
  const low = new Array(G.length);
  const stackMember = new Array(G.length);
  const st = [];
  const carry = { time: 0 };

  for (let i = 0; i < G.length; i++) {
    	disc[i] = -1;
    	low[i] = -1;
    	stackMember[i] = false;
  }

  discTracer.set(disc);
  lowTracer.set(low);
  stackMemberTracer.set(stackMember);
  stTracer.set(st);

  for (let i = 0; i < G.length; i++) {
    	if (disc[i] === -1) {
    		SCCVertex(i, disc, low, st, stackMember, carry);
    	}
  }
}
