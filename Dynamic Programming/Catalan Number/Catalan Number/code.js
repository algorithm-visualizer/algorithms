A[0] = 1;
tracer.notify ( 0, A[0] ).wait();
tracer.denotify ( 0 );
A[1] = 1;
tracer.notify ( 1, A[1] ).wait();
tracer.denotify ( 1 );

for (var i = 2; i <= N; i++) {
	for (var j = 0; j < i; j++) {
		A[i] += A[j] * A[i-j-1];
		tracer.select( j ).wait();
		tracer.select( i - j -1 ).wait();
		tracer.notify( i, A[i]).wait();
		tracer.deselect( j );
		tracer.deselect( i - j - 1 );
		tracer.denotify( i );
	}
}

logger.print ( ' The ' + N + 'th Catalan Number is ' + A[N] );
tracer.select( N ).wait();