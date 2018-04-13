var G = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];


var T = [ // mapping to G as a binary tree , [i][0] indicates left child, [i][1] indicates right child
        [-1,-1],
        [-1, 7],
        [-1,-1],
        [ 6, 1],
        [-1,-1],
        [ 3, 8],
        [ 0, 2],
        [-1,-1],
        [10, 4],
        [-1,-1],
        [ 9,-1]
];

var treeTracer = new GraphTracer( " Traversal Pre-order ").setTreeData ( G, 5 );
var logger = new LogTracer ( " Log ");

function lcaBT (parent, root, a, b) {
    logger.print ('Beginning new Iteration of lcaBT () with parent: ' + parent + ', current root: ' + root);
    if (root === -1) {
        logger.print ('Reached end of path & target node(s) not found')
        return null;
    }
    
    if (parent !== null) treeTracer.visit (root, parent).wait ();
    else treeTracer.visit (root).wait ();
    
    if (root === a || root === b) return root;
    
    var left = lcaBT (root, T [root] [0], a, b);
    var right = lcaBT (root, T [root] [1], a, b);
    
    if (left !== null && right !== null) return root;
    if (left === null && right === null) {
        treeTracer.leave (root, parent).wait ();
    }
    
    return (left !== null ? left : right);
}

var a = 7, b = 2;
logger.print ('Lowest common ancestor of ' + a + ' & ' + b + ' is: ' + lcaBT (null, 5, a, b));