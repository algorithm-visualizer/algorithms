var G = [
[0,0,1,1,0,0],
[1,0,0,0,0,0],
[0,1,0,0,0,0],
[0,0,0,1,0,0],
[0,0,0,0,0,1],
[0,0,0,0,1,0]
];

var graphTracer = new GraphTracer();
graphTracer.set(G);

var discTracer = new Array1DTracer('Disc');
var lowTracer = new Array1DTracer('Low');
var stackMemberTracer = new Array1DTracer('stackMember');
var stTracer = new Array1DTracer('st');

var logger = new LogTracer();

SCC();