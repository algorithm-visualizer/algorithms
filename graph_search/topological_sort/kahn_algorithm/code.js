(function topologicalSort() {
    var inDegrees = Array.apply(null, Array(G.length)).map(Number.prototype.valueOf, 0);		//create an Array of G.length number of 0s
    var Q = [], iter = 0, i;

    logger.print('Calculating in-degrees for each Node...');
    for (var currNode = 0; currNode < G.length; currNode++) {
        for (var currNodeNeighbor = 0; currNodeNeighbor < G.length; currNodeNeighbor++) {
            if (G [currNode] [currNodeNeighbor]) {
                logger.print(currNodeNeighbor + ' has an incoming edge from ' + currNode);
                tracer.visit(currNodeNeighbor, currNode).wait();
                inDegrees [currNodeNeighbor]++;
                tracer.leave(currNodeNeighbor, currNode).wait();
            }
        }
    }
    logger.print('Done. In-Degrees are: [ ' + String(inDegrees) + ' ]');
    logger.print('');

    logger.print('Initializing queue with all the sources (nodes with no incoming edges)');
    inDegrees.map(function (indegrees, node) {
        tracer.visit(node).wait();
        if (!indegrees) {
            logger.print(node + ' is a source');
            Q.push(node);
        }
        tracer.leave(node).wait();
    });
    logger.print('Done. Initial State of Queue: [ ' + String(Q) + ' ]');
    logger.print('');

    //begin topological sort (kahn)
    while (Q.length > 0) {
        logger.print('Iteration #' + iter + '. Queue state: [ ' + String(Q) + ' ]');
        currNode = Q.shift();
        tracer.visit(currNode).wait();

        for (i = 0; i < G.length; i++) {
            if (G [currNode] [i]) {
                logger.print(i + ' has an incoming edge from ' + currNode + '. Decrementing ' + i + '\'s in-degree by 1.');
                tracer.visit(i, currNode).wait();
                inDegrees [i]--;
                tracer.leave(i, currNode).wait();

                if (!inDegrees [i]) {
                    logger.print(i + '\'s in-degree is now 0. Enqueuing ' + i);
                    Q.push(i);
                }
            }
        }
        tracer.leave(currNode).wait();
        logger.print('In-degrees are: [' + String(inDegrees) + ' ]');
        logger.print('-------------------------------------------------------------------');

        iter++;
    }
})();