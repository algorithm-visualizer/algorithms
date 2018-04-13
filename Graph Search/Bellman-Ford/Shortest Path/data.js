var tracer = new WeightedDirectedGraphTracer();
var logger = new LogTracer();
tracer.log(logger);
var G = WeightedDirectedGraph.random(5, .5, -2, 5);
tracer.set(G);
