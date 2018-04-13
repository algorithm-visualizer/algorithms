for ( var i = 1; i < N; i++ ) {
	// next is minimum of m2, m3 and m5
	var next = (M[0] <= M[1])?( M[0] <= M[2] )?M[0]:M[2]:( M[1] <= M[2] )?M[1]:M[2];
	logger.print( ' Minimum of ' + M[0] + ', ' + M[1] + ', ' + M[2] + " : " + next );
	A[i] = next;

	tracer.notify( i, A[i] ).wait();
	tracer.denotify( i );

	if ( next === M[0] ) {
		I[0]++;
		M[0] = A[I[0]] * 2;
		tracer2.notify( 0, M[0]).wait();
		tracer3.notify( 0, I[0]).wait();
		tracer2.denotify(0);
		tracer3.denotify(0);

	}
	if ( next === M[1] ) {
		I[1]++;
		M[1] = A[I[1]] * 3;
		tracer2.notify( 1, M[1]).wait();
		tracer3.notify( 1, I[1]).wait();
		tracer2.denotify(1);
		tracer3.denotify(1);
	}
	if ( next === M[2] ) {
		I[2]++;
		M[2] = A[I[2]] * 5;
		tracer2.notify( 2, M[2]).wait();
		tracer3.notify( 2, I[2]).wait();
		tracer2.denotify(2);
		tracer3.denotify(2);
	}
}
