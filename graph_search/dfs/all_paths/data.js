var tracer = new UndirectedGraphTracer();
var logger = new LogTracer();
tracer.log(logger);
var G = UndirectedGraph.random(5, 1);
tracer.set(G);