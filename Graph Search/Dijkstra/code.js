var tracer = new WeightedUndirectedGraphTracer();
var tracerS = new Array1DTracer();
var logger = new LogTracer();
tracer.log(logger);
var G = WeightedUndirectedGraph.random(5, 1, 1, 9);
tracer.set(G);
var MAX_VALUE = Infinity;
var S = []; // S[end] returns the distance from start node to end node
for (var i = 0; i < G.length; i++) S[i] = MAX_VALUE;
tracerS.set(S);

function Dijkstra(start, end) {
    var minIndex, minDistance;
    var D = []; // D[i] indicates whether the i-th node is discovered or not
    for (var i = 0; i < G.length; i++) D.push(false);
    S[start] = 0; // Starting node is at distance 0 from itself
    tracerS.notify(start, S[start]).wait().denotify(start);
    tracerS.select(start);
    var k = G.length;
    while (k--) {
        // Finding a node with the shortest distance from S[minIndex]
        minDistance = MAX_VALUE;
        for (i = 0; i < G.length; i++) {
            if (S[i] < minDistance && !D[i]) {
                minDistance = S[i];
                minIndex = i;
            }
        }
        if (minDistance === MAX_VALUE) break; // If there is no edge from current node, jump out of loop
        D[minIndex] = true;
        tracerS.select(minIndex);
        tracer.visit(minIndex).wait();
        // For every unvisited neighbour of current node, we check
        // whether the path to it is shorter if going over the current node
        for (i = 0; i < G.length; i++) {
            if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
                S[i] = S[minIndex] + G[minIndex][i];
                tracerS.notify(i, S[i]);
                tracer.visit(i, minIndex, S[i]).wait();
                tracerS.denotify(i);
                tracer.leave(i, minIndex).wait();
            }
        }
        tracer.leave(minIndex).wait();
    }
    if (S[end] === MAX_VALUE) {
        logger.print('there is no path from ' + start + ' to ' + end);
    } else {
        logger.print('the shortest path from ' + start + ' to ' + end + ' is ' + S[end]);
    }
}

var s = Integer.random(0, G.length - 1); // s = start node
var e; // e = end node
do {
    e = Integer.random(0, G.length - 1);
} while (s === e);
logger.print('finding the shortest path from ' + s + ' to ' + e).wait();
Dijkstra(s, e);