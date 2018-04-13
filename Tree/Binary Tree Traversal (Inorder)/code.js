var G = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];


var T = [ // mapping to G as a binary tree , [i][0] indicates left child, [i][1] indicates right child
        [-1,-1],
        [ 0, 2],
        [-1,-1],
        [ 1, 4],
        [-1,-1],
        [ 3, 8],
        [-1, 7],
        [-1,-1],
        [ 6,10],
        [-1,-1],
        [ 9,-1]
];

var treeTracer = new GraphTracer( " Traversal In-order ").setTreeData ( G, 5 );
var arrayTracer = new Array1DTracer( " Print In-order ").set ( new Array(T.length).fill( '-' ) );
var logger = new LogTracer ( " Log ");


var index = 0;

function inorder ( root , parent ) {
	if (root === -1) {
		logger.print( 'No more nodes. Backtracking.' ).wait ();
		return;
	}

	logger.print( 'Reached ' + root);
	treeTracer.visit ( root , parent ).wait ();

	logger.print ( ' Going left from ' + root ).wait ();
	inorder(T[root][0], root);

	logger.print( 'Printing ' + root);
	treeTracer.leave ( root );
	arrayTracer.notify ( index++, root ).wait();

	logger.print ( ' Going right from ' + root ).wait ();
	inorder(T[root][1], root);
}

inorder ( 5 ); // node with key 5 is the root
logger.print( 'Finished' );
