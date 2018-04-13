var graphTracer = new UndirectedGraphTracer();
var visitedTracer = new Array1DTracer('visited');
var logger = new LogTracer();
graphTracer.log(logger);
var G = UndirectedGraph.random(8, .3);
graphTracer.set(G);