var n = 7;
var A = new Array (n);
for (var i = n - 1; i >= 0; i--) {
	A[i] = new Array (n);
}

for ( var i = n -1; i >= 0; i-- ) {
	for ( var j = n - 1; j >= 0; j-- ) {
		A[i][j] = 0;
	}
}

var tracer = new Array2DTracer ('Magic Square').set(A);
var logTracer = new LogTracer ( 'Console' );

var i = Math.floor (n/2);
var j = n-1;

for ( var num = 1; num <= n*n; ) {
	logTracer.print ( 'i = ' + i );
	logTracer.print ( 'j = ' + j );

	if( i == -1 && j == n ) {
		j = n - 2;
		i = 0;

		logTracer.print ( 'Changing : ' );
		logTracer.print ( 'i = ' + i );
		logTracer.print ( 'j = ' + j );
	} else {
		if ( j == n ) {
			j = 0;
			logTracer.print ( 'Changing : ' + 'j = ' + j);
		}
		if ( i < 0 ) {
			i = n-1;
			logTracer.print ( 'Changing : ' + 'i = ' + i );
		}
	}

	if ( A[i][j] > 0 ) {
		logTracer.print ( ' Cell already filled : Changing ' + ' i = ' + i + ' j = ' + j );
		j -= 2;
		i++;
		continue;
	} else {
		A[i][j] = num++;
		tracer.notify( i, j, A[i][j] ).wait ();
		tracer.denotify ( i, j );
		tracer.select ( i, j ).wait ();
	}
	j++;
	i--;
}

logTracer.print ( 'Magic Constant is ' + n*(n*n+1)/2 );