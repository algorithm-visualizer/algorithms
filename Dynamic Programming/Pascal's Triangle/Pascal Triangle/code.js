for ( var i = 0; i < N; i++ ) {
	for ( var j = 0; j <= i; j++ ) {
		if( j === i || j === 0 ) { // First and last values in every row are 1
			A[i][j] = 1;

			tracer.notify( i, j, A[i][j]).wait();
			tracer.denotify( i, j);
		} else { // Other values are sum of values just above and left of above
			tracer.select( i-1, j-1).wait();
			tracer.select( i-1, j).wait();

			A[i][j] = A[i-1][j-1] + A[i-1][j];
			
			tracer.notify( i, j, A[i][j]).wait();
			tracer.denotify( i, j);
			tracer.deselect( i-1, j-1);
			tracer.deselect( i-1, j);
		}
	}
}