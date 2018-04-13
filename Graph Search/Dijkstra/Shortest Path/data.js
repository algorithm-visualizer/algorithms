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