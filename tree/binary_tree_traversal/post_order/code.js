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

	logger.print ( ' Going right from ' + root ).wait ();
	inorder(T[root][1], root);

	logger.print( 'Printing ' + root);
	treeTracer.leave ( root );
	arrayTracer.notify ( index++, root ).wait();
}

inorder ( 5 ); // node with key 5 is the root
logger.print( 'Finished' );
