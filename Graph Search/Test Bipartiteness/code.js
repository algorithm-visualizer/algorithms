var tracer = new GraphTracer({ directed: false });
var logger = new LogTracer();
tracer.log(logger);

var G =[
[0, 1, 0, 1, 1],
[1, 0, 1, 0, 0],
[0, 1, 0, 1, 0],
[1, 0, 1, 0, 0], // <-- replace latest 0 with 1 to make G not biparted
[1, 0, 0, 0, 0],
];
tracer.set(G, 0);

var colorsTracer = new Array1DTracer('Colors');

function BFSCheckBipartiteness(s) {
    var Q = [];

    // Create a new matrix to set colors (0,1)
    var Colors = [];
    for (var _i = 0; _i < G.length; _i++) Colors[_i] = -1;
    colorsTracer.set(Colors);

    Colors[s] = 1;
    colorsTracer.notify(s, 1);

    Q.push(s); // add start node to queue

    while (Q.length > 0) {
        var node = Q.shift(); // dequeue
        tracer.visit(node).wait();

        for (var i = 0; i < G[node].length; i++) {
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